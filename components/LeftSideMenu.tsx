
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
import { IconSymbol } from '@/components/IconSymbol';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

interface MenuItem {
  id: string;
  label: string;
  ios_icon_name: string;
  android_material_icon_name: string;
  route?: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    ios_icon_name: 'house.fill',
    android_material_icon_name: 'home',
    route: '/',
  },
  {
    id: 'themes',
    label: 'Themes',
    ios_icon_name: 'paintbrush.fill',
    android_material_icon_name: 'palette',
    route: '/themes',
  },
  {
    id: 'settings',
    label: 'App Settings',
    ios_icon_name: 'gearshape.fill',
    android_material_icon_name: 'settings',
  },
  {
    id: 'about',
    label: 'About',
    ios_icon_name: 'info.circle.fill',
    android_material_icon_name: 'info',
  },
  {
    id: 'rate',
    label: 'Rate us',
    ios_icon_name: 'star.fill',
    android_material_icon_name: 'star',
  },
];

interface LeftSideMenuProps {
  visible: boolean;
  onClose: () => void;
  textColor: string;
}

export default function LeftSideMenu({
  visible,
  onClose,
  textColor,
}: LeftSideMenuProps) {
  const router = useRouter();

  const handleMenuItemPress = (item: MenuItem) => {
    console.log('Menu item tapped:', item.label);
    
    if (item.route) {
      console.log('Navigating to route:', item.route);
      router.push(item.route);
      onClose();
    } else {
      console.log('No route defined for:', item.label);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={() => onClose()}>
        <Pressable
          style={styles.menuContainer}
          onPress={(e) => e.stopPropagation()}
        >
          <BlurView intensity={80} style={styles.blurContainer}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
            >
              {menuItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleMenuItemPress(item)}
                  >
                    <IconSymbol
                      ios_icon_name={item.ios_icon_name}
                      android_material_icon_name={item.android_material_icon_name}
                      size={24}
                      color={textColor}
                    />
                    <Text style={[styles.menuItemText, { color: textColor }]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                </React.Fragment>
              ))}
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
  },
  menuContainer: {
    width: '75%',
    maxWidth: 300,
    height: '100%',
  },
  blurContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 16,
  },
});
