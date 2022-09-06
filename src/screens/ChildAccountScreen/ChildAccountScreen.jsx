import React from 'react';
import { Text, ImageBackground, ActivityIndicator, View } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import styles from './styles';
import ToothLogo from '../assets/t_logo_crop2.png';

const AccountScreen = props => {
  const { navigation } = props;

  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.activityIndicatorViewStyle}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleBackToParentPress = async () => {
    navigation.navigate('mainFlow');
    await AsyncStorage.setItem('id', await AsyncStorage.getItem('parentid'));
    await AsyncStorage.removeItem('parentid');
  };

  return (
    <LinearGradient colors={['#7ad0f5', 'white', '#7ad0f5']} style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>ToothMate</Text>
        <ImageBackground source={ToothLogo} style={styles.imageBackgroundStyle}>
          <View style={{ flex: 1, marginTop: '10%' }}>
            <Button
              buttonStyle={styles.backButton}
              titleStyle={styles.backTitleContainer}
              title="Back to Parent Account"
              onPress={handleBackToParentPress}
            />
            <Button
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              titleStyle={styles.titleContainer}
              title="Update Account Details"
              onPress={() => navigation.navigate('UserAccount')}
            />
          </View>
        </ImageBackground>
      </View>
    </LinearGradient>
  );
};

// Header Options
AccountScreen.navigationOptions = {
  headerShown: false,
};

export default AccountScreen;
