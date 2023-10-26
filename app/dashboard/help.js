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

const help = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <ImageBackground source={{ uri: image }} className="flex-1 bg-cover px-5">
        <View className="flex-row mt-20 items-center">
          <TouchableOpacity
            className="items-center justify-center"
            onPress={() => router.push("/dashboard/settings")}
          >
            <IconFA name="chevron-left" size={25} color="white" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-white text-3xl p-3 text-center font-bold">
              Help
            </Text>
          </View>
        </View>
        <View>
          <Text className=" text-white font-bold text-3xl mt-8">FAQ</Text>
        </View>
        <View>
          <Pressable className="rounded-2xl self-center mb-6 mt-5 px-5 pb-5 pt-4 flex-row items-center justify-center bg-dark-ash">
            <View className="w-full items-center justify-center">
              <Text className="text-white text-2xl font-semibold">
                Where can I...
              </Text>
            </View>
          </Pressable>
          <Pressable className="rounded-2xl self-center mb-6 px-5 pb-5 pt-4 flex-row items-center justify-center bg-dark-ash">
            <View className="w-full items-center justify-center">
              <Text className="text-white text-2xl font-semibold">
                How can I...
              </Text>
            </View>
          </Pressable>
          <Pressable className="rounded-2xl self-center mb-6 px-5 pb-5 pt-4 flex-row items-center justify-center bg-dark-ash">
            <View className="w-full items-center justify-center">
              <Text className="text-white text-2xl font-semibold">
                What happens when...
              </Text>
            </View>
          </Pressable>
          <Pressable className="rounded-2xl self-center mb-3 px-5 pb-5 pt-4 flex-row items-center justify-center bg-dark-ash">
            <View className="w-full items-center justify-center">
              <Text className="text-white text-2xl font-semibold">
                I can't find...
              </Text>
            </View>
          </Pressable>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-white text-lg p-3 text-center font-semibold mt-10">
            Still need help?
          </Text>
        </View>
        <View className="items-center mb-24">
          <Button
            text="Contact Us"
            link=""
            style="w-1/2"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default help;
