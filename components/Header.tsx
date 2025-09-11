import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


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
export default function Header() {
    return(
        <View style={styles.header}>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Close" style={styles.closeBtn}>
              <Ionicons name="close-outline" size={32} color={COLORS.greyMedium} />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Weekly Check-in</Text>
            </View>

        </View>
    
    );
}

const styles = StyleSheet.create({
    header:{
    height: 52,
    justifyContent: "center",
    zIndex: 1000,
    backgroundColor: COLORS.white,
    // borderBottomWidth: 1, 
    // borderBottomColor: COLORS.surfaceDivider 
  },
  closeBtn:
  {
    width: 36, height: 36, alignItems: "center", justifyContent: "center", borderRadius: 18
  },
  headerCenter:
  {
    position: "absolute", left: 0, right: 0, alignItems: "center"
  },
  headerTitle:
  {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Noto Serif"
  },

});