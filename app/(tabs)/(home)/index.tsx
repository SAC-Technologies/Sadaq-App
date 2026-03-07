
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Platform,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import { Stack, useNavigation } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useTheme } from '@/contexts/ThemeContext';
import { useDhikr } from '@/contexts/DhikrContext';
import { useCounter } from '@/hooks/useCounter';
import WarningModal from '@/components/WarningModal';
import LeftSideMenu from '@/components/LeftSideMenu';
import DhikrBottomSheet from '@/components/DhikrBottomSheet';
import { useHeaderHeight } from '@react-navigation/elements';

// Helper to resolve image sources (handles both local require() and remote URLs)
function resolveImageSource(source: string | number | ImageSourcePropType | undefined): ImageSourcePropType {
  if (!source) return { uri: '' };
  if (typeof source === 'string') return { uri: source };
  return source as ImageSourcePropType;
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const { activeTheme } = useTheme();
  const headerHeight = useHeaderHeight();
  const AppBackground = activeTheme.bgValue;
  const GlobalTextColour = activeTheme.textColor;

  const {
    activeDhikrIndex,
    activeDhikr,
    selectDhikr,
    navigateDhikrNext,
    navigateDhikrPrev,
  } = useDhikr();
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

  useEffect(() => {
    navigation.setOptions({
      headerTintColor: GlobalTextColour,
    });
  }, [GlobalTextColour, navigation]);

  const formattedCounterValue = counterValue.toLocaleString('en-US');
  const dhikrArabic = activeDhikr.Arabic;
  const dhikrTransliteration = activeDhikr.Transliteration;
  const dhikrMeaning = activeDhikr.Meaning;
  const dhikrSelectorText = activeDhikr.DhikrSelectorText;

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

  const renderContent = () => (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Digital Tasbeeh',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.hamburgerButton}
              onPress={() => handleOpenMenu()}
            >
              <IconSymbol
                ios_icon_name="line.horizontal.3"
                android_material_icon_name="menu"
                size={24}
                color={GlobalTextColour}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={[styles.content, { paddingTop: headerHeight }]}>
        <View style={styles.dhikrSection}>
          <Text
            style={[
              styles.dhikrArabic,
              {
                color: GlobalTextColour,
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
              },
            ]}
          >
            {dhikrArabic}
          </Text>
          <Text
            style={[
              styles.dhikrTransliteration,
              {
                color: GlobalTextColour,
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
              },
            ]}
          >
            {dhikrTransliteration}
          </Text>
          <Text
            style={[
              styles.dhikrMeaning,
              {
                color: GlobalTextColour,
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10,
              },
            ]}
          >
            {dhikrMeaning}
          </Text>
        </View>

        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => handleLeftArrow()}
          >
            <IconSymbol
              ios_icon_name="chevron.left"
              android_material_icon_name="chevron-left"
              size={32}
              color={GlobalTextColour}
            />
          </TouchableOpacity>

          <Pressable
            style={[
              styles.counterCircle,
              { borderColor: GlobalTextColour },
            ]}
            onPress={() => incrementCounter()}
          >
            <View style={styles.counterCircleArea}>
              <Text
                style={[
                  styles.counterValue,
                  {
                    color: GlobalTextColour,
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10,
                  },
                ]}
              >
                {formattedCounterValue}
              </Text>
            </View>
          </Pressable>

          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => handleRightArrow()}
          >
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron-right"
              size={32}
              color={GlobalTextColour}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <View style={styles.frostedButton}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => resetCounter()}
            >
              <IconSymbol
                ios_icon_name="arrow.clockwise"
                android_material_icon_name="refresh"
                size={28}
                color={GlobalTextColour}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.frostedButton}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => decrementCounter()}
            >
              <IconSymbol
                ios_icon_name="minus"
                android_material_icon_name="remove"
                size={28}
                color={GlobalTextColour}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.dhikrSelectorButton,
            { borderColor: GlobalTextColour },
          ]}
          onPress={() => handleOpenDhikrSheet()}
        >
          <Text
            style={[
              styles.dhikrSelectorText,
              { color: GlobalTextColour },
            ]}
          >
            {dhikrSelectorText}
          </Text>
        </TouchableOpacity>
      </View>

      <WarningModal
        visible={showWarning}
        onClose={() => closeWarning()}
        message="Slow down and focus on your Dhikr for maximum benefit"
      />

      <LeftSideMenu
        visible={menuVisible}
        onClose={() => handleCloseMenu()}
        textColor={GlobalTextColour}
      />

      <DhikrBottomSheet
        visible={dhikrSheetVisible}
        onClose={() => handleCloseDhikrSheet()}
        onSelectDhikr={(index) => handleSelectDhikr(index)}
        activeDhikrIndex={activeDhikrIndex}
        textColor={GlobalTextColour}
        backgroundColor={typeof AppBackground === 'string' ? AppBackground : '#000000'}
        bgType={activeTheme.bgType}
      />
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
  },
  dhikrArabic: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  dhikrTransliteration: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  dhikrMeaning: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dhikrSelectorButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  dhikrSelectorText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
