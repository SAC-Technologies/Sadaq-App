
import React, { useState, useLayoutEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Platform,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Stack, useNavigation } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useTheme } from '@/contexts/ThemeContext';
import { useDhikr } from '@/contexts/DhikrContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useCounter } from '@/hooks/useCounter';
import WarningModal from '@/components/WarningModal';
import LeftSideMenu from '@/components/LeftSideMenu';
import DhikrBottomSheet from '@/components/DhikrBottomSheet';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TRANSLITERATION_FONT_SIZE = 20;
const ARABIC_FONT_SIZE = TRANSLITERATION_FONT_SIZE;

export default function HomeScreen() {
  const navigation = useNavigation();
  const { activeTheme } = useTheme();
  const {
    activeDhikrIndex,
    activeDhikr,
    selectDhikr,
    navigateDhikrNext,
    navigateDhikrPrev,
  } = useDhikr();
  const {
    showArabic,
    showTransliteration,
    showMeaning,
  } = useSettings();
  const {
    counterValue,
    showWarning,
    incrementCounter,
    decrementCounter,
    resetCounter,
    closeWarning,
  } = useCounter();

  const [menuVisible, setMenuVisible] = useState(false);
  const [dhikrSheetVisible, setDhikrSheetVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: activeTheme.headerColor,
      },
      headerTintColor: activeTheme.textColor,
      headerShown: true,
      headerTransparent: false,
      headerShadowVisible: false,
    });
  }, [navigation, activeTheme]);

  const formattedCounterValue = counterValue.toLocaleString('en-US');
  const dhikrArabic = activeDhikr.Arabic;
  const dhikrTransliteration = activeDhikr.Transliteration;
  const dhikrMeaning = activeDhikr.Meaning;
  const dhikrSelectorText = activeDhikr.DhikrSelectorText;
  const overlayColor = `rgba(0, 0, 0, ${activeTheme.overlayOpacity})`;

  const handleOpenMenu = () => {
    console.log('Hamburger menu button tapped');
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    console.log('Left side menu closed');
    setMenuVisible(false);
  };

  const handleOpenDhikrSheet = () => {
    console.log('Dhikr selector button tapped');
    setDhikrSheetVisible(true);
  };

  const handleCloseDhikrSheet = () => {
    console.log('Dhikr bottom sheet closed');
    setDhikrSheetVisible(false);
  };

  const handleLeftArrow = () => {
    console.log('Left arrow button tapped');
    navigateDhikrPrev(counterValue);
  };

  const handleRightArrow = () => {
    console.log('Right arrow button tapped');
    navigateDhikrNext(counterValue);
  };

  const handleSelectDhikr = (index: number) => {
    console.log('Selecting Dhikr at index:', index);
    selectDhikr(index, counterValue);
  };

  const BackgroundComponent = activeTheme.bgType === 'image' ? ImageBackground : View;
  const backgroundProps = activeTheme.bgType === 'image' 
    ? { source: activeTheme.bgValue, resizeMode: 'cover' as const }
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
          title: 'Sadaq - Digital Tasbih',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.hamburgerButton}
              onPress={handleOpenMenu}
            >
              <IconSymbol
                ios_icon_name="line.horizontal.3"
                android_material_icon_name="menu"
                size={24}
                color={activeTheme.textColor}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: overlayColor }]} />

      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.content}>
          <View style={styles.dhikrSection}>
            {showArabic && (
              <Text
                style={[
                  styles.dhikrArabic,
                  { color: activeTheme.textColor },
                  styles.textShadow,
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                {dhikrArabic}
              </Text>
            )}
            {showTransliteration && (
              <Text
                style={[
                  styles.dhikrTransliteration,
                  { color: activeTheme.textColor },
                  styles.textShadow,
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                {dhikrTransliteration}
              </Text>
            )}
            {showMeaning && (
              <Text
                style={[
                  styles.dhikrMeaning,
                  { color: activeTheme.textColor },
                  styles.textShadow,
                ]}
                numberOfLines={3}
                adjustsFontSizeToFit={true}
              >
                {dhikrMeaning}
              </Text>
            )}
          </View>

          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={handleLeftArrow}
            >
              <IconSymbol
                ios_icon_name="chevron.left"
                android_material_icon_name="chevron-left"
                size={32}
                color={activeTheme.textColor}
              />
            </TouchableOpacity>

            <Pressable
              style={[
                styles.counterCircle,
                { borderColor: activeTheme.textColor },
              ]}
              onPress={incrementCounter}
            >
              <View style={styles.counterCircleArea}>
                <Text
                  style={[
                    styles.counterValue,
                    { color: activeTheme.textColor },
                    styles.textShadow,
                  ]}
                >
                  {formattedCounterValue}
                </Text>
              </View>
            </Pressable>

            <TouchableOpacity
              style={styles.arrowButton}
              onPress={handleRightArrow}
            >
              <IconSymbol
                ios_icon_name="chevron.right"
                android_material_icon_name="chevron-right"
                size={32}
                color={activeTheme.textColor}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.frostedButton}
              onPress={resetCounter}
            >
              <IconSymbol
                ios_icon_name="arrow.clockwise"
                android_material_icon_name="refresh"
                size={28}
                color={activeTheme.textColor}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.frostedButton}
              onPress={decrementCounter}
            >
              <IconSymbol
                ios_icon_name="minus"
                android_material_icon_name="remove"
                size={28}
                color={activeTheme.textColor}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.dhikrSelectorButton,
              { borderColor: activeTheme.textColor },
            ]}
            onPress={handleOpenDhikrSheet}
          >
            <Text
              style={[
                styles.dhikrSelectorText,
                { color: activeTheme.textColor },
                styles.textShadow,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {dhikrSelectorText}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <WarningModal
        visible={showWarning}
        onClose={closeWarning}
        message="Slow down and focus on your Dhikr for maximum benefit"
      />

      <LeftSideMenu
        visible={menuVisible}
        onClose={handleCloseMenu}
        textColor={activeTheme.textColor}
      />

      <DhikrBottomSheet
        visible={dhikrSheetVisible}
        onClose={handleCloseDhikrSheet}
        onSelectDhikr={handleSelectDhikr}
        activeDhikrIndex={activeDhikrIndex}
        textColor={activeTheme.textColor}
        backgroundColor={activeTheme.bgType === 'image' ? 'rgba(0, 0, 0, 0.85)' : (activeTheme.bgValue as string)}
      />
    </BackgroundComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  hamburgerButton: {
    padding: 8,
    marginLeft: Platform.OS === 'android' ? 8 : 0,
  },
  dhikrSection: {
    alignItems: 'center',
    marginBottom: 40,
    minHeight: 140,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
  dhikrArabic: {
    fontSize: ARABIC_FONT_SIZE,
    lineHeight: ARABIC_FONT_SIZE * 1.8,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
    paddingVertical: 10,
  },
  dhikrTransliteration: {
    fontSize: TRANSLITERATION_FONT_SIZE,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  dhikrMeaning: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    width: '100%',
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  counterContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 30,
  },
  arrowButton: {
    padding: 16,
  },
  counterCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  counterCircleArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    gap: 60,
  },
  frostedButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dhikrSelectorButton: {
    width: SCREEN_WIDTH * 0.7,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dhikrSelectorText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
