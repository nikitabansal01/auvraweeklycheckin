import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, verticalScale } from 'react-native-size-matters';
// import { FONT_FAMILIES, useAppFonts } from './fonts';

// Constants
const COLORS = {
  surface: "#FEF7FF",
  onSurface: "#1D1B20",
  surfaceDivider: "#E6E0E9",
  outlineVariant: "#D7D5DE",
  primaryContainer: "#EADDFF",
  onPrimaryContainer: "#4F378A",
  greyMedium: "#6F6F6F",
  greyLight: "#949494",
  white: "#FFFFFF",
  gradPurple: "#A78BFA",
  gradPink: "#F0A3C2",
};

// Main Component
export default function Index() {
  // const fontsLoaded = useAppFonts();

  const navigateToChatbot = () => {
    router.push('/slides/chatbot');
  };

  const navigateToRewards = () => {
    router.push('/slides/rewards');
  };

  // if (!fontsLoaded) {
  //   return null; // or a loading component
  // }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.root}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Auvra</Text>
          {/* <Text style={styles.subtitle}>Your personal health companion</Text> */}
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.chatbotButton} onPress={navigateToChatbot}>
              <LinearGradient
                colors={['#A29AEA', '#C17EC9', '#D482B9', '#E98BAC', '#FDC6D1']}
                locations={[0, 0.3, 0.6, 0.8, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Start Chatting</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rewardsButton} onPress={navigateToRewards}>
              <LinearGradient
                colors={['#A29AEA', '#C17EC9', '#D482B9', '#E98BAC', '#FDC6D1']}
                locations={[0, 0.3, 0.6, 0.8, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>View Rewards</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

      {/* Background Gradients */}
<LinearGradient
  colors={[
    "#A29AEA",   // lavender
    "#C17EC9",   // purple-pink
    "#D482B9",
    "#E98BAC",
    "#FDC6D1",
    // "#ffffff"  // soft pink
  ]}
  locations={[0, 0.3, 0.55, 0.75, 1]}
  start={{ x: 0, y: 1 }}
  end={{ x: 1, y: 0 }}
  style={styles.gradientBase}
/>

<LinearGradient
  colors={[
    "rgba(255,255,255,1)",  // strong white at top
    "rgba(255,255,255,0.9)",// softer white
    "rgba(255,255,255,0.7)",// subtle haze
    "rgba(255,255,255,0)"   // fully transparent
  ]}
  locations={[0, 0.2, 0.4, 1]}
  style={styles.gradientFade}
/>
    </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Text styles
  title: {
    fontSize: moderateScale(32),
    // fontFamily: FONT_FAMILIES['Inter-Regular'],
    fontWeight: 'bold',
    color: COLORS.onSurface,
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  subtitle: {
    fontSize: moderateScale(18),
    // fontFamily: FONT_FAMILIES['Inter-Regular'],
    color: COLORS.greyMedium,
    textAlign: 'center',
    marginBottom: verticalScale(50),
  },

  // Button container
  buttonContainer: {
    alignItems: 'center',
    gap: 20,
  },

  // Button styles
  chatbotButton: {
    width: 200,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8, // For Android shadow
  },
  rewardsButton: {
    width: 200,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8, // For Android shadow
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: moderateScale(18),
    // fontFamily: FONT_FAMILIES['Inter-Regular'],
    fontWeight: '600',
    color: COLORS.white,
  },

  // Background gradients
  gradientBase: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: -2,
  },
  gradientFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: -1,
  },
});
