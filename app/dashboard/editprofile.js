import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import InputText from "../../components/common/InputText";
import Button from "../../components/common/Button.js";
import Icon from "react-native-vector-icons/Feather";
import IconFA from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";
const image = Asset.fromModule(require("../../assets/bg.png")).uri;
import * as ImagePicker from "expo-image-picker";

const editprofile = () => {
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

  const [profileImage, setProfileImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setProfileImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View className="flex-1">
      <ImageBackground source={{ uri: image }} className="flex-1 bg-cover px-5">
        <View className="flex-row mt-20 mb-8 items-center">
          <TouchableOpacity
            className="items-center justify-center"
            onPress={() => router.push("/dashboard")}
          >
            <IconFA name="chevron-left" size={25} color="white" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-white text-3xl p-3 text-center font-bold">
              Edit Profile
            </Text>
          </View>
        </View>
        <View className="rounded-full h-24 w-24 self-center bg-gray-400 mb-10">
          <Pressable
            onPress={pickImageAsync}
            className="w-full h-full items-center justify-center"
          >
            {profileImage ? (
              <Image
                className="rounded-full w-full h-full"
                source={{ uri: profileImage }}
              />
            ) : (
              <Icon size={48} color="white" name="camera" />
            )}
          </Pressable>
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
        <View></View>
        <View className="mt-10">
          <Button text="SAVE" link="/dashboard" style={`w-1/3 self-center $`} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default editprofile;
