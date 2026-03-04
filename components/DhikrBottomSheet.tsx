
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
import { BlurView } from 'expo-blur';
import { DhikrList, DhikrItem } from '@/contexts/DhikrContext';

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
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={styles.bottomSheetContainer}
          onPress={(e) => e.stopPropagation()}
        >
          <BlurView intensity={90} style={styles.blurContainer}>
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
            >
              {DhikrList.map((dhikr, index) => {
                const isActive = index === activeDhikrIndex;
                const showDetails = dhikr.dhikr_id !== 'Tasbeeh';

                return (
                  <React.Fragment key={dhikr.dhikr_id}>
                    <TouchableOpacity
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
                        {showDetails && (
                          <Text
                            style={[
                              styles.dhikrArabic,
                              { color: textColor },
                            ]}
                          >
                            {dhikr.Arabic}
                          </Text>
                        )}
                        <Text
                          style={[
                            styles.dhikrTransliteration,
                            { color: textColor },
                          ]}
                        >
                          {dhikr.DhikrSelectorText}
                        </Text>
                        {showDetails && dhikr.Meaning && (
                          <Text
                            style={[
                              styles.dhikrMeaning,
                              { color: textColor, opacity: 0.7 },
                            ]}
                          >
                            {dhikr.Meaning}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  </React.Fragment>
                );
              })}
            </ScrollView>
          </BlurView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    maxHeight: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  blurContainer: {
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
    paddingBottom: 40,
  },
  dhikrOption: {
    paddingVertical: 16,
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
