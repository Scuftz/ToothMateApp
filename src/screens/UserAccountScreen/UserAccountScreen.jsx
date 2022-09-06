import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ImageBackground, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import { Context as UserContext } from '../../context/UserContext/UserContext';
import { Context as AuthContext } from '../../context/AuthContext/AuthContext';
import ToothLogo from '../../assets/t_logo_crop2.png';
import styles from './styles';

const UserAccountScreen = props => {
  const { navigation } = props;

  const { state, canDisconnect, getUser, getDentalClinic } = useContext(UserContext);
  const { clearErrorMessage } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
  });

  useEffect(() => {
    const checkDisconnect = async () => {
      await canDisconnect();
    };
    checkDisconnect();

    clearErrorMessage();
    const listener = navigation.addListener('didFocus', () => {
      setLoading(false);
      clearErrorMessage();
    });
    return () => {
      listener.remove();
    };
  }, []);

  const handleUpdateDetails = async () => {
    setLoading(true);
    await getUser();
    navigation.navigate('User');
    setLoading(false);
  };

  const handleChangeClinic = async () => {
    setLoading(true);
    await getDentalClinic();
    navigation.navigate('UpdateClinic');
    setLoading(false);
  };

  const handleChangePassword = () => navigation.navigate('Password');

  const handleDisconnectFromParent = () => navigation.push('DisconnectChild');

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.activityIndicatorViewStyle}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#7ad0f5', 'white', '#7ad0f5']} style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>ToothMate</Text>
        <ImageBackground source={ToothLogo} style={styles.imageBackgroundStyle}>
          <View style={styles.buttonViewStyle}>
            <Button
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              title="Update Your Details"
              titleStyle={styles.titleContainer}
              onPress={handleUpdateDetails}
            />
            <Button
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              title="Change Clinic"
              titleStyle={styles.titleContainer}
              onPress={handleChangeClinic}
            />
            <Button
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              title="Change Your Password"
              titleStyle={styles.titleContainer}
              onPress={handleChangePassword}
            />
            {state.canDisconnect && (
              <Button
                buttonStyle={styles.button}
                containerStyle={styles.buttonContainer}
                title="Disconnect From Parent"
                titleStyle={styles.titleContainer}
                onPress={handleDisconnectFromParent}
              />
            )}
          </View>
        </ImageBackground>
      </View>
    </LinearGradient>
  );
};

UserAccountScreen.navigationOptions = () => {
  return {
    title: '',
    headerBackTitleVisible: false,
    headerTintColor: 'black',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 45 } : { top: 30 },
    headerStyle: {
      backgroundColor: '#78d0f5',
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    },
  };
};

export default UserAccountScreen;
