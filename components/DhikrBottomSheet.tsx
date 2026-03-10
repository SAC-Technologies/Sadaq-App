
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
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropPressable} onPress={onClose} />
        
        <View style={styles.container}>
          <View style={styles.dragIndicator} />
          
          <ScrollView style={styles.scrollContainer}>
            {DhikrList.map((dhikr, index) => {
              const optionText = dhikr.DhikrSelectorText;
              
              return (
                <TouchableOpacity
                  key={dhikr.dhikr_id}
                  style={styles.pillButton}
                  onPress={() => handleSelectDhikr(index)}
                >
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
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  backdropPressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    height: 450,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  dragIndicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  pillButton: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    paddingVertical: 16,
    marginBottom: 12,
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  pillText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});
