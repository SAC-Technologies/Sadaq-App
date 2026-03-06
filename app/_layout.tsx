
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { ThemeProvider as TasbeehThemeProvider } from "@/contexts/ThemeContext";
import { DhikrProvider } from "@/contexts/DhikrContext";
import { Stack, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { SystemBars } from "react-native-edge-to-edge";
import "react-native-reanimated";
import { useNetworkState } from "expo-network";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { IconSymbol } from "@/components/IconSymbol";
import LeftSideMenu from "@/components/LeftSideMenu";

SplashScreen.preventAutoHideAsync();

function NavigationContent() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const handleOpenMenu = () => {
    console.log('Hamburger menu button tapped from header');
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    console.log('Left side menu closed');
    setMenuVisible(false);
  };

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
          headerShadowVisible: false,
          headerStyle: { 
            backgroundColor: 'transparent',
          },
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="themes" 
          options={{ 
            animation: 'fade',
            headerShown: true,
            headerTransparent: true,
            headerShadowVisible: false,
            headerStyle: { 
              backgroundColor: 'transparent',
            },
            headerTitle: '',
            headerLeft: () => (
              <TouchableOpacity
                style={{ 
                  padding: 15, 
                  zIndex: 999, 
                  elevation: 999,
                }}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                onPress={handleOpenMenu}
              >
                <IconSymbol
                  ios_icon_name="line.horizontal.3"
                  android_material_icon_name="menu"
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            ),
          }} 
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      
      <LeftSideMenu
        visible={menuVisible}
        onClose={handleCloseMenu}
        textColor="#FFFFFF"
      />
    </>
  );
}

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
              <NavigationContent />
              <StatusBar style="light" />
            </ThemeProvider>
          </WidgetProvider>
        </DhikrProvider>
      </TasbeehThemeProvider>
    </GestureHandlerRootView>
  );
}
