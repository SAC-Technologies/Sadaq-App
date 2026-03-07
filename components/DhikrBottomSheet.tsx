
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
  backgroundColor: string | number;
  bgType?: 'color' | 'image';
}

export default function DhikrBottomSheet({
  visible,
  onClose,
  onSelectDhikr,
  activeDhikrIndex,
  textColor,
  backgroundColor,
  bgType = 'color',
}: DhikrBottomSheetProps) {
  const handleSelectDhikr = (index: number) => {
    console.log('Dhikr option selected from bottom sheet:', DhikrList[index].dhikr_id);
    onSelectDhikr(index);
    onClose();
  };

  const sheetBackgroundColor = bgType === 'image' ? 'rgba(0, 0, 0, 0.85)' : backgroundColor;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* The Backdrop */}
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropPressable} onPress={onClose} />
        
        {/* The Container (Bottom Sheet View) */}
        <View style={[styles.container, { backgroundColor: sheetBackgroundColor as string }]}>
          
          {/* The Header: Drag-indicator pill */}
          <View style={styles.dragIndicator} />
          
          {/* The Scroll Layout */}
          <ScrollView style={styles.scrollContainer}>
            
            {/* The Buttons (Single Column Pills) */}
            {DhikrList.map((dhikr, index) => {
              const optionText = dhikr.DhikrSelectorText;
              
              return (
                <TouchableOpacity
                  key={dhikr.dhikr_id}
                  style={styles.pillButton}
                  onPress={() => handleSelectDhikr(index)}
                >
                  {/* Text Styling */}
                  <Text style={[styles.pillText, { color: textColor }]}>
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
  // The Backdrop
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  backdropPressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // The Container (Bottom Sheet View)
  container: {
    height: 450,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  // The Header: Drag-indicator pill
  dragIndicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    marginBottom: 20,
  },
  // The Scroll Layout
  scrollContainer: {
    flex: 1,
  },
  // Button Styling (Single Column Pills)
  pillButton: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  // Text Styling
  pillText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});
