import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

type Mode = "idle" | "tap" | "yap" | "type";
export default function FooterCTA({
    setMode, 
    disabled = false,
    isRecording = false,
    recordingComplete = false,
    onStartRecording,
    onStopRecording,
    onSendRecording
}: {
    setMode: React.Dispatch<React.SetStateAction<Mode>>; 
    disabled?: boolean;
    isRecording?: boolean;
    recordingComplete?: boolean;
    onStartRecording?: () => void;
    onStopRecording?: () => void;
    onSendRecording?: () => void;
}) {

    return (

        <View>
            {/* Bottom Buttons row: tap / yap / type */}

            <View style={[styles.bottomContainer, disabled ? { opacity: 0.5 } : undefined]}>
                <View style={styles.btn55Container}>
                    <TouchableOpacity style={styles.btn50} disabled={disabled} onPress={() => setMode("tap")}>
                        <Ionicons name="checkmark-circle-outline" size={30} color={COLORS.onPrimaryContainer} />
                    </TouchableOpacity>
                    <Text style={styles.btnLabel}>tap</Text>
                </View>

                {/* Center 80 */}
                <View style={styles.btn80Container}>
                    {!disabled && isRecording ? (
                        <Pressable
                            style={styles.btn80}
                            onPressIn={onStartRecording}
                            onPressOut={onStopRecording}
                        >
                            <LinearGradient
                                colors={[COLORS.gradPurple, COLORS.gradPink]}
                                style={styles.btn80Gradient}
                            >
                                <Ionicons name="mic" size={30} color={COLORS.white} />
                            </LinearGradient>
                        </Pressable>
                    ) : !disabled && recordingComplete ? (
                        <TouchableOpacity style={styles.btn80} onPress={onSendRecording}>
                            <LinearGradient
                                colors={[COLORS.gradPurple, COLORS.gradPink]}
                                style={styles.btn80Gradient}
                            >
                                <Ionicons name="send" size={30} color={COLORS.white} />
                            </LinearGradient>
                        </TouchableOpacity>
                    ) : !disabled ? (
                        <Pressable
                            style={styles.btn80}
                            onPressIn={onStartRecording}
                            onPressOut={onStopRecording}
                        >
                            <Image
                                source={require("../assets/images/yap-icon.png")} // local image
                                style={{ width: 50, height: 50 }}
                                resizeMode="contain"
                            />
                        </Pressable>
                    ) : (
                        <TouchableOpacity style={styles.btn80} disabled={disabled} onPress={() => setMode("idle")}>
                            <Image
                                source={require("../assets/images/yap-icon.png")} // local image
                                style={{ width: 50, height: 50 }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    )}
                    <Text style={styles.btnLabelCenter}>
                        {!disabled && isRecording ? "recording" : 
                         !disabled && recordingComplete ? "send" : "yap"}
                    </Text>
                </View>

                {/* Right 50 */}
                <View style={styles.btn55Container}>
                    <TouchableOpacity style={styles.btn50} disabled={disabled} onPress={()=>{setMode("type")}}> 
                        <Ionicons name="chatbubble-ellipses-outline" size={30} color={COLORS.onPrimaryContainer} />
                    </TouchableOpacity>
                    <Text style={styles.btnLabel}>type</Text>
                </View>
            </View>
        </View>

    );
}

const shadowStrong = {
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  };
  
  const shadowSoft = {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  };
const styles = StyleSheet.create({

    bottomContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingHorizontal: 50,
        paddingBottom: 40
    },
    btn55Container: {
        alignItems: "center",
        width: 55
    },
    btn50: {
        width: 55,
        height: 55,
        borderRadius: "50%",
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center", ...shadowSoft
    },

    btnLabel: {
        marginTop: 9,
        color: COLORS.onSurface,
        fontSize: 14,
        fontFamily: FONT_FAMILIES['Inter-Regular']
    },

    btn80Container:
    {
        alignItems: "center",
        width: 80
    },
    btn80:
    {
        width: 90,
        height: 90,
        borderRadius: 70,
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center", ...shadowStrong
    },
    btn80Gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 70,
        alignItems: "center",
        justifyContent: "center",
    },
    btnLabelCenter:
    {
        marginTop: 9, color: COLORS.onSurface, fontSize: 14, textAlign: "center", width: 80, fontFamily: "Inter"
    },
})