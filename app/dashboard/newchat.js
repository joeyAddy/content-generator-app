import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import InputText from "../../components/common/InputText";
import Button from "../../components/common/Button.js";
import Icon from "react-native-vector-icons/Ionicons";
import IconFE from "react-native-vector-icons/Feather";
import { generateText } from "../../services/contentGeneration";
import { ActivityIndicator } from "react-native";
const image = Asset.fromModule(require("../../assets/bg.png")).uri;

const newchat = () => {
  const router = useRouter();
  const navigate = useNavigation();

  const params = useLocalSearchParams();

  const passedPrompt = String(params.prompt);

  const [prompt, setPrompt] = useState(
    passedPrompt.trim() === "" ? "" : passedPrompt
  );

  const [data, setData] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(data, "data");
    if (data !== "") {
      const payload = JSON.stringify({ prompt, data });
      router.push({
        pathname: "/dashboard/generate",
        params: { paramsObject: payload },
      });
    }
  }, [data]);

  return (
    <View className="flex-1">
      <ImageBackground source={{ uri: image }} className="flex-1 bg-cover">
        <View className="flex-row mt-20 items-center px-5">
          <TouchableOpacity
            className="items-center justify-center"
            onPress={() => router.push("/dashboard")}
          >
            <IconFE name="x" size={25} color="white" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-white text-xl p-3 mb-3 text-center font-bold">
              Content Generation
            </Text>
          </View>
        </View>
        <View className="flex-1">
          <View className=" bg-primary-color rounded-lg p-4 mx-5 w-fit h-fit">
            <Text className="text-white text-xl font-semibold">
              Send a message or get inspired by our popular list
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push(`${"/dashboard"}`);
              }}
              className="rounded-xl mt-4 w-3/6  pb-2 pt-2 self-end items-center justify-center bg-dark-ash"
            >
              <View className="w-full items-center justify-center">
                <Text className="text-white text-lg">Most Searched</Text>
              </View>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            className="bg-transparent border border-solid border-white rounded-2xl absolute w-full bottom-0 flex-row items-center justify-center py-2 px-4 flex-1"
            behavior="height"
            keyboardVerticalOffset={100} // Add a vertical offset if needed
          >
            {/* <View className="bg-transparent border border-solid border-white rounded-2xl  relative mt-auto flex-row items-center justify-center focus:justify-start h-20 px-4 "> */}
            <TextInput
              className="py-3 px-3 flex-1 text-white"
              placeholderTextColor={"white"}
              value={prompt}
              placeholder="Write your message"
              onChangeText={(text) => {
                setPrompt(text);
              }}
            />
            <TouchableOpacity
              onPress={async () => {
                if (prompt.trim() !== "") {
                  setLoading(true);
                  const { data: reply, error } = await generateText(prompt);
                  if (reply) {
                    console.log(reply, "replys");
                    setLoading(false);
                    setData(reply);
                  }

                  if (error) {
                    setLoading(false);
                    Alert.alert("Something went wrong, please try again");
                  }
                }
              }}
              disabled={prompt.trim() === ""}
            >
              <Text
                className={`text-primary-color ${
                  prompt.trim() === "" && "opacity-50"
                }`}
              >
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Icon size={35} name="send" />
                )}
              </Text>
            </TouchableOpacity>
            {/* </View> */}
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default newchat;
