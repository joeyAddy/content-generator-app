import { View, Text, ImageBackground, Alert, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button.js";
import Icon from "react-native-vector-icons/Feather";
import IconFA from "react-native-vector-icons/FontAwesome5";
const image = Asset.fromModule(require("../assets/bg.png")).uri;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { register } from "../services/auth";

const signup = () => {
  const router = useRouter();

  const [termsCheck, setTermsCheck] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeText = (name, text) => {
    setForm({ ...form, [name]: text });
  };

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);

      const { data, error } = await register(form);

      if (data) {
        setLoading(false);
        if (data.user) {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
          Alert.alert("Account created successfully!");
          router.push("/dashboard");
        }
      }

      if (error) {
        setLoading(false);
        Alert.alert("error");
      }
    } catch (error) {
      Alert.alert("Fatal error. Something went wrong!");
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    } finally {
      setLoading(false);
    }
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
        <View className="space-y-5">
          <View>
            <InputText
              inputMode="text"
              placeHolder="Full Name"
              handleChangeText={handleChangeText}
              value={form.fullName}
              name="fullName"
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
              value={form.confirmPassword}
              name="confirmPassword"
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
            <Text className="text-white text-base">
              You must agree to our terms of service
            </Text>
          </View>
        </View>
        <View>
          <Button
            disabled={!termsCheck}
            loading={loading}
            text="SIGN UP"
            handlePress={handleSignup}
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
