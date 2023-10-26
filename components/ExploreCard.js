import { View, Text, Pressable } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";

const ExploreCard = ({ iconName, insideText }) => {
  return (
    <View className="">
      <Pressable className="rounded-3xl w-fit px-5 py-3 flex-row items-center h-28 justify-center space-x-3 bg-slate-100">
        <View className="rounded-3xl p-1 h-20 w-24 items-center bg-black">
          <Icon size={60} color="white" name={iconName} />
        </View>
        <View className="w-2/3">
          <Text className="w-fit text-lg">{insideText}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ExploreCard;
