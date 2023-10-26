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
import InputText from "../components/common/InputText";
import Button from "../components/common/Button.js";
import Icon from "react-native-vector-icons/Feather";
import IconFA from "react-native-vector-icons/FontAwesome5";
const image = Asset.fromModule(require("../assets/bg.png")).uri;

const signup = () => {
  const router = useRouter();

  const [termsCheck, setTermsCheck] = useState(false);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChangeText = (name, text) => {
    setForm({ ...form, [name]: text });
  };

  return (
    <View className="flex-1">
      <ImageBackground source={{ uri: image }} className="flex-1 bg-cover px-5">
        <View>
          <Text className="text-white text-4xl p-3 mt-20 text-center font-bold">
            SIGN UP
          </Text>
          <Text></Text>
        </View>
        <View className="items-center justify-center rounded-full h-24 w-24 p-3 self-center bg-gray-400 mb-10">
          <Icon size={48} color="white" name="camera" />
        </View>
        <View className="space-y-5">
          <View>
            <InputText
              inputMode="text"
              placeHolder="Full Name"
              handleChangeText={handleChangeText}
              value={form.fullname}
              name="fullname"
            />
          </View>
          <View>
            <InputText
              inputMode="email"
              placeHolder="Email"
              handleChangeText={handleChangeText}
              value={form.email}
              name="email"
            />
          </View>
          <View>
            <InputText
              inputMode="text"
              secureTextMode={true}
              placeHolder="Password"
              handleChangeText={handleChangeText}
              value={form.password}
              name="password"
            />
          </View>
          <View>
            <InputText
              inputMode="text"
              secureTextMode={true}
              placeHolder="Confirm Password"
              handleChangeText={handleChangeText}
              value={form.cpassword}
              name="cpassword"
            />
          </View>
        </View>
        <View>
          <View className="flex-row items-center space-x-3 mt-8">
            <Pressable
              onPress={() => {
                setTermsCheck(!termsCheck);
              }}
              className="rounded-md p-1 border border-solid border-gray-400 h-7 w-7"
            >
              {termsCheck && <IconFA size={18} color="green" name="check" />}
            </Pressable>
            <Text className="text-white text-[16rem]">
              You agree to our terms of service
            </Text>
          </View>
        </View>
        <View>
          <Button
            disabled={!termsCheck}
            text="SIGN UP"
            link="/login"
            style={`w-2/4 self-center ${
              termsCheck === false ? "opacity-70" : ""
            }`}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default signup;
