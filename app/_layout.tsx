
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
import React, { useEffect, useRef } from "react";
import { SystemBars } from "react-native-edge-to-edge";
import "react-native-reanimated";
import { useNetworkState } from "expo-network";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Amiri_400Regular } from "@expo-google-fonts/amiri";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isConnected } = useNetworkState();
  const [loaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Amiri_400Regular,
  });
  const colorScheme = useColorScheme();
  const splashHiddenRef = useRef(false);

  // Robust splash screen hiding with multiple fallback mechanisms
  useEffect(() => {
    const hideSplashScreen = async () => {
      if (splashHiddenRef.current) {
        return;
      }

      try {
        await SplashScreen.hideAsync();
        splashHiddenRef.current = true;
      } catch (error) {
        // Silently handle error - splash screen might already be hidden
        splashHiddenRef.current = true;
      }
    };

    // Case 1: Fonts loaded successfully
    if (loaded) {
      hideSplashScreen();
      return;
    }

    // Case 2: Font loading error - hide splash screen anyway to prevent stuck state
    if (fontError) {
      hideSplashScreen();
      return;
    }

    // Case 3: Timeout fallback - ensure splash screen ALWAYS hides after 5 seconds
    // This prevents the app from being permanently stuck on splash screen
    const timeoutId = setTimeout(() => {
      if (!splashHiddenRef.current) {
        hideSplashScreen();
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [loaded, fontError]);

  // Show nothing while fonts are loading (keeps splash screen visible)
  // But the timeout ensures we won't be stuck here forever
  if (!loaded && !fontError) {
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
                  <Stack.Screen name="about" options={{ headerShown: false }} />
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
