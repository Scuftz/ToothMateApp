import React, { useContext, useState, useEffect } from 'react';
import { Text, View, FlatList, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import { Context as AuthContext } from '../../context/AuthContext/AuthContext';
import styles from './styles';
import ToothLogo from '../../assets/t_logo_crop2.png';
import LoadingScreen from '../LoadingScreen';

const AccountScreen = props => {
  const { navigation } = props;

  const {
    state: { children, errorMessage },
    signout,
    getChildAccounts,
  } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [isFocused, setFocused] = useState(navigation.isFocused());

  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
  });

  const onFocus = async () => {
    setLoading(true);
    await getChildAccounts();
    setLoading(false);
  };

  useEffect(() => {
    onFocus();
    const focusListener = navigation.addListener('didFocus', () => {
      setFocused(true);
    });
    const blurListener = navigation.addListener('didBlur', () => {
      setFocused(false);
    });

    return () => {
      focusListener.remove();
      blurListener.remove();
    };
  }, [isFocused]);

  const renderChildButton = child => (
    <Button
      title={child.item.firstname}
      buttonStyle={styles.childButtonStyle}
      titleStyle={styles.childTextStyle}
      onPress={async () => {
        await AsyncStorage.setItem('parentId', await AsyncStorage.getItem('id'));
        await AsyncStorage.setItem('id', child.item._id);
        navigation.navigate('childFlow');
      }}
    />
  );

  // Child Account Buttons that appear on Screen
  const childButtons = !errorMessage ? (
    <FlatList data={children} keyExtractor={child => child._id} renderItem={renderChildButton} />
  ) : null;

  if (loading || !fontsLoaded) {
    return <LoadingScreen showTooth />;
  }

  return (
    <LinearGradient colors={['#7ad0f5', 'white', '#7ad0f5']} style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>ToothMate</Text>
        <ImageBackground source={ToothLogo} style={styles.imageBackgroundStyle}>
          <View style={styles.topButtonViewStyle}>
            <Button
              buttonStyle={styles.button}
              title="Settings"
              onPress={() => navigation.navigate('UserAccount')}
              titleStyle={styles.titleContainer}
            />
            <Button
              buttonStyle={styles.button}
              title="Sign Up A Child/Elderly Account"
              onPress={() => navigation.navigate('signUpChildFlow')}
              titleStyle={styles.titleContainer}
            />
          </View>
        </ImageBackground>
        <View style={{ flex: 3, borderBottomWidth: 3, marginTop: '0%' }}>
          {children && children.length > 0 ? <Text style={styles.yourAccountStyle}>Your Accounts</Text> : null}
          <View style={{ marginBottom: 10 }}>{childButtons}</View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Button
            buttonStyle={styles.signOutButton}
            containerStyle={styles.signOutContainer}
            title="Sign Out"
            onPress={signout}
            titleStyle={styles.signOutTextStyle}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

// Header Options
AccountScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default AccountScreen;
