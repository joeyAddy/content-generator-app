import React from "react";
import { Image, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const PromptCard = ({ prompt }) => {
  return (
    <View className="flex-row space-x-3 items-center bg-gray-900 p-3 border-t-2 border-l-2 border-white mb-4">
      <View className="h-fit self-start">
        <Text>
          <Icon name="person" size={50} color="white" />
        </Text>
      </View>
      <View className="flex-1">
        <Text className="text-white">{prompt}</Text>
      </View>
    </View>
  );
};

export default PromptCard;
