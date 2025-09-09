import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";


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

type Props = {
    onSend: (text: string) => void;
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

export default function TypeResponse({ onSend }: Props) {
    const [value, setValue] = useState("");
    return (
        <View>
            <View style={styles.introTextContainer}>
                <GradientText style={styles.introText}>How was your bloating this week?</GradientText>
            </View>
            <View style={styles.introTextContainer}>
                <GradientText style={styles.introText}>How was your bloating this week?</GradientText>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

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
        fontFamily: "Inter"
      },

})