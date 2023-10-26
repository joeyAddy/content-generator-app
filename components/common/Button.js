import { useRouter } from "expo-router";
import { Image } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

const Button = ({
  text,
  link,
  style,
  disabled,
  image,
  textStyle,
  incolor,
  handlePress,
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        if (handlePress) {
          handlePress;
          return;
        }
        if (link) router.push(`${link}`);
      }}
      className={`bg-primary-color ${
        image ? "flex-row space-x-2" : ""
      } items-center rounded-2xl py-2 mt-10 ${style}`}
    >
      {image && (
        <View className="h-8 w-8">
          <Image source={image} className="w-full h-full rounded-full" />
        </View>
      )}
      <Text className={`text-white text-2xl font-bold ${textStyle}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
