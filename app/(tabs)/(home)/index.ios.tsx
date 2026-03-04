
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { useThemeConfig } from '@/contexts/ThemeContext';
import { useCounter } from '@/hooks/useCounter';
import WarningModal from '@/components/WarningModal';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { currentTheme } = useThemeConfig();
  const {
    counterValue,
    showWarning,
    incrementCounter,
    decrementCounter,
    resetCounter,
    closeWarning,
  } = useCounter();

  const formattedCounterValue = counterValue.toLocaleString('en-US');

  const dhikrArabic = 'سُبحانَ الله';
  const dhikrTransliteration = 'SubhanAllah';
  const dhikrMeaning = 'Glory be to Allah';
  const dhikrSelectorText = 'SubhanAllah';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.AppBackground },
      ]}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Digital Tasbeeh',
          headerStyle: {
            backgroundColor: currentTheme.AppBackground,
          },
          headerTintColor: currentTheme.GlobalTextColour,
          headerLeft: () => (
            <TouchableOpacity
              style={styles.hamburgerButton}
              onPress={() => console.log('Hamburger menu tapped')}
            >
              <IconSymbol
                ios_icon_name="line.horizontal.3"
                android_material_icon_name="menu"
                size={24}
                color={currentTheme.GlobalTextColour}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.content}>
          {/* Dhikr Text Section */}
          <View style={styles.dhikrSection}>
            <Text
              style={[
                styles.dhikrArabic,
                { color: currentTheme.GlobalTextColour },
              ]}
            >
              {dhikrArabic}
            </Text>
            <Text
              style={[
                styles.dhikrTransliteration,
                { color: currentTheme.GlobalTextColour },
              ]}
            >
              {dhikrTransliteration}
            </Text>
            <Text
              style={[
                styles.dhikrMeaning,
                { color: currentTheme.GlobalTextColour },
              ]}
            >
              {dhikrMeaning}
            </Text>
          </View>

          {/* Counter Circle with Arrows */}
          <View style={styles.counterSection}>
            {/* Left Arrow */}
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => console.log('Left arrow tapped')}
            >
              <IconSymbol
                ios_icon_name="chevron.left"
                android_material_icon_name="chevron-left"
                size={32}
                color={currentTheme.CounterArrowColour}
              />
            </TouchableOpacity>

            {/* Counter Circle */}
            <Pressable
              style={[
                styles.counterCircle,
                { borderColor: currentTheme.GlobalTextColour },
              ]}
              onPress={incrementCounter}
            >
              <View style={styles.counterCircleArea}>
                <Text
                  style={[
                    styles.counterValue,
                    { color: currentTheme.GlobalTextColour },
                  ]}
                >
                  {formattedCounterValue}
                </Text>
              </View>
            </Pressable>

            {/* Right Arrow */}
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => console.log('Right arrow tapped')}
            >
              <IconSymbol
                ios_icon_name="chevron.right"
                android_material_icon_name="chevron-right"
                size={32}
                color={currentTheme.CounterArrowColour}
              />
            </TouchableOpacity>
          </View>

          {/* Reset and Reduce Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={resetCounter}
            >
              <IconSymbol
                ios_icon_name="arrow.clockwise"
                android_material_icon_name="refresh"
                size={28}
                color={currentTheme.GlobalTextColour}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={decrementCounter}
            >
              <IconSymbol
                ios_icon_name="minus"
                android_material_icon_name="remove"
                size={28}
                color={currentTheme.GlobalTextColour}
              />
            </TouchableOpacity>
          </View>

          {/* Dhikr Selector Button */}
          <TouchableOpacity
            style={[
              styles.dhikrSelectorButton,
              { borderColor: currentTheme.GlobalTextColour },
            ]}
            onPress={() => console.log('Dhikr selector tapped')}
          >
            <Text
              style={[
                styles.dhikrSelectorText,
                { color: currentTheme.GlobalTextColour },
              ]}
            >
              {dhikrSelectorText}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Warning Modal */}
      <WarningModal
        visible={showWarning}
        onClose={closeWarning}
        message="Slow down and focus on your Dhikr for maximum benefit"
      />
    </View>
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
  },
  dhikrSection: {
    alignItems: 'center',
    marginBottom: 40,
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
  counterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  arrowButton: {
    padding: 16,
    marginHorizontal: 20,
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
  actionButton: {
    padding: 16,
    backgroundColor: 'transparent',
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
