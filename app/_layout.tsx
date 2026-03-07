
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { ThemeProvider as TasbeehThemeProvider } from "@/contexts/ThemeContext";
import { DhikrProvider } from "@/contexts/DhikrContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useEffect } from "react";
import { SystemBars } from "react-native-edge-to-edge";
import "react-native-reanimated";
import { useNetworkState } from "expo-network";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isConnected } = useNetworkState();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const customDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#000000",
      card: "#1E1E1E",
      text: "#FFFFFF",
      border: "#FFFFFF",
      primary: "#4169E1",
    },
  };

  const customLightTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#000000",
      card: "#1E1E1E",
      text: "#FFFFFF",
      border: "#FFFFFF",
      primary: "#4169E1",
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TasbeehThemeProvider>
        <DhikrProvider>
          <WidgetProvider>
            <ThemeProvider value={colorScheme === "dark" ? customDarkTheme : customLightTheme}>
              <SystemBars style="light" />
              <Stack
                screenOptions={{
                  headerShown: true,
                  headerTransparent: true,
                  headerStyle: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  },
                  headerShadowVisible: false,
                  headerBackVisible: true,
                }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="themes" options={{ animation: 'fade' }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="light" />
            </ThemeProvider>
          </WidgetProvider>
        </DhikrProvider>
      </TasbeehThemeProvider>
    </GestureHandlerRootView>
  );
}
