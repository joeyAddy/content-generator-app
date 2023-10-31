import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Asset } from "expo-asset";
import { ScrollView } from "react-native";
import Button from "../../components/common/Button.js";
import IconFA from "react-native-vector-icons/FontAwesome";
import IconFE from "react-native-vector-icons/Feather";
import science from "../../assets/cgpic.jpg";
import PopularCard from "../../components/common/PopularCard.js";
import ExploreCard from "../../components/ExploreCard.js";
import SuggestionCards from "../../components/common/SuggestionCard.js";
import { SectionList } from "react-native-web";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

const image = Asset.fromModule(require("../../assets/bg.png")).uri;
const avatar = Asset.fromModule(require("../../assets/animation.gif")).uri;

const index = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);

  const [suggestionPage, setSuggestionPage] = useState("science");

  const [suggestionsList, setSuggestionsList] = useState([]);

  const careerList = [
    { title: "Doctors", prompt: "What is the doctor's oath?" },
    { title: "Pilots", prompt: "Pilot have to get what before a flight?" },
    { title: "Teachers", prompt: "Write me a teacher's pledge?" },
    {
      title: "Translator",
      prompt: "Minimum languages a Translator should know?",
    },
    {
      title: "Career Counselor",
      prompt: "Career options for a university student?",
    },
    {
      title: "Self-Help Book",
      prompt: "How to get past a toxic relationship?",
    },
    {
      title: "Financial Planning",
      prompt: "How can i avert financial crisis?",
    },
  ];

  const scienceList = [
    {
      title: "Science content",
      prompt:
        "Give me an interesting sentence about science, like a professor would.",
    },
    {
      title: "Biology content",
      prompt: "How many bones does the human body have?",
    },
    {
      title: "Maths Teacher",
      prompt: "What do grade 11 students learn in maths?",
    },
    {
      title: "English Teacher",
      prompt: "What is the past tense of Wind?",
    },
    {
      title: "Citation Generator",
      prompt: "Can you site this Hardvard style?",
    },
    { title: "Short essay on any topic", prompt: "Topic: How to be a girl?" },
  ];
  const artList = [
    { title: "Painting content", prompt: "Ten ideas for mural painting" },
    { title: "Dance moves", prompt: "How to salsa like a pro?" },
    { title: "Music content", prompt: "Song ideas for study time" },
    {
      title: "Novel recommendations",
      prompt: "What novels should I take on a vacation",
    },
    {
      title: "Poem generator",
      prompt: "Write a poem similar to 'Jack and Jill'",
    },
    {
      title: "Write a John Green-style story",
      prompt: "Write a John Green style novel using Ethan and Ella.",
    },
  ];
  const lifestyleList = [
    {
      title: "Lifestyle content",
      prompt: "Write me a youtube script for a vlog to Ghana",
    },
    {
      title: "Travelling",
      prompt: "What't the best country without natural disasters?",
    },
    {
      title: "Vacation",
      prompt: "What's the best country to go for vacation in the winter?",
    },
    {
      title: "Outfit ideas",
      prompt: "Wedding bridemaids and decor colours ideas",
    },
    {
      title: "Meal ideas and Ingredients",
      prompt: "intermitent fasting for a 70kg female",
    },
    {
      title: "Daily Horoscope",
      prompt: "Ask my horoscope and make a daily horoscope comment",
    },
  ];
  const funList = [
    {
      title: "Games content",
      prompt: "Best games for teenagers during picnic",
    },
    {
      title: "Hobbies content",
      prompt: "Write an eassy on hobbies you can earn from/",
    },
    {
      title: "Ten things to do every morning",
      prompt: "Ten things to do every morning",
    },
    { title: "Tell me a joke", prompt: "How would you define fun?" },
    {
      title: "Make up Ideas",
      prompt: "I am going to a dinner date, give me a makeup idea?",
    },
    { title: "Give advice like Eistein", prompt: "Give advice like Eistein" },
  ];

  useEffect(() => {
    setSuggestionsList(scienceList);
  }, []);

  useEffect(() => {
    (async () => {
      await AsyncStorage.getItem("user").then((value) => {
        if (value) {
          console.log("====================================");
          console.log(value);
          console.log("====================================");
          setUser(JSON.parse(value));
        }
      });
    })();
  }, []);

  // useEffect(() => {
  //   if (user === null) router.push("/login");
  // }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={{ uri: image }}
        className="flex-1 bg-cover px-5 pt-10 relative"
      >
        <View>
          <View className="flex-row items-center justify-center">
            <Pressable
              onPress={() => {
                router.push("/dashboard/editprofile");
              }}
              className="flex-1 items-center justify-center"
            >
              <LottieView
                className="h-2024 w-20 aspect-square "
                source={require("../../assets/lottie/chatbot.json")}
                autoPlay={true}
                // loop={true}
              />
              {/* <Image
                source={{ uri: avatar }}
                alt="avatar"
                className=""
              /> */}
            </Pressable>
            <View className="flex-1 items-center">
              <Text
                style={{ fontFamily: "Mervale-Script" }}
                className="text-white text-lg font-bold"
              >
                Welcome,
              </Text>
              <Text className="text-white text-xl font-bold w-full">
                {String(user?.fullName).split(" ")[0]}
              </Text>
            </View>
            <View className="ml-28">
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.removeItem("user");
                  AsyncStorage.removeItem("profileImage");
                  router.push("/login");
                }}
                className="items-center"
              >
                <IconFA size={22} name="sign-out" color="#1F7793" />
                <Text className="text-white text-xs">Log out</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-2">
            <View>
              <Text className="text-white text-xl font-bold mt-4">
                Most Searched
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-5 space-x-3"
            >
              <View>
                <PopularCard
                  title="Proposals"
                  content="Original proposal on any path of choice"
                  handlePress={() => {
                    router.push({
                      pathname: "/dashboard/newchat",
                      params: {
                        prompt: "Original proposal on any path of choice",
                      },
                    });
                  }}
                />
              </View>
              <View>
                <PopularCard
                  title="Letter Writing"
                  content="Original Letter, formal or informal"
                  handlePress={() => {
                    router.push({
                      pathname: "/dashboard/newchat",
                      params: {
                        prompt:
                          "Write me a [type of letter (formal or informal)] letter to [name of recipient] about [letter subject]",
                      },
                    });
                  }}
                />
              </View>
              <View>
                <PopularCard
                  title="Resume Writing"
                  content="Original resume for any job of choice"
                  handlePress={() => {
                    router.push({
                      pathname: "/dashboard/newchat",
                      params: {
                        prompt: "Original resume for any job of choice",
                      },
                    });
                  }}
                />
              </View>
            </ScrollView>
            <View>
              <View>
                <Text className="text-white text-xl font-bold mt-5">
                  Suggestions
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="w-fit space-x-4"
              >
                <View className="w-auto h-full ">
                  <Pressable
                    onPress={() => {
                      setSuggestionPage("science");
                      setSuggestionsList(scienceList);
                    }}
                    className={`bg-primary-color ${
                      suggestionPage === "science" &&
                      "border-2 border-slate-100"
                    } py-3 px-4 rounded-2xl mt-4`}
                  >
                    <Text className="font-semibold text-white text-md">
                      Science
                    </Text>
                  </Pressable>
                </View>
                <View className="w-auto h-full ">
                  <Pressable
                    onPress={() => {
                      setSuggestionPage("lifestyle");
                      setSuggestionsList(lifestyleList);
                    }}
                    className={`bg-primary-color  ${
                      suggestionPage === "lifestyle" &&
                      "border-2 border-slate-100"
                    } py-3 px-4 rounded-2xl mt-4`}
                  >
                    <Text className="font-semibold text-white text-md">
                      Lifestyle
                    </Text>
                  </Pressable>
                </View>
                <View className="w-auto h-full ">
                  <Pressable
                    onPress={() => {
                      setSuggestionPage("fun");
                      setSuggestionsList(funList);
                    }}
                    className={`bg-primary-color  ${
                      suggestionPage === "fun" && "border-2 border-slate-100"
                    } py-3 px-4 rounded-2xl mt-4`}
                  >
                    <Text className="font-semibold text-white text-md">
                      Fun
                    </Text>
                  </Pressable>
                </View>
                <View className="w-auto h-full ">
                  <Pressable
                    onPress={() => {
                      setSuggestionPage("career");
                      setSuggestionsList(careerList);
                    }}
                    className={`bg-primary-color  ${
                      suggestionPage === "career" && "border-2 border-slate-100"
                    } py-3 px-4 rounded-2xl mt-4`}
                  >
                    <Text className="font-semibold text-white text-md">
                      Career
                    </Text>
                  </Pressable>
                </View>
                <View className="w-auto h-full ">
                  <Pressable
                    onPress={() => {
                      setSuggestionPage("art");
                      setSuggestionsList(artList);
                    }}
                    className={`bg-primary-color  ${
                      suggestionPage === "art" && "border-2 border-slate-100"
                    } py-3 px-4 rounded-2xl mt-4`}
                  >
                    <Text className="font-semibold text-white text-md">
                      Art
                    </Text>
                  </Pressable>
                </View>
              </ScrollView>
            </View>
            <View className="mt-3">
              <ScrollView className="h-52" showsVerticalScrollIndicator={false}>
                {suggestionsList.map((suggestion, index) => (
                  <SuggestionCards
                    key={index}
                    insideText={suggestion.title}
                    handlePress={() => {
                      router.push({
                        pathname: "/dashboard/newchat",
                        params: { prompt: suggestion.prompt },
                      });
                    }}
                  />
                ))}
              </ScrollView>
            </View>
            <View className="flex-row justify-between items-center mt-4">
              <TouchableOpacity
                className="items-center"
                onPress={() => router.push("/dashboard/help")}
              >
                <IconFA name="question-circle" size={32} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/dashboard/newchat")}
              >
                <View className="flex-row shadow-2xl shadow-black z-50 bg-faint-blue self-center items-center w-32 py-2 px-5 rounded-2xl">
                  <View className="pr-1 mr-1 border-r border-solid relative">
                    <IconFA
                      size={20}
                      name="comment"
                      color="black"
                      style={{
                        position: "absolute",
                        zIndex: 100,
                        elevation: 50,
                      }}
                    />
                    <IconFA size={22} name="comment" color="white" />
                  </View>
                  <Text>New Chat</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className="items-center"
                onPress={() => router.push("/dashboard/settings")}
              >
                <IconFE name="settings" size={30} color="white" />
              </TouchableOpacity>
            </View>
            {/* <View className="my-8">
              <View>
                <Text className="text-white text-3xl mb-5">
                  Explore Other Options
                </Text>
              </View>
              <View className="space-y-3">
                <View>
                  <ExploreCard
                    iconName="user"
                    insideText="Share your work in the community and get feedback"
                  />
                </View>
                <View>
                  <ExploreCard
                    iconName="user"
                    insideText="Share your work in the community and get feedback"
                  />
                </View>
                <View>
                  <ExploreCard
                    iconName="user"
                    insideText="Share your work in the community and get feedback"
                  />
                </View>
                <View>
                  <ExploreCard
                    iconName="user"
                    insideText="Share your work in the community and get feedback"
                  />
                </View>
              </View>
            </View> */}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default index;
