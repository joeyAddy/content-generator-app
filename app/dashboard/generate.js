import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Asset } from "expo-asset";
import { useLocalSearchParams, useRouter } from "expo-router";
import PromptCard from "../../components/common/PromptCard.jsx";
import BotMessageCard from "../../components/common/BotMessageCard.jsx";
import Icon from "react-native-vector-icons/Ionicons";
import IconFE from "react-native-vector-icons/Feather";
import { KeyboardAvoidingView } from "react-native";
import useGenerateText, {
  copyleakLogin,
  generateText,
} from "../../services/contentGeneration.js"; // Import the new request hook
import { PaperProvider, Portal, Modal, Snackbar } from "react-native-paper";

const image = Asset.fromModule(require("../../assets/bg.png")).uri;

const generate = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [textInput, setTextInput] = useState("");

  const payload = JSON.parse(params.paramsObject);

  const [chatMessages, setChatMessages] = useState([
    { type: "user", content: payload.prompt },
  ]);

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [loading, setLoading] = useState(false);

  const [enablePlagiarism, setEnablePlagiarism] = useState(false);

  const [accessToken, setAccessToken] = useState(null);

  const [isInitializingCopyleak, setIsInitializingCopyleak] = useState(false);

  const [snacbarVisible, setSnacbarVisible] = useState(false);

  const dismissSnackBar = () => setSnacbarVisible(false);

  useEffect(() => {
    const firstPrompt = payload.prompt;

    const firstContent = payload.data;

    if (firstPrompt.trim() !== "" && firstContent.trim() !== "") {
      setChatMessages([
        ...chatMessages,
        { type: "bot", content: firstContent },
      ]);
    }
  }, []);

  // Create a ref for the FlatList
  const flatListRef = useRef(null);

  const handleSendMessage = async () => {
    if (textInput.trim() !== "") {
      (async () => {
        setLoading(true);
        const { data: reply, error } = await generateText(textInput);
        if (reply) {
          setLoading(false);
          console.log("response", reply);

          setChatMessages([
            ...chatMessages,
            { type: "user", content: textInput },
            { type: "bot", content: reply },
          ]);

          // Scroll to the end of the FlatList
          if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
          }
        }

        if (error) {
          setLoading(false);
          setChatMessages([
            ...chatMessages,
            { type: "user", content: textInput },
            { type: "error", content: "Error getting response" },
          ]);
          Alert.alert("Something went wrong, please try again");
        }

        setTextInput("");
      })();
    }
  };
  useEffect(() => {
    (async () => {
      setIsInitializingCopyleak(true);
      const { data, error } = await copyleakLogin();

      if (data) {
        setIsInitializingCopyleak(false);
        setEnablePlagiarism(true);
        setAccessToken(data.access_token);
        setSnacbarVisible(true);
        console.log("====================================");
        console.log(data);
        console.log("====================================");
      }

      if (error) {
        setIsInitializingCopyleak(false);
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    })();
  }, []);

  return (
    <PaperProvider>
      <View className="flex-1">
        <ImageBackground
          source={{ uri: image }}
          className="flex-1 bg-cover space-y-4"
        >
          <View className="z-10 absolute bottom-20 right-0 left-0 mx-3 flex-1 justify-between">
            {accessToken !== null && (
              <Snackbar
                visible={snacbarVisible}
                onDismiss={dismissSnackBar}
                elevation={5}
                action={{
                  label: "Ok",
                  onPress: dismissSnackBar,
                }}
              >
                Initialized Plagiarism Checker
              </Snackbar>
            )}
          </View>
          <View className="flex-row mt-10 items-center px-5 border-b border-white pb-5 mb-5 fixed top-0">
            <TouchableOpacity
              className="items-center justify-center"
              onPress={() => router.push("/dashboard")}
            >
              <IconFE name="x" size={25} color="white" />
            </TouchableOpacity>
            <View className="flex-1 justify-center items-center">
              <Text className="text-white text-xl font-bold">
                Content Generation
              </Text>
            </View>
            <View>
              <Text>
                <IconFE name="more-horizontal" size={25} color="white" />
              </Text>
            </View>
          </View>
          <FlatList
            className="flex-1"
            ref={flatListRef} // Assign the ref to the FlatList
            data={chatMessages}
            renderItem={({ item }) =>
              item.type === "user" ? (
                <PromptCard key={item.content} prompt={item.content} />
              ) : (
                <BotMessageCard
                  key={item.content}
                  reply={item.content}
                  type={item.type}
                  showModal={showModal}
                  hideModal={hideModal}
                  visible={visible}
                  setLoading={setLoading}
                  setChatMessages={setChatMessages}
                  chatMessages={chatMessages}
                  flatListRef={flatListRef}
                  disablePlagiarism={!enablePlagiarism}
                  accessToken={accessToken}
                />
              )
            }
            keyExtractor={(_item, index) => index.toString()}
          />
          <KeyboardAvoidingView
            className="bg-transparent border border-solid border-white rounded-2xl fixed w-full bottom-0 flex-row items-center justify-center py-2 px-4 focus:bg-black"
            // style={{ flex: 1 }}
            behavior="height"
            keyboardVerticalOffset={100} // Add a vertical offset if needed
          >
            {/* <View className="bg-transparent border border-solid border-white rounded-2xl  relative mt-auto flex-row items-center justify-center focus:justify-start h-20 px-4 "> */}
            <TextInput
              className="py-2 px-3 flex-1 text-white"
              placeholderTextColor={"white"}
              placeholder="Write your message"
              value={textInput}
              multiline={true}
              onChangeText={(text) => {
                setTextInput(text);
              }}
            />
            <TouchableOpacity onPress={handleSendMessage}>
              <Text className="text-primary-color">
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Icon size={35} name="send" />
                )}
              </Text>
            </TouchableOpacity>
            {/* </View> */}
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </PaperProvider>
  );
};

export default generate;
