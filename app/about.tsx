
import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ImageSourcePropType,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useNavigation } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

export default function AboutScreen() {
  const { activeTheme } = useTheme();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: activeTheme.headerColor },
      headerTintColor: activeTheme.textColor,
      title: 'About',
      headerBackTitle: 'Back',
    });
  }, [activeTheme, navigation]);

  const textShadowStyle = {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  };

  const appName = 'Sadaq - Tasbih for Mindful Dhikr';
  const versionNumber = 'Version 1.0.0';

  const handlePrivacyPolicy = () => {
    console.log('Opening Privacy Policy');
    Linking.openURL('https://sites.google.com/view/sadaqapp/privacy-policy');
  };

  const handleTermsOfUse = () => {
    console.log('Opening Terms of Use');
    Linking.openURL('https://sites.google.com/view/sadaqapp/terms-of-use');
  };

  const handleContactSupport = () => {
    console.log('Opening Contact Support email');
    Linking.openURL('mailto:sactechnologiesbd@gmail.com');
  };

  const renderBackground = () => {
    const overlayColor = `rgba(0, 0, 0, ${activeTheme.overlayOpacity})`;
    
    if (activeTheme.bgType === 'image') {
      return (
        <ImageBackground
          source={resolveImageSource(activeTheme.bgValue)}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: overlayColor }]} />
          {renderContent()}
        </ImageBackground>
      );
    }
    
    return (
      <View style={[styles.background, { backgroundColor: activeTheme.bgValue as string }]}>
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: overlayColor }]} />
        {renderContent()}
      </View>
    );
  };

  const renderContent = () => (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: activeTheme.headerColor },
          headerTintColor: activeTheme.textColor,
          title: 'About',
          headerBackTitle: 'Back',
        }}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.centerContainer}>
          <Text style={[styles.appName, { color: activeTheme.textColor }, textShadowStyle]}>
            {appName}
          </Text>
          <Text style={[styles.versionNumber, { color: activeTheme.textColor }, textShadowStyle]}>
            {versionNumber}
          </Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.pillButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}
              onPress={handlePrivacyPolicy}
            >
              <Text style={[styles.pillButtonText, { color: activeTheme.textColor }]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.pillButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}
              onPress={handleTermsOfUse}
            >
              <Text style={[styles.pillButtonText, { color: activeTheme.textColor }]}>
                Terms of Use
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.pillButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}
              onPress={handleContactSupport}
            >
              <Text style={[styles.pillButtonText, { color: activeTheme.textColor }]}>
                Contact Support
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  return renderBackground();
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  versionNumber: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 60,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 16,
  },
  pillButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
