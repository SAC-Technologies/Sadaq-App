
import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { DhikrList, DhikrItem } from '@/contexts/DhikrContext';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DhikrBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelectDhikr: (index: number) => void;
  activeDhikrIndex: number;
  textColor: string;
  backgroundColor: string;
}

export default function DhikrBottomSheet({
  visible,
  onClose,
  onSelectDhikr,
  activeDhikrIndex,
  textColor,
  backgroundColor,
}: DhikrBottomSheetProps) {
  const handleSelectDhikr = (index: number) => {
    console.log('Dhikr option selected from bottom sheet:', DhikrList[index].dhikr_id);
    onSelectDhikr(index);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.overlayPressable} onPress={onClose} />
        <View style={styles.bottomSheetContainer}>
          <SafeAreaView style={styles.safeAreaContainer} edges={['bottom']}>
            <View style={styles.handleContainer}>
              <View
                style={[styles.handle, { backgroundColor: textColor }]}
              />
            </View>

            <Text style={[styles.title, { color: textColor }]}>
              Select Dhikr
            </Text>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={true}
            >
              {DhikrList.map((dhikr, index) => {
                const isActive = index === activeDhikrIndex;
                const dhikrArabicText = dhikr.Arabic;
                const dhikrSelectorText = dhikr.DhikrSelectorText;
                const dhikrMeaningText = dhikr.Meaning;

                return (
                  <TouchableOpacity
                    key={dhikr.dhikr_id}
                    style={[
                      styles.dhikrOption,
                      isActive && {
                        backgroundColor: `${textColor}20`,
                        borderColor: textColor,
                        borderWidth: 1,
                      },
                    ]}
                    onPress={() => handleSelectDhikr(index)}
                  >
                    <View style={styles.dhikrContent}>
                      <Text
                        style={[
                          styles.dhikrArabic,
                          { color: textColor },
                        ]}
                      >
                        {dhikrArabicText}
                      </Text>
                      <Text
                        style={[
                          styles.dhikrTransliteration,
                          { color: textColor },
                        ]}
                      >
                        {dhikrSelectorText}
                      </Text>
                      <Text
                        style={[
                          styles.dhikrMeaning,
                          { color: textColor, opacity: 0.7 },
                        ]}
                      >
                        {dhikrMeaningText}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  overlayPressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomSheetContainer: {
    maxHeight: '70%',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  safeAreaContainer: {
    flex: 1,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    opacity: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  dhikrOption: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  dhikrContent: {
    alignItems: 'center',
  },
  dhikrArabic: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  dhikrTransliteration: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  dhikrMeaning: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
});
