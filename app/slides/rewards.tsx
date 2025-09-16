import { Ionicons } from "@expo/vector-icons";
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Dimensions, Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONT_FAMILIES, useAppFonts } from '../../lib/fonts';

// Constants from Figma design
const BACKGROUND_VECTOR_IMAGE = "http://localhost:3845/assets/cf926b4d5ec2719e28f1af07e084ed30c131abe4.svg";
const MILESTONE_BG_IMAGE = require("../../assets/images/milestone-bg.png");
const BLOOD_REPORT_IMAGE = require("../../assets/images/blood-report-logo.png");

// Responsive dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

// Responsive scaling factors
const scaleWidth = screenWidth / 375; // Base width from design
const scaleHeight = screenHeight / 812; // Base height from design
const scale = Math.min(scaleWidth, scaleHeight);

// Gradient Text Component
function GradientText({ children, style }: { children: string; style?: any }) {
  return (
    <MaskedView
      style={{ 
        flexDirection: 'row', 
        height: Math.round(Math.max(20, (style?.lineHeight || 20) * scale)),
        ...(isAndroid && { 
          renderToHardwareTextureAndroid: true,
          needsOffscreenAlphaCompositing: true 
        } as any)
      }}
      maskElement={
        <Text style={[
          style, 
          { 
            backgroundColor: 'transparent',
            includeFontPadding: isAndroid ? false : undefined,
            textAlignVertical: isAndroid ? 'center' : undefined,
          }
        ]}>
          {children}
        </Text>
      }
    >
      <LinearGradient 
        colors={['#A29AEA', '#C17EC9', '#D482B9', '#E98BAC', '#FDC6D1']}
        locations={[0, 0.3654, 0.571, 0.8336, 1.142]}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 0 }}
        style={{ 
          flex: 1,
          ...(isAndroid && { 
            renderToHardwareTextureAndroid: true 
          } as any)
        }}
      >
        <Text style={[
          style, 
          { 
            opacity: 0,
            includeFontPadding: isAndroid ? false : undefined,
            textAlignVertical: isAndroid ? 'center' : undefined,
          }
        ]}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}

// Progress Gradient Component
function ProgressGradient({ progress }: { progress: number }) {
  // Full gradient colors and their positions
  const fullColors = ['#A29AEA', '#C17EC9', '#D482B9', '#E98BAC', '#FDC6D1'] as const;
  const fullLocations = [0, 0.3, 0.6, 0.8, 1] as const;
  
  // Calculate which colors to show based on progress
  const progressDecimal = progress / 100;
  const visibleColors: string[] = [];
  const visibleLocations: number[] = [];
  
  for (let i = 0; i < fullColors.length; i++) {
    if (fullLocations[i] <= progressDecimal) {
      visibleColors.push(fullColors[i]);
      // Normalize locations to 0-1 range for the visible portion
      visibleLocations.push(fullLocations[i] / progressDecimal);
    }
  }
  
  // Ensure we have at least 2 colors for a gradient
  if (visibleColors.length < 2) {
    visibleColors.push(fullColors[1]);
    visibleLocations.push(1);
  }
  
  // Ensure locations array is valid (all values between 0 and 1)
  const validLocations = visibleLocations.map(loc => Math.min(Math.max(loc, 0), 1));
  
  return (
    <LinearGradient
      colors={visibleColors as any}
      locations={validLocations as any}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        styles.progressFill, 
        { 
          width: `${progress}%`,
          ...(isAndroid && { renderToHardwareTextureAndroid: true })
        }
      ]}
    />
  );
}

const COLORS = {
  white: "#FFFFFF",
  black: "#000000",
  greyMedium: "#6F6F6F",
  greyLight: "#949494",
  warmPurple: "#C17EC9",
  lightBlue: "#E0F6FF",
  lightViolet: "#F3F0FF",
  lightYellow: "#FFFCDE",
  background: "#FFFFFF",
  shadow: "rgba(0, 0, 0, 0.1)",
  shadowDark: "rgba(0, 0, 0, 0.25)",
  shadowPurple: "rgba(193, 126, 201, 0.5)",
  gradPurple: "#A29AEA",
  gradPink: "#FDC6D1",
};


// Types
type RewardState = 'in_progress' | 'available' | 'claimed';

type RewardItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  backgroundColor: string;
  streak?: string;
  requiredStreakDays: number;
  state: RewardState;
  hasButton?: boolean;
  buttonText?: string;
};

