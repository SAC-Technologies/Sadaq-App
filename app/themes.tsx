
import React, { useLayoutEffect, useState } from 'react';
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
import { Stack, useRouter, useNavigation } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { IconSymbol } from '@/components/IconSymbol';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';
import LeftSideMenu from '@/components/LeftSideMenu';

// Helper to resolve image sources (handles both local require() and remote URLs)
function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

export default function ThemesScreen() {
  const { activeTheme, changeTheme, themes } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  console.log('ThemesScreen loaded with active theme:', activeTheme.name);

  // Safe header sync using useLayoutEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Themes',
      headerStyle: {
        backgroundColor: activeTheme.headerColor,
      },
      headerTintColor: activeTheme.textColor,
      headerShown: true,
      headerTransparent: false,
      headerShadowVisible: false,
      headerBackVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          style={styles.hamburgerButton}
          onPress={() => {
            console.log('Hamburger menu button tapped from ThemesScreen');
            setMenuVisible(true);
          }}
        >
          <IconSymbol
            ios_icon_name="line.horizontal.3"
            android_material_icon_name="menu"
            size={24}
            color={activeTheme.textColor}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, activeTheme]);

  const handleThemeSelect = (themeId: string) => {
    console.log('User selected theme:', themeId);
    changeTheme(themeId);
  };

  const handleCloseMenu = () => {
    console.log('Left side menu closed from ThemesScreen');
    setMenuVisible(false);
  };

  const renderContent = () => (
    <>
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
                <React.Fragment key={theme.id}>
                  <View style={styles.themeCard}>
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
                        styles.textShadow,
                      ]}
                    >
                      {themeName}
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.selectButton,
                        { borderColor: activeTheme.textColor },
                      ]}
                      onPress={() => handleThemeSelect(theme.id)}
                    >
                      <Text
                        style={[
                          styles.selectButtonText,
                          { color: activeTheme.textColor },
                          styles.textShadow,
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

      <LeftSideMenu
        visible={menuVisible}
        onClose={handleCloseMenu}
        textColor={activeTheme.textColor}
      />
    </>
  );

  if (activeTheme.bgType === 'color') {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: activeTheme.bgValue as string },
        ]}
      >
        <View style={styles.overlay} />
        {renderContent()}
      </View>
    );
  }

  return (
    <ImageBackground
      source={resolveImageSource(activeTheme.bgValue)}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      {renderContent()}
    </ImageBackground>
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
  hamburgerButton: {
    padding: 8,
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
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
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
