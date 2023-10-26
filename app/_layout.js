import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded] = useFonts({
    "Mervale-Script": require("../assets/fonts/MervaleScript-Regular.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack
      onLayout={onLayoutRootView}
      screenOptions={{
        headerShown: false,
        // headerShadowVisible: false,
        // headerTitle: "",
        // headerStyle: {
        //   backgroundColor: "black",
        // },
      }}
    />
  );
};

export default Layout;
