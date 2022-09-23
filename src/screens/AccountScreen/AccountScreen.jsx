import React, { useContext, useState, useEffect } from 'react';
import { Text, ActivityIndicator, View, FlatList, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import { Context as AuthContext } from '../../context/AuthContext/AuthContext';
import styles from './styles';
import ToothLogo from '../../assets/t_logo_crop2.png';

const AccountScreen = props => {
  const { navigation } = props;

  const {
    state: { children },
    signout,
    getChildAccounts,
  } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [parent, setParent] = useState(null);
  const [isFocused, setFocused] = useState(navigation.isFocused());

  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
  });

  const getParent = async () => {
    let parentValue = parent;
    try {
      setLoading(true);
      parentValue = await AsyncStorage.getItem('parentid');
      getChildAccounts();
    } catch (err) {
      console.log('ERROR');
    } finally {
      setParent(parentValue);
      setLoading(false);
    }
  };

  useEffect(() => {
    getParent();
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

  const renderChildButton = React.useCallback(
    child => (
      <Button
        title={child.firstname}
        buttonStyle={styles.childButtonStyle}
        titleStyle={styles.childTextStyle}
        onPress={async () => {
          await AsyncStorage.setItem('parentId', await AsyncStorage.getItem('id'));
          await AsyncStorage.setItem('id', child._id);
          navigation.navigate('childFlow');
        }}
      />
    ),
    [navigation],
  );

  // Child Account Buttons that appear on Screen
  const childButtons = React.useMemo(
    () => <FlatList data={children} keyExtractor={child => child._id} renderItem={renderChildButton} />,
    [children, renderChildButton],
  );

  if (loading || !fontsLoaded) {
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
          <Text style={styles.yourAccountStyle}>Your Accounts</Text>
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
