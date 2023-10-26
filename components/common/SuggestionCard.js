import { View, Text, Pressable, Alert } from "react-native";
import React from "react";

const SuggestionCards = ({ insideText, handlePress }) => {
  return (
    <Pressable
      onPress={handlePress}
      className="rounded-2xl self-center mb-3 w-5/6 px-5 pb-3 pt-2 flex-row items-center justify-center bg-dark-ash"
    >
      <View className="w-full items-center justify-center">
        <Text className="text-white text-lg">{insideText}</Text>
      </View>
    </Pressable>
  );
};

export default SuggestionCards;
