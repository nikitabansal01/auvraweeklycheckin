import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Test different scaling methods with more aggressive scaling
const FONT_SIZES = {
  // Original sizes
  original: 14,
  
  // Different scaling methods
  moderate: moderateScale(14),
  moderateFactor: moderateScale(14, 0.3),
  moderateAggressive: moderateScale(14, 0.5),
  scale: scale(14),
  vertical: verticalScale(14),
  
  // Manual scaling based on screen width
  manual: screenWidth < 400 ? 12 : screenWidth < 500 ? 14 : 16,
  
  // More dramatic manual scaling
  dramatic: screenWidth < 350 ? 10 : screenWidth < 400 ? 12 : screenWidth < 500 ? 16 : 20,
};

export default function DebugFonts() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Font Scaling Debug</Text>
      
      <View style={styles.info}>
        <Text style={styles.infoText}>Screen Width: {screenWidth}</Text>
        <Text style={styles.infoText}>Screen Height: {screenHeight}</Text>
      </View>
      
      <View style={styles.testContainer}>
        <Text style={[styles.testText, { fontSize: FONT_SIZES.original }]}>
          Original (14px): This is original font size
        </Text>
        
        <Text style={[styles.testText, { fontSize: FONT_SIZES.moderate }]}>
          Moderate Scale: This uses moderateScale(14)
        </Text>
        
        <Text style={[styles.testText, { fontSize: FONT_SIZES.moderateFactor }]}>
          Moderate Factor: This uses moderateScale(14, 0.3)
        </Text>
        
        <Text style={[styles.testText, { fontSize: FONT_SIZES.moderateAggressive }]}>
          Moderate Aggressive: This uses moderateScale(14, 0.5)
        </Text>
        
        <Text style={[styles.testText, { fontSize: FONT_SIZES.scale }]}>
          Scale: This uses scale(14)
        </Text>
        
        <Text style={[styles.testText, { fontSize: FONT_SIZES.vertical }]}>
          Vertical Scale: This uses verticalScale(14)
        </Text>
        
        <Text style={[styles.testText, { fontSize: FONT_SIZES.manual }]}>
          Manual Scale: This uses manual scaling
        </Text>
        
        <Text style={[styles.testText, { fontSize: FONT_SIZES.dramatic }]}>
          Dramatic Scale: This uses dramatic manual scaling
        </Text>
      </View>
      
      <View style={styles.values}>
        <Text style={styles.valueText}>Original: {FONT_SIZES.original}</Text>
        <Text style={styles.valueText}>Moderate: {FONT_SIZES.moderate.toFixed(2)}</Text>
        <Text style={styles.valueText}>Moderate Factor: {FONT_SIZES.moderateFactor.toFixed(2)}</Text>
        <Text style={styles.valueText}>Moderate Aggressive: {FONT_SIZES.moderateAggressive.toFixed(2)}</Text>
        <Text style={styles.valueText}>Scale: {FONT_SIZES.scale.toFixed(2)}</Text>
        <Text style={styles.valueText}>Vertical: {FONT_SIZES.vertical.toFixed(2)}</Text>
        <Text style={styles.valueText}>Manual: {FONT_SIZES.manual}</Text>
        <Text style={styles.valueText}>Dramatic: {FONT_SIZES.dramatic}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  testContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  testText: {
    marginBottom: 10,
    color: '#333',
  },
  values: {
    backgroundColor: '#d0d0d0',
    padding: 10,
    borderRadius: 5,
  },
  valueText: {
    fontSize: 12,
    marginBottom: 3,
    fontFamily: 'monospace',
  },
});
