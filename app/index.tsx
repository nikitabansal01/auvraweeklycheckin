import Avatar from "@/components/Avatar";
import FooterCTA from "@/components/FooterCTA";
import Header from "@/components/Header";
import TapResponse from "@/components/TapResponse";
import TypeResponse from "@/components/TypeResponse";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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


type Mode = "idle" | "tap" | "yap" | "type"

export default function Index() {

  const [mode, setMode] = useState<Mode>("idle")


  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.root}>

          <Header></Header>

          <View style={{ flex: 2 }} />

          <Avatar></Avatar>

          {mode === "type" && (
            <TypeResponse
              onSend={(text) => console.log("Typed:", text)}
            />
          )}

          {mode === "tap" && (
            <TapResponse
              onSend={(text) => console.log("Typed:", text)}
            />
          )}

          <View style={{ flex: 1 }} />

          {/* Horizontal lavender → pink */}
          <LinearGradient
            colors={["rgb(203, 180, 240)", "rgb(245, 162, 194)"]}
            start={{ x: 0, y: 0.5 }}  // left center
            end={{ x: 1, y: 0.5 }}    // right center
            style={styles.gradientBase}
          />

          {/* White fade on top */}
          <LinearGradient
            colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
            style={styles.gradientFade}
          />

          {mode === "idle" && (
            <FooterCTA setMode={setMode}></FooterCTA>
          )}

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: COLORS.white
    // backgroundColor: "#fff",
  },
  kav:
  {
    flex: 1
  },
  root:
  {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    // backgroundColor: "#fff",
  },
  gradientBase: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: -1
  },
  gradientFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: -1
  },

  headerRow:
  {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12
  },




  filler: {
    flex: 1
  },


});
