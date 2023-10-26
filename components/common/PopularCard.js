import { View, Text, Pressable } from "react-native";
import React from "react";
import Button from "./Button";
import { TouchableOpacity } from "react-native";

const PopularCard = ({ title, content, handlePress }) => {
  return (
    <View className="rounded-2xl p-2 pt-0 space-y-3 h-48 w-48 items-center justify-center bg-faint-blue">
      <Text className="font-bold text-xl">{title}</Text>
      <Text className="font-light text-lg text-center">{content}.</Text>
      <Pressable
        onPress={handlePress}
        className="rounded-xl bg-gray-900 px-10 py-2"
      >
        <Text className="uppercase text-sm font-semibold text-white">
          Generate
        </Text>
      </Pressable>
    </View>
  );
};

export default PopularCard;
