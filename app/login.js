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
import IconFA from "react-native-vector-icons/FontAwesome5";
const image = Asset.fromModule(require("../assets/bg.png")).uri;

const terms = () => {
  const router = useRouter();

  const [termsCheck, setTermsCheck] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChangeText = (name, text) => {
    setForm({ ...form, [name]: text });
  };

  return (
    <View className="flex-1">
      <ImageBackground source={{ uri: image }} className="flex-1 bg-cover px-5">
        <View>
          <Text className="text-white text-5xl p-3 mt-20 text-center font-bold">
            LOGIN
          </Text>
          <Text className="text-3xl p-3 mt-5 text-center font-semibold text-primary-color">
            WELCOME BACK!
          </Text>
          <Text className="text-white text-xl p-3 text-center">
            Login To Continue
          </Text>
        </View>
        <View className="mt-8 space-y-8">
          <View>
            <InputText
              inputMode="email"
              placeHolder="Email"
              handleChangeText={handleChangeText}
              value={form.email}
              name="email"
              iconName="envelope"
            />
          </View>
          <View>
            <InputText
              inputMode="text"
              placeHolder="Password"
              handleChangeText={handleChangeText}
              value={form.password}
              secureTextMode={true}
              name="password"
              iconName="lock"
            />
          </View>
          <View className="flex-row items-center space-x-3 mt-8">
            <Pressable
              onPress={() => {
                setTermsCheck(!termsCheck);
              }}
              className="rounded-md p-1 border border-solid border-gray-400 h-7 w-7"
            >
              {termsCheck && <IconFA size={18} color="green" name="check" />}
            </Pressable>
            <Text className="text-white text-lg">Remember Me</Text>
          </View>
          <View>
            <Button
              text="LOGIN"
              link="/dashboard"
              textStyle="text-xl"
              style="w-3/4 self-center"
            />
          </View>
          <View>
            <Text className="text-red-600 text-xl p-3 text-center">
              Forgot password?
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default terms;
