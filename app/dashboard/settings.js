import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import InputText from "../../components/common/InputText";
import Button from "../../components/common/Button.js";
import IconFA from "react-native-vector-icons/FontAwesome5";
const image = Asset.fromModule(require("../../assets/bg.png")).uri;

const settings = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <ImageBackground source={{ uri: image }} className="flex-1 bg-cover px-5">
        <View className="flex-row mt-20 items-center">
          <TouchableOpacity
            className="items-center justify-center"
            onPress={() => router.push("/dashboard")}
          >
            <IconFA name="chevron-left" size={25} color="white" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-white text-3xl p-3 text-center font-bold">
              Settings
            </Text>
          </View>
        </View>
        <View>
          <Pressable className="rounded-2xl self-center mb-6 mt-12 px-5 pb-5 pt-4 flex-row items-center justify-center bg-dark-ash">
            <View className="w-full items-center justify-center">
              <Text className="text-white text-2xl font-semibold" onPress={() => router.push("/dashboard/editprofile")}
>
                Edit Profile
              </Text>
            </View>
          </Pressable>
          <Pressable className="rounded-2xl self-center mb-6 px-5 pb-5 pt-4 flex-row items-center justify-center bg-dark-ash">
            <View className="w-full items-center justify-center">
              <Text className="text-white text-2xl font-semibold">Help</Text>
            </View>
          </Pressable>
          <Pressable className="rounded-2xl self-center mb-6 px-5 pb-5 pt-4 flex-row items-center justify-center bg-dark-ash">
            <View className="w-full items-center justify-center">
              <Text className="text-white text-2xl font-semibold">
                Terms & Con'd
              </Text>
            </View>
          </Pressable>
          <Pressable className="rounded-2xl self-center mb-3 px-5 pb-5 pt-4 flex-row items-center justify-center bg-dark-ash">
            <View className="w-full items-center justify-center">
              <Text className="text-white text-2xl font-semibold" onPress={() => router.push("/login")}>Log Out</Text>
            </View>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default settings;
