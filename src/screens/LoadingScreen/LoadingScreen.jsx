import React from 'react';
import { Text, ActivityIndicator, View, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ToothLogo from '../../assets/t_logo_crop2.png';
import styles from './styles';

const LoadingScreen = props => {
  const { showTooth } = props;

  return showTooth ? (
    <LinearGradient colors={['#7ad0f5', 'white', '#7ad0f5']} style={styles.container}>
      <Text style={styles.header}>ToothMate</Text>
      <ImageBackground source={ToothLogo} style={styles.imageBackgroundStyle}>
        <View style={styles.activityIndicatorViewStyle}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </ImageBackground>
    </LinearGradient>
  ) : (
    <LinearGradient colors={['#7ad0f5', 'white', '#7ad0f5']} style={styles.container}>
      <Text style={styles.header}>ToothMate</Text>
      <View style={styles.activityIndicatorViewStyle}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </LinearGradient>
  );
};

export default LoadingScreen;
