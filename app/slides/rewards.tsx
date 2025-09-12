import { Ionicons } from "@expo/vector-icons";
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONT_FAMILIES, useAppFonts } from '../../lib/fonts';

// Constants from Figma design
const BACKGROUND_VECTOR_IMAGE = "http://localhost:3845/assets/cf926b4d5ec2719e28f1af07e084ed30c131abe4.svg";
const MILESTONE_BG_IMAGE = require("../../assets/images/milestone-bg.png");
const BLOOD_REPORT_IMAGE = require("../../assets/images/blood-report-logo.png");

// Gradient Text Component
function GradientText({ children, style }: { children: string; style?: any }) {
  return (
    <MaskedView
      style={{ flexDirection: 'row', height: 20 }}
      maskElement={
        <Text style={[style, { backgroundColor: 'transparent' }]}>
          {children}
        </Text>
      }
    >
      <LinearGradient 
        colors={['#A29AEA', '#C17EC9', '#D482B9', '#E98BAC', '#FDC6D1']}
        locations={[0, 0.3654, 0.571, 0.8336, 1.142]}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
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
      style={[styles.progressFill, { width: `${progress}%` }]}
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
};


// Types
type RewardItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  backgroundColor: string;
  streak?: string;
  isUnlocked: boolean;
  isClaimed?: boolean;
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

  const navigateToIndex = () => {
    router.back();
  };

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

const seedRewards: RewardItem[] = [
  {
    id: "1",
    title: "Streak freeze",
    description: "",
    icon: "🧊",
    backgroundColor: COLORS.lightBlue,
    isUnlocked: true,
    isClaimed: true,
  },
  {
    id: "2",
    title: "Diet preferences",
    description: "",
    icon: "🥗",
      backgroundColor: COLORS.lightViolet,
    isUnlocked: true,
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
    isUnlocked: true,
  },
  {
    id: "4",
    title: "Symptom patterns unlocked",
    description: "Understand your bodily trends",
    icon: "✨",
    backgroundColor: COLORS.lightYellow,
    streak: "14 day streak",
    isUnlocked: true,
  },
];

const growRewards: RewardItem[] = [
  {
    id: "5",
    title: "2x plan refresh",
    description: "Additional refreshes for the action plan",
    icon: "🧊",
    backgroundColor: COLORS.lightBlue,
    streak: "16 day streak",
      isUnlocked: true,
  },
  {
    id: "6",
    title: "Ethnicity/cultural habits",
    description: "Tailor the plan to your traditions & lifestyle",
    icon: "🌏",
      backgroundColor: COLORS.lightViolet,
    streak: "18 day streak",
      isUnlocked: true,
  },
  {
    id: "7",
    title: "Cuisine preferences",
    description: "The plan to adapts to your favorite cuisines",
    icon: "🥘",
      backgroundColor: COLORS.lightViolet,
    streak: "12 day streak",
      isUnlocked: true,
  },
  {
    id: "8",
    title: "Dine out habits",
    description: "Healthier alternatives to your fav order",
    icon: "🍔",
      backgroundColor: COLORS.lightViolet,
    streak: "14 day streak",
      isUnlocked: true,
  },
  {
    id: "9",
    title: "BMI/Waist to height ratio",
    description: "Adjust actions to your body's unique profile",
    icon: "⚖️",
      backgroundColor: COLORS.lightViolet,
    streak: "18 day streak",
      isUnlocked: true,
  },
  {
    id: "10",
    title: "First signs of improvement",
    description: "Start to feel relief for top concerns",
    icon: "✨",
    backgroundColor: COLORS.lightYellow,
    streak: "21 day streak",
      isUnlocked: true,
    },
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
      style={styles.labsSection}
    >
      
      <View style={styles.labsHeader}>
        <TouchableOpacity style={styles.backButton} onPress={navigateToIndex}>
          <Ionicons name="chevron-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.labsTitle}>Personalize</Text>
        <View style={styles.placeholder} />
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
            <MaskedView maskElement={<Text style={[styles.streakNumber, { backgroundColor: "transparent" }]}>9</Text>}>
              <LinearGradient colors={['#A29AEA', '#C17EC9', '#D482B9', '#E98BAC', '#FDC6D1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={[styles.streakNumber, { opacity: 0 }]}>9</Text>
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
                { backgroundColor: milestone.isActive ? COLORS.warmPurple : COLORS.greyLight }
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

  const renderRewardItem = (item: RewardItem) => (
    <View key={item.id} style={styles.rewardItem}>
      <View style={[styles.rewardIconContainer, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.rewardIcon}>{item.icon}</Text>
      </View>
      <View style={styles.rewardContent}>
        <View style={styles.rewardHeader}>
          <Text style={styles.rewardTitle}>{item.title}</Text>
          {item.isClaimed && (
            <Ionicons name="checkmark-circle" size={12} color={COLORS.warmPurple} />
          )}
        </View>
        {item.description && (
          <Text style={styles.rewardDescription}>{item.description}</Text>
        )}
        {item.hasButton && (
          <LinearGradient
            colors={['#A29AEA', '#C17EC9', '#D482B9', '#E98BAC', '#FDC6D1']}
            locations={[0, 0.4, 0.6, 0.9, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.personalizeButtonGradient}
          >
            <TouchableOpacity style={styles.personalizeButton}>
              <MaskedView maskElement={<Text style={[styles.personalizeButtonText, { backgroundColor: "transparent" }]}>{item.buttonText}</Text>}>
                <LinearGradient colors={['#A29AEA', '#C17EC9', '#D482B9', '#E98BAC', '#FDC6D1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                  <Text style={[styles.personalizeButtonText, { opacity: 0 }]}>{item.buttonText}</Text>
                </LinearGradient>
              </MaskedView>
            </TouchableOpacity>
          </LinearGradient>
        )}
        {item.streak && (
          <View style={styles.rewardFooter}>
            <View style={styles.progressBar}>
              <ProgressGradient progress={70} />
            </View>
            <Text style={styles.streakText}>{item.streak}</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderDivider = (text: string) => (
    <View style={styles.dividerContainer}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{text}</Text>
      <View style={styles.dividerLine} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
  labsSection: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
    // marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  
  labsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    zIndex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
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
    gap: 16,
  },
  labsIconContainer: {
    width: 110,
    height: 77,
    position: 'relative',
  },
  labsIcon: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.white,
    borderRadius: 97,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  bloodReportIcon: {
    width: 80,
    height: 80,
  },
  labsTag: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 40,
    shadowColor: COLORS.shadowDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 3,
    
  },
  labsTagText: {
    fontSize: 10,
    color: COLORS.warmPurple,
    fontFamily: FONT_FAMILIES['Inter-Regular'],
  },
  labsTextContainer: {
    flex: 1,
    gap: 8,
  },
  labsTitleText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
    fontFamily: FONT_FAMILIES['NotoSerif-Regular'],
    lineHeight: 21,
  },
  labsDescriptionText: {
    fontSize: 12,
    color: COLORS.greyMedium,
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    lineHeight: 15,
  },
  uploadButtonContainer: {
    paddingHorizontal: 0,
    zIndex: 1,
    marginVertical: 10,
  },
  uploadButton: {
    backgroundColor: COLORS.white,
    borderRadius: 100,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 0,
  },
  uploadButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    paddingHorizontal: 35,
    gap: 3,
    height: 48,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
    fontFamily: FONT_FAMILIES['Inter-Medium'],
    // lineHeight: 14,
    letterSpacing: 0,
  },
  streakSection: {
    // paddingHorizontal: 20,
    // paddingVertical: 30,
    // marginHorizontal: 20,
    marginBottom: 20,
    gap: 30,
    position: 'relative',
    overflow: 'hidden',
    // height: '100%',
    backgroundColor: COLORS.white,
    // backgroundPosition: 'top',
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
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: FONT_FAMILIES['NotoSerif-Regular'],
    lineHeight: 21,
    marginBottom: 50,
    marginTop: 40,
    width: '100%',
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
    fontSize: 80,
    fontWeight: '700',
    fontFamily: FONT_FAMILIES['NotoSerif-Bold'],
    lineHeight: 100,
    textAlign: 'center',  
    verticalAlign: 'middle',  
  },
  streakLabel: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONT_FAMILIES['NotoSerif-Regular'],
    lineHeight: 18,
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
    paddingTop: 8,
  },
  top20Badge: {
    backgroundColor: '#FFFDEC',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  top20Text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F6C34C',
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    lineHeight: 15,
  },
  milestonesContainer: {
    width: '100%',
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    zIndex: 2,
  },
  milestonesProgress: {
    height: 51,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
    backgroundColor: COLORS.greyLight,
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
    gap: 10,
  },
  milestoneDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  milestoneTextContainer: {
    alignItems: 'center',
    gap: 2,
  },
  milestoneName: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    lineHeight: 15,
  },
  milestoneDay: {
    fontSize: 8,
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    lineHeight: 10,
  },
  rewardsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 26,
    gap: 6,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.greyLight,
  },
  dividerText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.greyMedium,
    fontFamily: FONT_FAMILIES['NotoSerif-Regular'],
    lineHeight: 21,
  },
  rewardsList: {
    gap: 20,
    marginBottom: 20,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',    
    gap: 16,
  },
  rewardIconContainer: {
    width: 62,
    height: 62,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  rewardIcon: {
    fontSize: 32,
  },
  rewardContent: {
    flex: 1,
    gap: 10,
  },
  rewardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
    fontFamily: FONT_FAMILIES['NotoSerif-Regular'],
    lineHeight: 21,
  },
  rewardDescription: {
    fontSize: 12,
    color: COLORS.greyLight,
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    lineHeight: 15,
  },
  personalizeButtonGradient: {
    borderRadius: 10,
    padding: 2, // Increased padding for better visibility
  },
  personalizeButton: {
    backgroundColor: COLORS.white,
    borderRadius: 8, // Adjusted to account for the 2px gradient border
    paddingVertical: 9,
    width: '100%',
    paddingHorizontal: 14,
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
    fontSize: 12,
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    lineHeight: 22,
    textAlign: 'center',
  },
  rewardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 13,
    backgroundColor: '#EEE1F4',
    borderRadius: 6.5,
    marginRight: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 6.5,
  },
  streakText: {
    fontSize: 10,
    color: COLORS.warmPurple,
    fontFamily: FONT_FAMILIES['Inter-Regular'],
    lineHeight: 12.5,
  },
});