import React, { useContext, useState } from 'react';
import { StyleSheet, Text, ImageBackground, Dimensions, ActivityIndicator, View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import { Context as AuthContext } from '../context/AuthContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontWeight: 'bold',
    color: 'black',
  },
  header: {
    alignSelf: 'center',
    fontSize: 48,
    fontFamily: 'Righteous_400Regular',
    color: 'black',
    marginBottom: '10%',
    marginTop: '15%',
  },
  buttonContainer: {
    borderRadius: 20,
    width: '80%',
    marginBottom: 15,
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 10,
    backgroundColor: '#F0F0F0',
  },
  titleContainer: {
    color: '#000',
    fontWeight: 'bold',
  },
  backButton: {
    paddingVertical: 10,
    backgroundColor: '#F0f0f0',
    borderColor: '#000',
    borderRadius: 20,
    width: '80%',
    marginBottom: 30,
    alignSelf: 'center',
  },
  backTitleContainer: {
    color: '#000',
    fontWeight: 'bold',
  },
});

const AccountScreen = props => {
  const { navigation } = props;

  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#7ad0f5', 'white', '#7ad0f5']} style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>ToothMate</Text>
        <ImageBackground
          source={require('../components/t_logo_crop2.png')}
          style={{
            paddingTop: '15%',
            height:
              Platform.OS === 'ios' ? Dimensions.get('window').height * 0.6 : Dimensions.get('window').height * 0.7,
            width: Dimensions.get('window').width,
          }}
        >
          <View style={{ flex: 1, marginTop: '10%' }}>
            <Button
              buttonStyle={styles.backButton}
              titleStyle={styles.backTitleContainer}
              title="Back to Parent Account"
              onPress={async () => {
                navigation.navigate('mainFlow');
                await AsyncStorage.setItem('id', await AsyncStorage.getItem('parentid'));
                await AsyncStorage.removeItem('parentid');
              }}
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
