// Google Fonts CDN Configuration for React Native
// This file provides font family constants that map to Google Fonts CDN

import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';

import {
    NotoSerif_400Regular,
    NotoSerif_700Bold,
} from '@expo-google-fonts/noto-serif';

export const FONTS = {
  // Inter font family (from Google Fonts CDN)
  Inter: {
    regular: Inter_400Regular,
    medium: Inter_500Medium,
    semibold: Inter_600SemiBold,
    bold: Inter_700Bold,
  },
  
  // Noto Serif font family (from Google Fonts CDN)
  NotoSerif: {
    regular: NotoSerif_400Regular,
    bold: NotoSerif_700Bold,
  }
} as const;

// Google Fonts CDN URLs for reference
export const GOOGLE_FONTS_CDN = {
  Inter: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  NotoSerif: 'https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&display=swap',
} as const;

// Font family mappings for easy usage
export const FONT_FAMILIES = {
  // Inter variants
  'Inter-Regular': 'Inter_400Regular',
  'Inter-Medium': 'Inter_500Medium',
  'Inter-SemiBold': 'Inter_600SemiBold',
  'Inter-Bold': 'Inter_700Bold',
  
  // Noto Serif variants
  'NotoSerif-Regular': 'NotoSerif_400Regular',
  'NotoSerif-Bold': 'NotoSerif_700Bold',
} as const;

// Hook to load all fonts
export const useAppFonts = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
  });

  return fontsLoaded;
};
