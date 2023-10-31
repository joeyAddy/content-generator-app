import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const image = Asset.fromModule(require("../assets/bg.png")).uri;

const terms = () => {
  const router = useRouter();

  useEffect(() => {
    const user = AsyncStorage.getItem("user");
    console.log("====================================");
    console.log(user);
    console.log("====================================");

    if (user.fullName !== undefined) router.push("/dashboard");
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground source={{ uri: image }} className="flex-1 bg-cover px-5">
        <Text
          className="mt-24 text-white font-bold text-5xl p-5"
          style={{
            lineHeight: 60,
          }}
        >
          Never Run Out Of
          <Text style={{ fontFamily: "Mervale-Script" }} className="italic">
            {" "}
            IDEAS{" "}
          </Text>
          Again
        </Text>
        <View className="px-5 mt-14">
          <TouchableOpacity
            onPress={() => {
              router.push("/login");
            }}
            className="bg-primary-color items-center rounded-2xl py-3"
          >
            <Text className="text-white text-2xl uppercase font-bold">
              login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/signup");
            }}
            className="bg-primary-color items-center rounded-2xl py-3 mt-10"
          >
            <Text className="text-white text-2xl uppercase font-bold">
              sign up
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-white text-center mt-36 font-medium">
          By continuing you agree to our TERMS & CONDITIONS
        </Text>
      </ImageBackground>
    </View>
  );
};

export default terms;
