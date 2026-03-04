
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Global Theme Configuration
export const theme = {
  // Default Theme
  AppBackground: '#000080', // Navy Blue
  GlobalTextColour: '#FFFFFF', // White
  CounterArrowColour: '#FFFFFF', // Same as GlobalTextColour
};

export const colors = {
  primary: '#000080',
  secondary: '#0000CD',
  accent: '#4169E1',
  background: '#000080',
  text: '#FFFFFF',
  textSecondary: '#E0E0E0',
  card: '#1E1E8F',
  border: '#FFFFFF',
};

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
});
