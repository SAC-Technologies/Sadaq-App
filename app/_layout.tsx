
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
import { SettingsProvider } from "@/contexts/SettingsContext";
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
      background: "#A4CFDB",
      card: "#1E1E8F",
      text: "#FFFFFF",
      border: "#FFFFFF",
      primary: "#4169E1",
    },
  };

  const customLightTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#A4CFDB",
      card: "#1E1E8F",
      text: "#FFFFFF",
      border: "#FFFFFF",
      primary: "#4169E1",
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TasbeehThemeProvider>
        <SettingsProvider>
          <DhikrProvider>
            <WidgetProvider>
              <ThemeProvider value={colorScheme === "dark" ? customDarkTheme : customLightTheme}>
                <SystemBars style="light" />
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="themes" options={{ headerShown: false }} />
                  <Stack.Screen name="app-settings" options={{ headerShown: false }} />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="light" />
              </ThemeProvider>
            </WidgetProvider>
          </DhikrProvider>
        </SettingsProvider>
      </TasbeehThemeProvider>
    </GestureHandlerRootView>
  );
}
