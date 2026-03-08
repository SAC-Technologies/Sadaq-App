
import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Stack, useNavigation } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

export default function ThemesScreen() {
  const navigation = useNavigation();
  const { activeTheme, changeTheme, themes } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: activeTheme.headerColor,
      },
      headerTintColor: activeTheme.textColor,
      title: 'Themes',
      headerBackTitle: 'Back',
    });
  }, [navigation, activeTheme]);

  console.log('ThemesScreen loaded with active theme:', activeTheme.name);

  const handleThemeSelect = (themeId: string) => {
    console.log('User selected theme:', themeId);
    changeTheme(themeId);
  };

  const BackgroundComponent = activeTheme.bgType === 'image' ? ImageBackground : View;
  const backgroundProps = activeTheme.bgType === 'image' 
    ? { source: resolveImageSource(activeTheme.bgValue), resizeMode: 'cover' as const }
    : {};

  return (
    <BackgroundComponent
      {...backgroundProps}
      style={[
        styles.container,
        activeTheme.bgType === 'color' && { backgroundColor: activeTheme.bgValue as string },
      ]}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Themes',
        }}
      />

      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.gridContainer}>
            {themes.map((theme) => {
              const isActive = theme.id === activeTheme.id;
              const themeName = theme.name;

              return (
                <View key={theme.id} style={styles.themeCard}>
                  {theme.bgType === 'color' ? (
                    <View
                      style={[
                        styles.previewBox,
                        { backgroundColor: theme.bgValue as string },
                        isActive && {
                          borderWidth: 4,
                          borderColor: activeTheme.textColor,
                        },
                      ]}
                    />
                  ) : (
                    <Image
                      source={resolveImageSource(theme.bgValue)}
                      style={[
                        styles.previewBox,
                        isActive && {
                          borderWidth: 4,
                          borderColor: activeTheme.textColor,
                        },
                      ]}
                      resizeMode="cover"
                    />
                  )}
                  <Text
                    style={[
                      styles.themeName,
                      { color: activeTheme.textColor },
                    ]}
                  >
                    {themeName}
                  </Text>
                  <TouchableOpacity
                    style={styles.useButton}
                    onPress={() => handleThemeSelect(theme.id)}
                  >
                    <Text
                      style={[
                        styles.useButtonText,
                        { color: activeTheme.textColor },
                      ]}
                    >
                      Use
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  themeCard: {
    width: '45%',
    marginBottom: 24,
    alignItems: 'center',
  },
  previewBox: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  useButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  useButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
