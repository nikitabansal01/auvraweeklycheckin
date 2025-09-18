import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from 'react-native-size-matters';
import { FONT_FAMILIES } from '../lib/fonts';

// Responsive dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

// Font scaling system using react-native-size-matters
const FONT_SIZES = {
  // From Figma: Header text (14px Noto Serif) - "Weekly Check-in"
  header: scale(14),
};


const COLORS = {
    // Figma Light theme tokens sampled from variables
    surface: "#FEF7FF",
    onSurface: "#1D1B20",
    surfaceDivider: "#E6E0E9",
    outlineVariant: "#D7D5DE",   //make it more light
    primaryContainer: "#EADDFF",
    onPrimaryContainer: "#4F378A",
    greyMedium: "#6F6F6F",
    greyLight: "#949494",
    white: "#FFFFFF",
    // Custom gradient colors sampled from screenshot (purple→pink)
    gradPurple: "#A78BFA",
    gradPink: "#F0A3C2",
  };
interface HeaderProps {
  onClose?: () => void;
}

export default function Header({ onClose }: HeaderProps) {
    return(
        <View style={styles.header}>
            <TouchableOpacity 
              accessibilityRole="button" 
              accessibilityLabel="Close" 
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
              hitSlop={{ top: verticalScale(10), bottom: verticalScale(10), left: scale(10), right: scale(10) }}
            >
              <Ionicons name="close-outline" size={scale(32)} color={COLORS.greyMedium} />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Weekly Check-in</Text>
            </View>

        </View>
    
    );
}

const styles = StyleSheet.create({
    header:{
    height: verticalScale(52),
    justifyContent: "center",
    zIndex: 1000,
    backgroundColor: COLORS.white,
    width: '100%',
    // borderBottomWidth: 1, 
    // borderBottomColor: COLORS.surfaceDivider 
  },
  closeBtn:
  {
    width: scale(36), 
    height: scale(36), 
    alignItems: "center", 
    justifyContent: "center", 
    borderRadius: scale(18),
    minWidth: scale(44), // Minimum touch target for accessibility
    minHeight: scale(44),
    ...(isAndroid && {
      elevation: 1,
      shadowColor: COLORS.outlineVariant,
      shadowOffset: { width: 0, height: verticalScale(1) },
      shadowOpacity: 0.1,
      shadowRadius: 1,
    }),
  },
  headerCenter:
  {
    position: "absolute", 
    left: 0, 
    right: 0, 
    alignItems: "center",
    width: '100%',
  },
  headerTitle: {
    color: COLORS.onSurface,
    fontSize: FONT_SIZES.header,
    fontWeight: "400",
    fontFamily: FONT_FAMILIES['NotoSerif-Regular'],
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },

});