
import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Switch,
  ImageSourcePropType,
} from 'react-native';
import { Stack, useNavigation } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettings } from '@/contexts/SettingsContext';
import { SafeAreaView } from 'react-native-safe-area-context';

function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

export default function AppSettingsScreen() {
  const navigation = useNavigation();
  const { activeTheme } = useTheme();
  const {
    showArabic,
    showTransliteration,
    showMeaning,
    toggleArabic,
    toggleTransliteration,
    toggleMeaning,
  } = useSettings();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: activeTheme.headerColor,
      },
      headerTintColor: activeTheme.textColor,
      title: 'App Settings',
      headerBackTitle: 'Back',
    });
  }, [navigation, activeTheme]);

  console.log('AppSettingsScreen loaded');

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
          title: 'App Settings',
        }}
      />

      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.settingRow}>
            <Text
              style={[
                styles.settingLabel,
                { color: activeTheme.textColor },
                styles.textShadow,
              ]}
            >
              Show Arabic
            </Text>
            <Switch
              value={showArabic}
              onValueChange={toggleArabic}
              trackColor={{ false: '#767577', true: activeTheme.textColor }}
              thumbColor="#f4f3f4"
            />
          </View>

          <View style={styles.settingRow}>
            <Text
              style={[
                styles.settingLabel,
                { color: activeTheme.textColor },
                styles.textShadow,
              ]}
            >
              Show Transliteration
            </Text>
            <Switch
              value={showTransliteration}
              onValueChange={toggleTransliteration}
              trackColor={{ false: '#767577', true: activeTheme.textColor }}
              thumbColor="#f4f3f4"
            />
          </View>

          <View style={styles.settingRow}>
            <Text
              style={[
                styles.settingLabel,
                { color: activeTheme.textColor },
                styles.textShadow,
              ]}
            >
              Show Meaning
            </Text>
            <Switch
              value={showMeaning}
              onValueChange={toggleMeaning}
              trackColor={{ false: '#767577', true: activeTheme.textColor }}
              thumbColor="#f4f3f4"
            />
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
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});
