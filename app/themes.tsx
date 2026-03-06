
import React from 'react';
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
import { Stack, useRouter, usePathname } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

// Helper to resolve image sources (handles both local require() and remote URLs)
function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

export default function ThemesScreen() {
  const { activeTheme, changeTheme, themes } = useTheme();
  const router = useRouter();
  const GlobalTextColour = activeTheme.textColor;
  const AppBackground = activeTheme.bgValue;

  console.log('ThemesScreen loaded with active theme:', activeTheme.name);

  const handleThemeSelect = (themeId: string) => {
    console.log('User selected theme:', themeId);
    changeTheme(themeId);
  };

  const renderContent = () => (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={StyleSheet.absoluteFillObject}>
        <View style={styles.darkOverlay} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.gridContainer}>
            {themes.map((theme) => {
              const isActive = theme.id === activeTheme.id;
              const themeName = theme.name;

              return (
                <React.Fragment key={theme.id}>
                  <View style={styles.themeCard}>
                    {theme.bgType === 'color' ? (
                      <View
                        style={[
                          styles.previewBox,
                          { backgroundColor: theme.bgValue as string },
                          isActive && {
                            borderWidth: 4,
                            borderColor: GlobalTextColour,
                          },
                        ]}
                      />
                    ) : (
                      <Image
                        source={resolveImageSource(theme.bgValue)}
                        style={[
                          styles.previewImage,
                          isActive && {
                            borderWidth: 4,
                            borderColor: GlobalTextColour,
                          },
                        ]}
                        resizeMode="cover"
                      />
                    )}
                    <Text
                      style={[
                        styles.themeName,
                        {
                          color: GlobalTextColour,
                          textShadowColor: 'rgba(0, 0, 0, 0.75)',
                          textShadowOffset: { width: 1, height: 1 },
                          textShadowRadius: 4,
                        },
                      ]}
                    >
                      {themeName}
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.selectButton,
                        { borderColor: GlobalTextColour },
                      ]}
                      onPress={() => handleThemeSelect(theme.id)}
                    >
                      <Text
                        style={[
                          styles.selectButtonText,
                          {
                            color: GlobalTextColour,
                            textShadowColor: 'rgba(0, 0, 0, 0.75)',
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 4,
                          },
                        ]}
                      >
                        Use
                      </Text>
                    </TouchableOpacity>
                  </View>
                </React.Fragment>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );

  if (activeTheme.bgType === 'color') {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: AppBackground as string },
        ]}
      >
        {renderContent()}
      </View>
    );
  }

  return (
    <ImageBackground
      source={resolveImageSource(AppBackground)}
      style={styles.container}
      resizeMode="cover"
    >
      {renderContent()}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 80,
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
  previewImage: {
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
  },
  selectButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
