import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { FONT_FAMILIES } from '../lib/fonts';



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



  function GradientText({ children, style }: { children: string; style?: any }) {
    return (
      <MaskedView maskElement={<Text style={[style, { backgroundColor: "transparent" }]}>{children}</Text>}>
        <LinearGradient colors={[COLORS.gradPurple, COLORS.gradPink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <Text style={[style, { opacity: 0 }]}>{children}</Text>
        </LinearGradient>
      </MaskedView>
    );
  }

  
export default function Avatar({ showMessage = true }: { showMessage?: boolean }) {
    const fadeAnim1 = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim1, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim2, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(fadeAnim1, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim2, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);


    return (

        <View>
        <View style={styles.characterSection}>

            <View style={styles.avatarLogo}>
                {/* First image */}
                <Animated.Image
                    source={require("../assets/images/auvra-avatar-1.png")}
                    style={[styles.image, { opacity: fadeAnim1 }]}
                    resizeMode="contain"
                />

                {/* Second image */}
                <Animated.Image
                    source={require("../assets/images/auvra-avatar-2.png")}
                    style={[styles.image, { opacity: fadeAnim2, position: "absolute" }]}
                    resizeMode="contain"
                />
            </View>

            {/* <View style={styles.shadow} />  */}
            <View style={styles.shadow} />

        </View>

        {showMessage && (
          <View style={styles.introTextContainer}>
            <GradientText style={styles.introText}>How was your bloating this week?</GradientText>
          </View>
        )}

        </View>

      
    );
}

const styles = StyleSheet.create({
    characterSection:
    {
      width: 110,
      paddingTop: 20,
      alignItems: "center",
    },
    avatarLogo: {
        width: 100,
        height: 100,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    shadow: {
        width: 80,         // wider than avatar
      height: 5,        // short height = oval shape
      backgroundColor: "rgba(0,0,0,0.2)", // semi-transparent black
      borderRadius: "50%",  // round corners to make it an ellipse
      marginTop: 12,
    
    },
    introTextContainer: {
        marginTop: 20,
        maxWidth: 310,
        width: "auto",
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderWidth: 1,
        borderColor: COLORS.outlineVariant,
        alignSelf: "flex-start",
        padding: 1
      },
      introText: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        lineHeight: 18,
        fontFamily: FONT_FAMILIES['Inter-Regular']
      },
      
})