import { Alert, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal, Portal } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { printToFileAsync } from "expo-print";
import { Document, Packer, Paragraph, HeadingLevel } from "docx";
import {
  copyleakStartScan,
  copyleakSubmitFile,
  generateText,
  getScanResultById,
} from "../../services/contentGeneration";
import { encode } from "base-64";
import { useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import { ActivityIndicator } from "react-native";
import io from "socket.io-client";

const BotMessage = ({
  reply,
  type,
  showModal,
  hideModal,
  visible,
  setLoading,
  setChatMessages,
  chatMessages,
  flatListRef,
  disablePlagiarism,
  accessToken,
}) => {
  const [plagiarismScanResult, setPlagiarismScanResult] = useState("");

  const [showScanResult, setShowScanResult] = useState(false);

  const [isScanning, setIsScanning] = useState(false);

  const [roomId, setRoomId] = useState("");

  // Function to export as PDF
  const exportAsPDF = async () => {
    console.log("====================================");
    console.log("sdfsdfvfdv");
    console.log("====================================");
    const html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        h1 {
          font-size: 24px;
          color: #0077B6; /* Change to your desired color */
          margin-bottom: 20px;
        }
        p {
          font-size: 16px;
          color: #333;
        }
      </style>
    </head>
    <body>
      <h1>Greetings!</h1>
      <p>${reply}</p>
    </body>
  </html>
  `;
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await Sharing.shareAsync(file.uri);
  };

  // Function to export as DOCX
  const exportAsDOCX = () => {
    let doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "Hello writer,",
              heading: HeadingLevel.TITLE,
            }),
            new Paragraph({
              text: "Here's your Great Idea!",
              heading: HeadingLevel.HEADING_4,
            }),
            new Paragraph({ text: `${reply}` }),
          ],
        },
      ],
    });

    Packer.toBase64String(doc).then((base64) => {
      const filename = FileSystem.documentDirectory + "MyGreatIdea.docx";
      FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64,
      }).then(() => {
        console.log(`Saved file: ${filename}`);
        Sharing.shareAsync(filename);
      });
    });
  };

  const paraphraseReply = () => {
    const prompt = "paraphrase:" + reply;
    (async () => {
      try {
        setLoading(true);
        const { data: paraphrasedReply, error: paraphraseError } =
          await generateText(prompt);
        if (paraphrasedReply) {
          setLoading(false);
          console.log("response", paraphrasedReply);
          setShowScanResult(false);

          setChatMessages([
            ...chatMessages,
            {
              type: "bot",
              content:
                "Here is the paraprased reponse: \n\n" + paraphrasedReply,
            },
          ]);

          // Scroll to the end of the FlatList
          if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
          }
        }

        if (paraphraseError) {
          setLoading(false);
          setChatMessages([
            ...chatMessages,
            { type: "error", content: "Error getting response" },
          ]);
          Alert.alert("Something went wrong, please try again");
        }
      } catch (error) {
        setLoading(false);
        console.log("====================================");
        console.log(error, "Something went wrong");
        console.log("====================================");
      } finally {
        setLoading(false);
      }
    })();
  };

  const handlePlagiarismCheck = async () => {
    const base64 = encode(reply);

    setIsScanning(true);

    const payload = {
      accessToken,
      base64,
    };

    const { data, error } = await copyleakSubmitFile(payload);

    if (data) {
      console.log("====================================");
      console.log(data);
      console.log("====================================");

      setRoomId(data.id);

      // handleGetScanByID("d4647701-74de-4535-89ba-d86cff1bc84d");

      // const payload = {
      //   accessToken,
      //   id: data.id,
      // };

      // const { data: scanData, error: scanError } = await copyleakStartScan(
      //   payload
      // );

      // if (scanData) {
      //   console.log("====================================");
      //   console.log(scanData, "scanData");
      //   console.log("====================================");
      // }

      // if (scanError) {
      //   console.log("====================================");
      //   console.log();
      //   console.log("====================================");
      // }
    }

    if (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  useEffect(() => {
    if (roomId === "") return;

    // Connect to your Socket.IO server
    // const socket = io("http://192.168.56.158:8080");
    const socket = io("https://cg-backend-bmn4.onrender.com");

    // Join the room
    socket.emit("join", roomId);

    // Listen for the "resultSaved" event
    socket.on("resultSaved", (result) => {
      console.log("Result saved:", result);
      setPlagiarismScanResult(result);
      setShowScanResult(true);
      setIsScanning(false);

      // You can update your app's state or perform any other actions with the result.
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  return (
    <>
      <View className="flex-col bg-primary-color border-b-2 border-r-2 border-white p-3 mb-4">
        <View className="flex-row space-x-3 items-center">
          <View className="h-fit self-start">
            <Text className="animate-pulse">
              <MaterialCommunityIcons name="robot" size={50} color="white" />
            </Text>
          </View>
          <View className={`flex-1 ${type === "error" && "flex-row"}`}>
            <Text className="text-white">{reply.trim()}</Text>
          </View>
        </View>
        {type === "error" ? (
          <MaterialCommunityIcons
            name="emoticon-sad-outline"
            size={30}
            color="red"
          />
        ) : (
          <View className="mt-3 mb-2 w-full h-fit justify-around flex-row border-t border-white pt-3">
            <TouchableOpacity
              onPress={paraphraseReply}
              className="items-center"
            >
              <MaterialCommunityIcons
                name="book-refresh-outline"
                size={24}
                color="white"
              />
              <Text className="text-white text-xs">Paraphrase</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePlagiarismCheck}
              disabled={disablePlagiarism}
              className="items-center justify-center"
            >
              {isScanning === true ? (
                <ActivityIndicator size={25} className="animate-spin mx-auto" />
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="magnify-scan"
                    size={24}
                    color={disablePlagiarism === true ? "gray" : "white"}
                  />
                  <Text
                    className={`${
                      disablePlagiarism === true
                        ? "text-slate-400"
                        : "text-white"
                    } text-xs`}
                  >
                    Plagiarism Check
                  </Text>
                </>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={showModal} className="items-center">
              <MaterialCommunityIcons
                name="file-export-outline"
                size={24}
                color="white"
              />
              <Text className="text-white text-xs">Export</Text>
            </TouchableOpacity>
          </View>
        )}
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            className="bg-slate-300 top-1/3 left-[60px] p-5 h-[25%] w-2/3 rounded-lg shadow-2xl items-center justify-center"
          >
            <View className="h-auto w-full ">
              <Text className="text-center text-2xl font-medium mb-3">
                Export as
              </Text>
              <TouchableOpacity
                onPress={exportAsPDF}
                className="bg-slate-900 py-3 px-4 border-2 mb-3 w-52 rounded-lg"
              >
                <Text className="text-center text-white">PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={exportAsDOCX}
                className="bg-white py-3 px-4 border-2 mb-3 w-52 rounded-lg"
              >
                <Text className="text-center">Docx</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
        {plagiarismScanResult !== "" && (
          <Portal>
            <Modal
              visible={showScanResult}
              onDismiss={() => {
                setShowScanResult(false);
              }}
              className="bg-slate-300 mx-5 top-[10%] p-5 h-[65%] min-h-fit w-auto rounded-lg shadow-2xl items-center justify-start"
            >
              <View>
                <Text className="text-center text-2xl font-medium mb-3">
                  Plagiarism Check
                </Text>
              </View>
              {plagiarismScanResult.result.aggregatedScore < 20 ? (
                <View className="h-auto w-full space-y-3">
                  <View className="space-y-3">
                    <Text className="text-center">
                      Identical Words Score:{" "}
                      {plagiarismScanResult.result.identicalWords}%
                    </Text>
                    <Text className="text-center">
                      Minor Changed Words Score:{" "}
                      {plagiarismScanResult.result.minorChangedWords}%
                    </Text>
                    <Text className="text-center">
                      Related Meaning Words Score:{" "}
                      {plagiarismScanResult.result.relatedMeaningWords}%
                    </Text>
                    <Text className="text-center">
                      Aggregated Score:{" "}
                      {plagiarismScanResult.result.aggregatedScore}%
                    </Text>
                  </View>
                  <View>
                    <Text className="text-center text-green-700 font-bold text-xl">
                      Your reply is not plagiarized
                    </Text>
                  </View>
                  <View className="items-center justify-center">
                    <LottieView
                      className="h-[100] w-[200] aspect-square"
                      source={require("../../assets/lottie/success.json")}
                      autoPlay={true}
                      loop={false}
                    />
                  </View>

                  <View className="h-fit">
                    <Text className="text-center text-2xl font-medium mb-3">
                      Export as
                    </Text>
                    <TouchableOpacity
                      onPress={exportAsPDF}
                      className="bg-slate-900 py-3 px-4 border-2 mb-3 w-auto rounded-lg"
                    >
                      <Text className="text-center text-white">PDF</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={exportAsDOCX}
                      className="bg-white py-3 px-4 border-2 mb-3 w-auto rounded-lg"
                    >
                      <Text className="text-center">Docx</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View className="h-auto w-full space-y-3">
                  <View className="space-y-3">
                    <Text className="text-center">
                      Identical Words Score:{" "}
                      {plagiarismScanResult.result.identicalWords}%
                    </Text>
                    <Text className="text-center">
                      Minor Changed Words Score:{" "}
                      {plagiarismScanResult.result.minorChangedWords}%
                    </Text>
                    <Text className="text-center">
                      Related Meaning Words Score:{" "}
                      {plagiarismScanResult.result.relatedMeaningWords}%
                    </Text>
                    <Text className="text-center">
                      Aggregated Score:{" "}
                      {plagiarismScanResult.result.aggregatedScore}%
                    </Text>
                  </View>
                  <Text className="text-red-500 font-bold text-center">
                    Plagiarism Result is too High, you have to Paraphrase.
                  </Text>
                  <View className="items-center justify-center">
                    <LottieView
                      className="h-[200] w-[200] aspect-square"
                      source={require("../../assets/lottie/cancel.json")}
                      autoPlay={true}
                      loop={false}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={paraphraseReply}
                    className="bg-slate-900 py-3 px-4 border-2 mb-3 w-auto rounded-lg"
                  >
                    <Text className="text-center text-white">
                      Paraphrase Now
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Modal>
          </Portal>
        )}
      </View>
    </>
  );
};

export default BotMessage;
