import Avatar from "@/components/Avatar";
import FooterCTA from "@/components/FooterCTA";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

// Types
type Mode = "idle" | "tap" | "yap" | "type";

type Message = {
  id: string;
  text: string;
  isBot: boolean;
};

// Components
function GradientText({ children, style }: { children: string; style?: any }) {
  return (
    <MaskedView maskElement={<Text style={[style, { backgroundColor: "transparent" }]}>{children}</Text>}>
      <LinearGradient colors={[COLORS.gradPurple, COLORS.gradPink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

function BotMessage({ text }: { text: string }) {
  return (
    <View style={styles.botMessageContainer}>
      <View style={styles.botMessageBubble}>
        <GradientText style={styles.botMessageText}>{text}</GradientText>
      </View>
    </View>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <View style={styles.userMessageContainer}>
      <View style={styles.userMessageBubble}>
        <Text style={styles.userMessageText}>{text}</Text>
      </View>
    </View>
  );
}

// Main Component
export default function Index() {
  const [mode, setMode] = useState<Mode>("idle");
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "How was your bloating this week?", isBot: true },
    { id: "3", text: "Were there any big changes in your week? related to food, lifestyle, stress, etc", isBot: true },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderHoverValue, setSliderHoverValue] = useState<number | null>(null);
  const [showSlider, setShowSlider] = useState(true);
  const [showSelectedValue, setShowSelectedValue] = useState(false);

  const handleSend = (text?: string) => {
    const messageText = text || value.trim();
    if (messageText) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        isBot: false,
      };
      setMessages(prev => [...prev, newMessage]);
      console.log("Sent:", messageText);
      if (!text) setValue("");
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setRecordingComplete(false);
    // Start timer
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    // Store interval ID for cleanup
    (window as any).recordingInterval = interval;
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingComplete(true);
    // Clear timer
    if ((window as any).recordingInterval) {
      clearInterval((window as any).recordingInterval);
    }
  };

  const sendRecording = () => {
    handleSend("Voice message");
    setRecordingComplete(false);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSliderSelection = (value: number) => {
    setSliderValue(value);
    setShowSlider(false);
    setShowSelectedValue(true);
    
    // Show selected value for 1 second, then hide and show conversation
    setTimeout(() => {
      setShowSelectedValue(false);
    }, 1000);
  };

  // Soft tints for 1..9, left (green) to right (pink)
  const getSliderTint = (value: number) => {
    const tints: Record<number, string> = {
      1: "#EAF7DD", // soft green
      2: "#EAF7DD",
      3: "#EAF7DD", // light yellow-green
      4: "#FFFCDB",
      5: "#FFFCDB", // soft warm yellow
      6: "#FFFCDB",
      7: "#FFEFF6", // soft pink
      8: "#FFEFF6",
      9: "#FFEFF6",
    };
    return tints[value] || COLORS.white;
  };

  const getBloatingLabel = (value: number) => {
    if (value === 1) return "None";
    if (value <= 3) return "Mild";
    if (value <= 5) return "Moderate";
    if (value <= 7) return "Strong";
    return "Extreme";
  };

  const renderIdleMode = () => (
    <>
      {showSlider ? (
        <>
          <View style={{ flex: 1 }} />
          <Avatar showMessage={true} />
          
          <View style={styles.sliderContainer}>
            <View style={styles.sliderNumbers}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <TouchableOpacity
                  key={num}
                  onPressIn={() => setSliderHoverValue(num)}
                  onPress={() => handleSliderSelection(num)}
                  activeOpacity={0.8}
                  style={[
                    styles.sliderNumber,
                    { backgroundColor: getSliderTint(num) },
                    sliderHoverValue === num && styles.sliderNumberSelected,
                  ]}
                >
                  <Text style={styles.sliderNumberText}>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>None</Text>
              <Text style={styles.sliderLabel}>Mild</Text>
              <Text style={styles.sliderLabel}>Moderate</Text>
              <Text style={styles.sliderLabel}>Strong</Text>
              <Text style={styles.sliderLabel}>Extreme</Text>
            </View>
          </View>

          <View style={{ flex: 1 }} />
        </>
      ) : showSelectedValue ? (
        <>
          <View style={{ flex: 1 }} />
          <Avatar showMessage={true} />
          
          <View style={styles.selectedValueContainer}>
            <Text style={styles.selectedValueNumber}>{sliderValue}</Text>
            <Text style={styles.selectedValueLabel}>{getBloatingLabel(sliderValue)} bloating</Text>
          </View>
          {/* Keep slider visible during the 1s animation, with the selected cell highlighted */}
          <View style={styles.sliderContainer}>
            <View style={styles.sliderNumbers}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <View
                  key={num}
                  style={[
                    styles.sliderNumber,
                    { backgroundColor: getSliderTint(num) },
                    sliderValue === num && styles.sliderNumberSelected,
                  ]}
                >
                  <Text style={styles.sliderNumberText}>{num}</Text>
                </View>
              ))}
            </View>
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>None</Text>
              <Text style={styles.sliderLabel}>Mild</Text>
              <Text style={styles.sliderLabel}>Moderate</Text>
              <Text style={styles.sliderLabel}>Strong</Text>
              <Text style={styles.sliderLabel}>Extreme</Text>
            </View>
          </View>

          <View style={{ flex: 1 }} />
        </>
      ) : (
        <>
          <ScrollView
            style={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Avatar showMessage={true} />
            <View style={styles.messagesWrapper}>
              <UserMessage text={`${sliderValue} = ${getBloatingLabel(sliderValue)} bloating`} />
              <BotMessage text="Were there any big changes in your week? related to food, lifestyle, stress, etc" />
            </View>
          </ScrollView>
        </>
      )}
    </>
  );

  const renderTypeMode = () => (
    <>
      <ScrollView
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Avatar showMessage={false} />
        <View style={styles.messagesWrapper}>
          {messages.map((message, index) => (
            <View key={message.id}>
              {message.isBot ? (
                <BotMessage text={message.text} />
              ) : (
                <UserMessage text={message.text} />
              )}
              {index === 0 && !showSlider && sliderValue > 0 && (
                <UserMessage text={`${sliderValue} = ${getBloatingLabel(sliderValue)} bloating`} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            placeholder="I'm here to listen..."
            placeholderTextColor={COLORS.greyLight}
            value={value}
            onChangeText={setValue}
            multiline
          />
        </View>
        {value.trim() === "" ? (
          <>
            <TouchableOpacity style={styles.whiteButton} onPress={() => setMode("yap")}>
              <Image
                source={require("../assets/images/yap-icon.png")}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.whiteButton} onPress={() => setMode("tap")}>
              <Ionicons name="checkmark-circle-outline" size={30} color={COLORS.onPrimaryContainer} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.sendButton} onPress={() => handleSend()}>
            <LinearGradient
              colors={[COLORS.gradPurple, COLORS.gradPink]}
              style={styles.buttonGradient}
            >
              <Ionicons name="send" size={20} color={COLORS.white} />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </>
  );

  const renderTapMode = () => (
    <>
      <ScrollView
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Avatar showMessage={true} />
        <View style={styles.tapResponseContainer}>
          <View style={styles.responseOptions}>
            <TouchableOpacity style={styles.responseButton} onPress={() => handleSend("Better")}>
              <Text style={styles.responseButtonText}>Better</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.responseButton} onPress={() => handleSend("Same")}>
              <Text style={styles.responseButtonText}>Same</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.responseButton} onPress={() => handleSend("Worse")}>
              <Text style={styles.responseButtonText}>Worse</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 3 }} />
      </ScrollView>

      <View style={styles.CTAWrapper}>
        <View style={styles.CTAGroup1}>
          <View style={styles.btn55Container}>
            <TouchableOpacity style={styles.whiteButton} onPress={() => setMode("type")}>
              <Ionicons name="chatbubble-ellipses-outline" size={30} color={COLORS.onPrimaryContainer} />
            </TouchableOpacity>
            <Text style={styles.btnLabel}>type</Text>
          </View>
          <View style={styles.btn55Container}>
            <TouchableOpacity style={styles.whiteButton} onPress={() => setMode("yap")}>
              <Image
                source={require("../assets/images/yap-icon.png")}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.btnLabel}>yap</Text>
          </View>
        </View>
        <View>
          <View style={styles.btn55Container}>
            <TouchableOpacity style={styles.sendButtonLg} onPress={() => handleSend()}>
              <LinearGradient
                colors={[COLORS.gradPurple, COLORS.gradPink]}
                style={styles.sendButtonGradient}
              >
                <Ionicons name="send" size={20} color={COLORS.white} />
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.btnLabel}>send</Text>
          </View>
        </View>
      </View>
    </>
  );

  const renderYapMode = () => (
    <>
      <View style={styles.yapContainer}>
        <Avatar showMessage={true} />
        
        {isRecording ? (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Listening.</Text>
          </View>
        ) : recordingComplete ? (
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(recordingTime)}</Text>
          </View>
        ) : null}

        <View style={styles.yapSendButtonContainer}>
          {isRecording || !recordingComplete ? (
            <Pressable
              style={styles.yapSendButton}
              onPressIn={startRecording}
              onPressOut={stopRecording}
            >
              <LinearGradient
                colors={[COLORS.gradPurple, COLORS.gradPink]}
                style={styles.yapSendButtonGradient}
              >
                <Ionicons name="mic" size={30} color={COLORS.white} />
              </LinearGradient>
            </Pressable>
          ) : (
            <TouchableOpacity style={styles.yapSendButton} onPress={sendRecording}>
              <LinearGradient
                colors={[COLORS.gradPurple, COLORS.gradPink]}
                style={styles.yapSendButtonGradient}
              >
                <Ionicons name="send" size={30} color={COLORS.white} />
              </LinearGradient>
            </TouchableOpacity>
          )}
          <Text style={styles.yapSendButtonLabel}>
            {isRecording ? "yap" : recordingComplete ? "send" : "yap"}
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === "ios" ? "height" : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.root}>
          <Header />

          {mode === "idle" && renderIdleMode()}
          {mode === "type" && renderTypeMode()}
          {mode === "tap" && renderTapMode()}
          {mode === "yap" && renderYapMode()}

          {/* Background Gradients */}
          <LinearGradient
            colors={["rgb(203, 180, 240)", "rgb(245, 162, 194)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientBase}
          />
          <LinearGradient
            colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
            style={styles.gradientFade}
          />

          {mode === "idle" && (
            <FooterCTA setMode={setMode} disabled={showSlider || showSelectedValue} />
          )}
        </View>
      </KeyboardAvoidingView>
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
  kav: {
    flex: 1,
  },
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },

  // Background gradients
  gradientBase: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: -1,
  },
  gradientFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: -1,
  },

  // Chat interface
  messagesContainer: {
    flex: 1,
    marginTop: -50,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  messagesWrapper: {
    paddingTop: 20,
  },

  // Message bubbles
  botMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
    paddingLeft: 15,
  },
  botMessageBubble: {
    maxWidth: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  botMessageText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Inter",
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
    paddingRight: 15,
  },
  userMessageBubble: {
    maxWidth: '80%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderTopRightRadius: 0,
    borderColor: COLORS.outlineVariant,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  userMessageText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Inter",
    color: COLORS.onSurface,
  },

  // Input
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputField: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 10,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  textInput: {
    fontSize: 14,
    color: COLORS.onSurface,
    minHeight: 20,
  },

  // Buttons
  whiteButton: {
    width: 55,
    height: 55,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonLg: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 10,
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Tap response
  tapResponseContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  responseOptions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  responseButton: {
    backgroundColor: '#FDF4F8',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
    marginLeft: 8,
  },
  responseButtonText: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: '400',
  },

  // CTA wrapper
  CTAWrapper: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CTAGroup1: {
    flexDirection: 'row',
  },
  btn55Container: {
    alignItems: "center",
  },
  btnLabel: {
    marginTop: 9,
    color: COLORS.onSurface,
    fontSize: 14,
    fontFamily: "Inter",
  },

  // Yap mode styles
  yapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statusContainer: {
    marginVertical: 40,
  },
  statusText: {
    fontSize: 18,
    fontFamily: "Inter",
    color: COLORS.greyMedium,
    textAlign: 'center',
  },
  timerContainer: {
    marginVertical: 40,
  },
  timerText: {
    fontSize: 24,
    fontFamily: "Inter",
    color: COLORS.onSurface,
    textAlign: 'center',
  },
  yapSendButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  yapSendButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  yapSendButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yapSendButtonLabel: {
    fontSize: 16,
    fontFamily: "Inter",
    color: COLORS.onSurface,
    textAlign: 'center',
  },

  // Slider styles
  sliderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  sliderNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sliderNumber: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 2,
    borderColor: COLORS.outlineVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderNumberSelected: {
    borderColor: COLORS.onPrimaryContainer,
    borderWidth: 2,
  },
  sliderNumberText: {
    fontSize: 16,
    fontFamily: "Inter",
    color: COLORS.onSurface,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  sliderLabel: {
    fontSize: 11,
    fontFamily: "Inter",
    color: COLORS.greyMedium,
    textAlign: 'center',
  },
  selectedValueContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  selectedValueNumber: {
    fontSize: 48,
    fontFamily: "Inter",
    color: COLORS.onSurface,
    fontWeight: 'bold',
  },
  selectedValueLabel: {
    fontSize: 18,
    fontFamily: "Inter",
    color: COLORS.greyMedium,
    marginTop: 5,
  },
});