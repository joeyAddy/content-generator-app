import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Asset } from "expo-asset";
import { Image } from "react-native";
import AI from "../assets/AI.png";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  const image = Asset.fromModule(require("../assets/bg.png")).uri;

  return (
    <View className="flex-1">
      <ImageBackground source={{ uri: image }} className="flex-1 bg-cover px-5">
        <View className="w-fit mt-20 items-center">
          <Text className="text-white text-2xl font-bold">
            AI Content Generator
          </Text>
        </View>
        <View className="mt-10 items-center">
          <Image source={AI} />
        </View>
        <View className="mt-auto mb-20">
          <Text className="text-white font-light text-center text-xl mt-5">
            Let us help you generate the best content for your business,
            academics and so on.
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/terms");
            }}
            className="bg-primary-color items-center rounded-2xl py-3 mt-10 w-5/6 self-center"
          >
            <Text className="text-white text-xl uppercase font-bold">
              get started
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Index;
