import React from "react";
import { Image, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const BotMessage = ({ reply, type }) => {
  return (
    <View className="flex-row space-x-3 items-center bg-primary-color border-b-2 border-r-2 border-white p-3 mb-4">
      <View className="h-fit self-start">
        <Text className="animate-pulse">
          <MaterialCommunityIcons name="robot" size={50} color="white" />
        </Text>
      </View>
      <View className={`flex-1 ${type === "error" && "flex-row"}`}>
        <Text className="text-white">{reply.trim()}</Text>
        {type === "error" && (
          <MaterialCommunityIcons name="robot" size={30} color="white" />
        )}
      </View>
    </View>
  );
};

export default BotMessage;
