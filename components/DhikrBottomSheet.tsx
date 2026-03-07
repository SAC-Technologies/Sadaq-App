
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
      {/* Layer 1: The Backdrop */}
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropPressable} onPress={onClose} />
        
        {/* Layer 2: The Transparent Glass Sheet */}
        <View style={[styles.glassSheet, { borderColor: textColor }]}>
          
          {/* Layer 3: The Scroll */}
          <ScrollView style={styles.scrollContainer}>
            
            {/* Layer 4: The Options */}
            {DhikrList.map((dhikr, index) => {
              const optionText = dhikr.DhikrSelectorText;
              
              return (
                <TouchableOpacity
                  key={dhikr.dhikr_id}
                  style={[
                    styles.optionButton,
                    { borderBottomColor: textColor },
                  ]}
                  onPress={() => handleSelectDhikr(index)}
                >
                  {/* Layer 5: The Text */}
                  <Text style={[styles.optionText, { color: textColor }]}>
                    {optionText}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Layer 1: The Backdrop
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdropPressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Layer 2: The Transparent Glass Sheet
  glassSheet: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    width: '100%',
    height: 400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  // Layer 3: The Scroll
  scrollContainer: {
    flex: 1,
  },
  // Layer 4: The Options
  optionButton: {
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  // Layer 5: The Text
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
