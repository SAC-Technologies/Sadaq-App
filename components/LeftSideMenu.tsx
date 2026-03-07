
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
import { useRouter, usePathname } from 'expo-router';

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
    route: '/(tabs)/(home)',
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
  const pathname = usePathname();

  const handleMenuItemPress = (item: MenuItem) => {
    console.log('Menu item tapped:', item.label);

    // Smart navigation: check if we're already on the target route
    if (item.route) {
      const currentRoute = pathname;
      const targetRoute = item.route;

      console.log('Current route:', currentRoute, 'Target route:', targetRoute);

      // CRITICAL: "Stay Put" Logic - If already on the target screen, ONLY close the drawer
      // Do NOT call push, replace, or any navigation function to prevent flickering
      if (currentRoute === targetRoute || currentRoute.startsWith(targetRoute)) {
        console.log('Already on target screen, closing menu without navigation');
        onClose();
        return;
      }

      // Navigate to the target screen
      if (targetRoute === '/(tabs)/(home)') {
        // If navigating to Home from Themes, use replace to avoid stacking
        console.log('Navigating to Home with replace');
        router.replace('/(tabs)/(home)');
      } else {
        console.log('Navigating to:', targetRoute);
        router.push(targetRoute as any);
      }

      onClose();
    } else {
      // For items without routes (Settings, About, Rate us), just close for now
      console.log('No route defined for:', item.label);
      onClose();
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