type Milestone = {
  id: string;
  name: string;
  day: string;
  isActive: boolean;
};

export default function Rewards() {
  const fontsLoaded = useAppFonts();
  const [currentStreakDays, setCurrentStreakDays] = useState(9); // Current streak from the UI
  const [claimedRewards, setClaimedRewards] = useState<Set<string>>(new Set());

  const navigateToIndex = () => {
    router.back();
  };

  const claimReward = (rewardId: string) => {
    setClaimedRewards(prev => new Set([...prev, rewardId]));
  };

  const getRewardState = (item: RewardItem): RewardState => {
    // If already claimed in state management, return claimed
    if (claimedRewards.has(item.id)) {
      return 'claimed';
    }
    // If marked as claimed in data, return claimed
    if (item.state === 'claimed') {
      return 'claimed';
    }
    // If streak requirement is met, return available
    if (currentStreakDays >= item.requiredStreakDays) {
      return 'available';
    }
    // Otherwise, return in_progress
    return 'in_progress';
  };

  // Dynamic reward organization based on current state
  const getAllRewards = (): RewardItem[] => {
    return [
      {
        id: "1",
        title: "Streak freeze",
        description: "",
        icon: "🧊",
        backgroundColor: COLORS.lightBlue,
        requiredStreakDays: 3,
        state: 'claimed',
      },
      {
        id: "2",
        title: "Diet preferences",
        description: "",
        icon: "🥗",
        backgroundColor: COLORS.lightViolet,
        requiredStreakDays: 7,
        state: 'available',
        hasButton: true,
        buttonText: "Personalize now",
      },
      {
        id: "3",
        title: "Food Allergies",
        description: "Skip foods that don't work for your body",
        icon: "🥜",
        backgroundColor: COLORS.lightViolet,
        streak: "12 day streak",
        requiredStreakDays: 8,
        state: 'in_progress',
      },
      {
        id: "4",
        title: "Symptom patterns unlocked",
        description: "Understand your bodily trends",
        icon: "✨",
        backgroundColor: COLORS.lightYellow,
        streak: "14 day streak",
        requiredStreakDays: 14,
        state: 'in_progress',
      },
      {
        id: "5",
        title: "2x plan refresh",
        description: "Additional refreshes for the action plan",
        icon: "🧊",
        backgroundColor: COLORS.lightBlue,
        streak: "16 day streak",
        requiredStreakDays: 16,
        state: 'in_progress',
      },
      {
        id: "6",
        title: "Ethnicity/cultural habits",
        description: "Tailor the plan to your traditions & lifestyle",
        icon: "🌏",
        backgroundColor: COLORS.lightViolet,
        streak: "18 day streak",
        requiredStreakDays: 18,
        state: 'in_progress',
      },
      {
        id: "7",
        title: "Cuisine preferences",
        description: "The plan to adapts to your favorite cuisines",
        icon: "🥘",
        backgroundColor: COLORS.lightViolet,
        streak: "12 day streak",
        requiredStreakDays: 12,
        state: 'in_progress',
      },
      {
        id: "8",
        title: "Dine out habits",
        description: "Healthier alternatives to your fav order",
        icon: "🍔",
        backgroundColor: COLORS.lightViolet,
        streak: "14 day streak",
        requiredStreakDays: 14,
        state: 'in_progress',
      },
      {
        id: "9",
        title: "BMI/Waist to height ratio",
        description: "Adjust actions to your body's unique profile",
        icon: "⚖️",
        backgroundColor: COLORS.lightViolet,
        streak: "18 day streak",
        requiredStreakDays: 18,
        state: 'in_progress',
      },
       {
         id: "10",
         title: "First signs of improvement",
         description: "Start to feel relief for top concerns",
         icon: "✨",
         backgroundColor: COLORS.lightYellow,
         streak: "21 day streak",
         requiredStreakDays: 21,
         state: 'in_progress',
       },
       // Rise Rewards
       {
         id: "11",
         title: "2x plan refresh",
         description: "Additional refreshes for the action plan",
         icon: "🧊",
         backgroundColor: COLORS.lightBlue,
         streak: "12 days to go",
         requiredStreakDays: 16,
         state: 'in_progress',
       },
       {
         id: "12",
         title: "Cravings made healthy",
         description: "Personalize support for food cravings",
         icon: "🥮",
         backgroundColor: COLORS.lightViolet,
         streak: "18 day streak",
         requiredStreakDays: 18,
         state: 'in_progress',
       },
       {
         id: "13",
         title: "First signs of improvement",
         description: "Start to feel relief for top concerns",
         icon: "✨",
         backgroundColor: COLORS.lightYellow,
         streak: "21 day streak",
         requiredStreakDays: 21,
         state: 'in_progress',
       },
     ];
   };

  // Dynamically filter rewards based on their current state
  const seedRewards = getAllRewards().filter(item => {
    const state = getRewardState(item);
    return state === 'claimed' || state === 'available';
  }).map(item => {
    const state = getRewardState(item);
    // Automatically add button for available rewards
    if (state === 'available') {
      return {
        ...item,
        hasButton: true,
        buttonText: "Personalize now"
      };
    }
    return item;
  });

  const growRewards = getAllRewards().filter(item => {
    const state = getRewardState(item);
    return state === 'in_progress' && item.requiredStreakDays < 16;
  });

  const riseRewards = getAllRewards().filter(item => {
    // Rise rewards are those with higher streak requirements (16+ days) and in progress
    const state = getRewardState(item);
    return state === 'in_progress' && item.requiredStreakDays >= 16;
  });

  if (!fontsLoaded) {
    return null; // or a loading component
  }

// Sample data based on Figma design
const milestones: Milestone[] = [
  { id: "1", name: "Seed", day: "Day 7", isActive: true },
  { id: "2", name: "Grow", day: "Day 30", isActive: false },
  { id: "3", name: "Rise", day: "Day 60", isActive: false },
  { id: "4", name: "Peak", day: "Day 180", isActive: false },
  { id: "5", name: "Glow", day: "Day 270", isActive: false },
];

  const renderLabsSection = () => (
    <LinearGradient
      colors={[
        'rgba(162, 154, 234, 0.5)',
        'rgba(193, 126, 201, 0.5)',
        'rgba(212, 130, 185, 0.5)',
        'rgba(233, 139, 172, 0.5)',
        'rgba(253, 198, 209, 0.5)'
      ]}
      locations={[0.1479, 0.3858, 0.5196, 0.6906, 0.8913]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={[
        styles.labsSection,
        isAndroid ? { renderToHardwareTextureAndroid: true } as any : undefined
      ]}
    >
      
      <View style={styles.labsHeader}>
        <TouchableOpacity style={styles.backButton} onPress={navigateToIndex}>
          <Ionicons name="chevron-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.labsTitleAligned}>Personalize</Text>
      </View>

      <View style={styles.labsContent}>
        <View style={styles.labsCard}>
               <View style={styles.labsIconContainer}>
                 <View style={styles.labsIcon}>
                   <Image 
                     source={BLOOD_REPORT_IMAGE}
                     style={styles.bloodReportIcon}
                     resizeMode="contain"
                   />
                 </View>
            <View style={[styles.labsTag, { top: 0, left: 0 }]}>
              <Text style={styles.labsTagText}>DHEA</Text>
            </View>
            <View style={[styles.labsTag, { top: 64, left: 10 }]}>
              <Text style={styles.labsTagText}>TSH</Text>
            </View>
            <View style={[styles.labsTag, { top: 18, left: 70 }]}>
              <Text style={styles.labsTagText}>T3</Text>
            </View>
          </View>
          <View style={styles.labsTextContainer}>
            <Text style={styles.labsTitleText}>
              Get your action plan personalized to your labs
            </Text>
            <Text style={styles.labsDescriptionText}>
              Blood work help us adapt the action plan with clinical accuracy.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.uploadButtonContainer}>
        <TouchableOpacity style={styles.uploadButton}>
          <View style={styles.uploadButtonContent}>
            <Text style={styles.uploadButtonText}>Upload Blood Report </Text>
            <Ionicons name="cloud-upload-outline" size={18} color={COLORS.black} />
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  const renderStreakSection = () => (
    <>
      <ImageBackground
        source={MILESTONE_BG_IMAGE}
        style={styles.streakSection}
        resizeMode="contain"
    >
      {/* Gradient overlay */}
      <LinearGradient
        colors={['rgba(252, 244, 255, 0)', 'rgba(221, 194, 233, 0.5)']}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.streakGradientOverlay}
      />
      
      <View style={styles.streakHeader}>
        <Text style={styles.streakTitle}>🎁 Milestones & Rewards 🎁</Text>
        
        <View style={styles.streakNumberContainer}>
          <View style={styles.streakNumberGradient}>
<MaskedView 
              maskElement={
                <Text style={[
                  styles.streakNumber, 
                  { 
                    backgroundColor: "transparent",
                    includeFontPadding: isAndroid ? false : undefined,
                    textAlignVertical: isAndroid ? 'center' : undefined,
                  }
                ]}>
                  9
                </Text>
              }
              style={[
                { 
                  height: Math.round(styles.streakNumber.lineHeight || 100),
                  ...(isAndroid && { 
                    renderToHardwareTextureAndroid: true,
                    needsOffscreenAlphaCompositing: true 
                  } as any)
                }
              ]}
            >
              <LinearGradient 
                colors={[COLORS.gradPurple, COLORS.gradPink]} 
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 0 }}
                style={{ 
                  flex: 1,
                  ...(isAndroid && { 
                    renderToHardwareTextureAndroid: true 
                  } as any)
                }}
              >
                <Text style={[
                  styles.streakNumber, 
                  { 
                    opacity: 0,
                    includeFontPadding: isAndroid ? false : undefined,
                    textAlignVertical: isAndroid ? 'center' : undefined,
                  }
                ]}>
                  9
                </Text>
              </LinearGradient>
            </MaskedView>
          </View>
          <Text style={styles.streakLabel}>day streak</Text>
          <View style={styles.streakTextContainer}>
          <View style={styles.top20Badge}>
            <Text style={styles.top20Text}>You are amongst the top 20% now!</Text>
          </View>
          </View>
        </View>
      </View>
    </ImageBackground>
      <View style={styles.milestonesContainer}>
        <View style={styles.milestonesProgress}>
          {/* Background decorative vectors */}
          <View style={styles.milestoneVector1} />
          <View style={styles.milestoneVector2} />
          
          {/* Progress line */}
          <View style={styles.progressLine} />
          <View style={styles.progressLineActive} />
          
          {milestones.map((milestone, index) => (
            <View key={milestone.id} style={styles.milestoneItem}>
      <View style={[
        styles.milestoneDot,
                { backgroundColor: milestone.isActive ? COLORS.warmPurple : '#D9D9D9' }
      ]} />
              <View style={styles.milestoneTextContainer}>
        <Text style={[
          styles.milestoneName,
                  { color: milestone.isActive ? COLORS.warmPurple : COLORS.greyLight }
        ]}>
          {milestone.name}
        </Text>
                <Text style={[
                  styles.milestoneDay,
                  { color: milestone.isActive ? COLORS.warmPurple : COLORS.greyLight }
                ]}>
                  {milestone.day}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      </>
  );

  const renderRewardItem = (item: RewardItem) => {
    const currentState = getRewardState(item);
    const isInProgress = currentState === 'in_progress';
    const isClaimed = currentState === 'claimed';
    const isAvailable = currentState === 'available';

    return (
      <View key={item.id} style={styles.rewardItem}>
        <View style={[
          styles.rewardIconContainer, 
          { backgroundColor: item.backgroundColor }
        ]}>
          <Text style={styles.rewardIcon}>{item.icon}</Text>
        </View>
        <View style={styles.rewardContent}>
          <View style={styles.rewardHeader}>
            <Text style={styles.rewardTitle}>{item.title}</Text>
            {isClaimed && (
              <Ionicons name="checkmark-circle" size={16} color={COLORS.warmPurple} />
            )}
          </View>
          {item.description && isInProgress && (
            <Text style={styles.rewardDescription}>
              {item.description}
            </Text>
          )}
          {isAvailable && item.hasButton && (
            <LinearGradient
              colors={['#A29AEA', '#C17EC9', '#D482B9', '#E98BAC', '#FDC6D1']}
              locations={[0, 0.4, 0.6, 0.9, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.personalizeButtonGradient,
                isAndroid ? { renderToHardwareTextureAndroid: true } as any : undefined
              ]}
            >
              <TouchableOpacity 
                style={styles.personalizeButton}
                onPress={() => claimReward(item.id)}
                activeOpacity={0.7}
              >
<MaskedView 
                    maskElement={
                      <Text style={[
                        styles.personalizeButtonText, 
                        { 
                          backgroundColor: "transparent",
                          includeFontPadding: isAndroid ? false : undefined,
                          textAlignVertical: isAndroid ? 'center' : undefined,
                        }
                      ]}>
                        {item.buttonText}
                      </Text>
                    }
                    style={[
                      { 
                        height: Math.round(styles.personalizeButtonText.lineHeight || 22),
                        ...(isAndroid && { 
                          renderToHardwareTextureAndroid: true,
                          needsOffscreenAlphaCompositing: true 
                        } as any)
                      }
                    ]}
                  >
                    <LinearGradient 
                      colors={['#A29AEA', '#C17EC9', '#D482B9', '#E98BAC', '#FDC6D1']} 
                      start={{ x: 0, y: 0 }} 
                      end={{ x: 1, y: 0 }}
                      style={{ 
                        flex: 1,
                        ...(isAndroid && { 
                          renderToHardwareTextureAndroid: true 
                        } as any)
                      }}
                    >
                      <Text style={[
                        styles.personalizeButtonText, 
                        { 
                          opacity: 0,
                          includeFontPadding: isAndroid ? false : undefined,
                          textAlignVertical: isAndroid ? 'center' : undefined,
                        }
                      ]}>
                        {item.buttonText}
                      </Text>
                    </LinearGradient>
                  </MaskedView>
              </TouchableOpacity>
            </LinearGradient>
          )}
          {item.streak && !isAvailable && !isClaimed && (
            <View style={styles.rewardFooter}>
              <View style={styles.progressBar}>
                <ProgressGradient progress={
                  isInProgress 
                    ? Math.min((currentStreakDays / item.requiredStreakDays) * 100, 100)
                    : 70
                } />
              </View>
              <Text style={[styles.streakText, isInProgress && styles.streakTextInProgress]}>{item.streak}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderDivider = (text: string) => (
    <View style={styles.dividerContainer}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{text}</Text>
      <View style={styles.dividerLine} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={isAndroid ? ["top", "left", "right"] : ["top"]}>
      <StatusBar style="dark" backgroundColor={isAndroid ? COLORS.background : undefined} />
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={isIOS}
        overScrollMode={isAndroid ? "never" : "auto"}
      >
        {renderLabsSection()}
        {renderStreakSection()}
        
        <View style={styles.rewardsContainer}>
          {renderDivider("Seed Rewards")}
          <View style={styles.rewardsList}>
            {seedRewards.map(renderRewardItem)}
          </View>

          {renderDivider("Grow Rewards")}
          <View style={styles.rewardsList}>
            {growRewards.map(renderRewardItem)}
          </View>

          {renderDivider("Rise Rewards")}
          <View style={styles.rewardsList}>
            {riseRewards.map(renderRewardItem)}
          </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: isAndroid ? 20 : 0,
  },
  labsSection: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: isAndroid ? 25 : 30,
    paddingHorizontal: Math.max(20, screenWidth * 0.053), // 5.3% of screen width
    paddingBottom: 20,
    position: 'relative',
    overflow: 'hidden',
    minHeight: isAndroid ? 200 : undefined,
  },
  
  labsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: isAndroid ? 25 : 30,
    zIndex: 1,
  },
  labsTitleAligned: {
    fontSize: Math.max(14, 14 * scale),
    fontWeight: '500',
    color: COLORS.black,
    fontFamily: FONT_FAMILIES['NotoSerif-Regular'],
    lineHeight: Math.max(21, 21 * scale),
    position: 'absolute',
    left: Math.max(126, 126 * scaleWidth), // Responsive positioning
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  backButton: {
    width: Math.max(36, 36 * scale),
    height: Math.max(36, 36 * scale),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    minWidth: 44, // Minimum touch target for accessibility
    minHeight: 44,
  },
  labsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
    fontFamily: FONT_FAMILIES['NotoSerif-Regular'],
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'center',
  },
  placeholder: {
    width: 36,
  },
  labsContent: {
    marginBottom: 20,
    zIndex: 1,
  },
  labsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Math.max(16, 16 * scaleWidth),
  },
  labsIconContainer: {
    width: Math.max(110, 110 * scaleWidth),
    height: Math.max(77, 77 * scaleHeight),
    position: 'relative',
  },
  labsIcon: {
    width: Math.max(80, 80 * scale),
    height: Math.max(80, 80 * scale),
    backgroundColor: COLORS.white,
    borderRadius: 97,
    alignItems: 'center',
    justifyContent: 'center',
    ...(isAndroid && {
      elevation: 2,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    }),
  },
  bloodReportIcon: {
    width: Math.max(80, 80 * scale),
    height: Math.max(80, 80 * scale),
  },
  labsTag: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    paddingHorizontal: Math.max(8, 8 * scale),
    paddingVertical: Math.max(3, 3 * scale),
    borderRadius: 40,
    shadowColor: COLORS.shadowDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 3,
    ...(isAndroid && {
      elevation: 3,
    }),
  },
  labsTagText: {
    fontSize: Math.max(10, 10 * scale),
    color: COLORS.warmPurple,
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  labsTextContainer: {
    flex: 1,
    gap: Math.max(8, 8 * scale),
  },
  labsTitleText: {
    fontSize: Math.max(14, 14 * scale),
    fontWeight: '500',
    color: COLORS.black,
    fontFamily: FONT_FAMILIES['NotoSerif-Regular'],
    lineHeight: Math.max(21, 21 * scale),
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  labsDescriptionText: {
    fontSize: Math.max(12, 12 * scale),
    color: COLORS.greyMedium,
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    lineHeight: Math.max(15, 15 * scale),
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  uploadButtonContainer: {
    paddingHorizontal: 0,
    zIndex: 1,
    marginTop: 10,
    marginBottom: 15,

  },
  uploadButton: {
    backgroundColor: COLORS.white,
    borderRadius: 100,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: isAndroid ? 5 : 0,
    borderWidth: 0,
    minHeight: 48,
  },
  uploadButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Math.max(11, 11 * scale),
    paddingHorizontal: Math.max(35, 35 * scaleWidth),
    gap: Math.max(3, 3 * scale),
    height: Math.max(48, 48 * scale),
    minHeight: 48,
  },
  uploadButtonText: {
    fontSize: Math.max(14, 14 * scale),
    fontWeight: '500',
    color: COLORS.black,
    fontFamily: FONT_FAMILIES['Inter-Medium'],
    letterSpacing: 0,
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  streakSection: {
    marginBottom: Math.max(20, 20 * scaleHeight),
    gap: Math.max(30, 30 * scaleHeight),
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    minHeight: isAndroid ? 300 : undefined,
  },
  streakGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  streakHeader: {
    alignItems: 'center',
    // gap: 20,
    zIndex: 2,
  },
  streakTitle: {
    fontSize: Math.max(14, 14 * scale),
    fontWeight: '500',
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: FONT_FAMILIES['NotoSerif-Regular'],
    lineHeight: Math.max(21, 21 * scale),
    marginBottom: Math.max(50, 50 * scaleHeight),
    marginTop: Math.max(40, 40 * scaleHeight),
    width: '100%',
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  streakNumberContainer: {
    alignItems: 'center',
  },
  streakNumberGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  streakTextContainer: {
    alignItems: 'center',
    // gap: 2,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  streakNumber: {
    fontSize: Math.max(80, 80 * scale),
    fontWeight: '700',
    fontFamily: FONT_FAMILIES['NotoSerif-Regular'],
    lineHeight: Math.max(100, 100 * scale),
    textAlign: 'center',  
    verticalAlign: 'middle',
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  streakLabel: {
    fontSize: Math.max(12, 12 * scale),
    color: COLORS.black,
    fontFamily: FONT_FAMILIES['NotoSerif-Regular'],
    lineHeight: Math.max(18, 18 * scale),
    backgroundColor: COLORS.white,
    paddingHorizontal: Math.max(30, 30 * scaleWidth),
    paddingTop: Math.max(8, 8 * scale),
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  top20Badge: {
    backgroundColor: '#FFFDEC',
    paddingHorizontal: Math.max(6, 6 * scale),
    paddingVertical: Math.max(4, 4 * scale),
    borderRadius: isAndroid ? 4 : 0,
  },
  top20Text: {
    fontSize: Math.max(12, 12 * scale),
    fontWeight: '600',
    color: '#F6C34C',
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    lineHeight: Math.max(15, 15 * scale),
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  milestonesContainer: {
    width: '100%',
    paddingVertical: Math.max(12, 12 * scaleHeight),
    paddingHorizontal: Math.max(20, 20 * scaleWidth),
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    zIndex: 2,
    marginHorizontal: isAndroid ? 0 : undefined,
  },
  milestonesProgress: {
    height: Math.max(51, 51 * scaleHeight),
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: isAndroid ? 51 : undefined,
  },
  milestoneVector1: {
    position: 'absolute',
    top: 6,
    left: 15,
    right: 15,
    height: 2,
    backgroundColor: 'rgba(193, 126, 201, 0.3)',
    borderRadius: 1,
  },
  milestoneVector2: {
    position: 'absolute',
    top: 6,
    left: 15,
    width: 20,
    height: 2,
    backgroundColor: COLORS.warmPurple,
    borderRadius: 1,
  },
  progressLine: {
    position: 'absolute',
    top: 6,
    left: 15,
    right: 15,
    height: 1,
    backgroundColor: '#D9D9D9',
  },
  progressLineActive: {
    position: 'absolute',
    top: 5,
    left: 15,
    width: 40,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.warmPurple,
  },
  milestoneItem: {
    alignItems: 'center',
    gap: Math.max(10, 10 * scale),
    flex: 1,
  },
  milestoneDot: {
    width: Math.max(12, 12 * scale),
    height: Math.max(12, 12 * scale),
    borderRadius: Math.max(6, 6 * scale),
  },
  milestoneTextContainer: {
    alignItems: 'center',
    gap: Math.max(2, 2 * scale),
  },
  milestoneName: {
    fontSize: Math.max(12, 12 * scale),
    fontWeight: '500',
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    lineHeight: Math.max(15, 15 * scale),
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  milestoneDay: {
    fontSize: Math.max(8, 8 * scale),
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    lineHeight: Math.max(10, 10 * scale),
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  rewardsContainer: {
    paddingHorizontal: Math.max(20, 20 * scaleWidth),
    paddingBottom: Math.max(40, 40 * scaleHeight),
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Math.max(26, 26 * scaleHeight),
    gap: Math.max(6, 6 * scale),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.greyLight,
  },
  dividerText: {
    fontSize: Math.max(14, 14 * scale),
    fontWeight: '500',
    color: COLORS.greyMedium,
    fontFamily: FONT_FAMILIES['NotoSerif-Regular'],
    lineHeight: Math.max(21, 21 * scale),
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  rewardsList: {
    gap: Math.max(20, 20 * scaleHeight),
    marginBottom: Math.max(20, 20 * scaleHeight),
  },
  // In progress state styles
  streakTextInProgress: {
    color: COLORS.warmPurple,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',    
    gap: Math.max(16, 16 * scaleWidth),
    minHeight: isAndroid ? 80 : undefined,
  },
  rewardIconContainer: {
    width: Math.max(62, 62 * scale),
    minHeight: Math.max(62, 62 * scale),
    height: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Math.max(5, 5 * scale),
    ...(isAndroid && {
      elevation: 1,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
    }),
  },
  rewardIcon: {
    fontSize: Math.max(32, 32 * scale),
  },
  rewardContent: {
    flex: 1,
    gap: Math.max(10, 10 * scale),
  },
  rewardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Math.max(5, 5 * scale),
  },
  rewardTitle: {
    fontSize: Math.max(14, 14 * scale),
    fontWeight: '500',
    color: COLORS.black,
    fontFamily: FONT_FAMILIES['NotoSerif-Regular'],
    lineHeight: Math.max(21, 21 * scale),
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  rewardDescription: {
    fontSize: Math.max(12, 12 * scale),
    color: COLORS.greyLight,
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    lineHeight: Math.max(15, 15 * scale),
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  personalizeButtonGradient: {
    borderRadius: 10,
    padding: Math.max(2, 2 * scale),
  },
  personalizeButton: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingVertical: Math.max(9, 9 * scale),
    width: '100%',
    paddingHorizontal: Math.max(14, 14 * scale),
    minHeight: isAndroid ? 36 : undefined,
  },
  gradientTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientTextBackground: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
  },
  personalizeButtonText: {
    fontSize: Math.max(12, 12 * scale),
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    lineHeight: Math.max(22, 22 * scale),
    textAlign: 'center',
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
  rewardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: Math.max(13, 13 * scale),
    backgroundColor: '#EEE1F4',
    borderRadius: Math.max(6.5, 6.5 * scale),
    marginRight: Math.max(16, 16 * scaleWidth),
  },
  progressFill: {
    height: '100%',
    borderRadius: Math.max(6.5, 6.5 * scale),
  },
  streakText: {
    fontSize: Math.max(10, 10 * scale),
    color: COLORS.warmPurple,
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    lineHeight: Math.max(12.5, 12.5 * scale),
    includeFontPadding: isAndroid ? false : undefined,
    textAlignVertical: isAndroid ? 'center' : undefined,
  },
});