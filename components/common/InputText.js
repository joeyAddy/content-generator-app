import { View, TextInput } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

const InputText = ({
  name,
  value,
  inputMode,
  placeHolder,
  handleChangeText,
  secureTextMode,
  style,
  iconName,
}) => {
  return (
    <View
      className={`w-full flex-row rounded-2xl bg-gray-400 px-4 h-14 space-x-2 items-center ${style}`}
    >
      {iconName ? (
        <View className="items-center justify-center border-r border-solid border-white pr-4 mr-2 h-3/4">
          <Icon size={18} color="white" name={iconName} />
        </View>
      ) : null}
      <TextInput
        className="placeholder:text-white text-white font-light flex-1 h-full text-lg pb-2 focus:pb-3"
        inputMode={inputMode}
        placeholder={placeHolder}
        value={value}
        secureTextEntry={secureTextMode}
        onChangeText={(text) => handleChangeText(name, text)}
        placeholderTextColor="white"
      />
    </View>
  );
};

export default InputText;
