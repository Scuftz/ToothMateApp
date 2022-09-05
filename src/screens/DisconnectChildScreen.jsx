import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, ActivityIndicator, View, ImageBackground, Dimensions, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import { Context as UserContext } from '../context/UserContext';

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    fontSize: 50,
    fontFamily: 'Righteous_400Regular',
    color: 'black',
  },
  container: {
    flex: 1,
    marginHorizontal: 0,
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
    marginTop: '10%',
    marginBottom: '5%',
  },
  button: {
    paddingVertical: 10,
    backgroundColor: '#f54245',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

const DisconnectChildScreen = props => {
  const { navigation } = props;

  const { state, canDisconnect, disconnectChild } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
  });

  useEffect(() => {
    const checkDisconnect = async () => {
      try {
        await canDisconnect();
      } finally {
        setLoading(false);
      }
    };

    checkDisconnect();
  }, []);

  if (loading || !fontsLoaded) {
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

  if (state.canDisconnect) {
    return (
      <LinearGradient colors={['#78d0f5', '#fff', '#78d0f5']} style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.header}> ToothMate </Text>
          <Text style={{ alignSelf: 'center', marginTop: '5%', textAlign: 'center', fontSize: 20 }}>
            {' '}
            You must be 18+ to make your account independent
          </Text>
          <View style={{ justifyContent: 'center', marginTop: '30%', borderWidth: 1, backgroundColor: '#fff' }}>
            <Text style={{ alignSelf: 'center', fontSize: 24, paddingTop: '5%', fontWeight: 'bold' }}>
              Are you sure you want to do this?
            </Text>
            <Text style={{ alignSelf: 'center', fontSize: 20 }}> This action cannot be undone.</Text>
            <Button
              title="Disconnect from Parent"
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              titleStyle={styles.buttonText}
              onPress={async () => {
                disconnectChild();
                const parentid = await AsyncStorage.getItem('parentid');
                if (parentid) {
                  await AsyncStorage.setItem('id', parentid);
                  navigation.navigate('mainFlow');
                } else {
                  navigation.popToTop();
                }
              }}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#78d0f5', '#fff', '#78d0f5']} style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}> ToothMate </Text>
        <ImageBackground
          source={require('../components/t_logo_crop2.png')}
          style={{
            paddingTop: '15%',
            height:
              Platform.OS === 'ios' ? Dimensions.get('window').height * 0.6 : Dimensions.get('window').height * 0.7,
            width: Dimensions.get('window').width,
          }}
        >
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              marginTop: '10%',
              textAlign: 'center',
              fontSize: 20,
              marginHorizontal: '10%',
            }}
          >
            You cannot disconnect from a parent account you are either under 18 or there is no parent account attached
            to your account.
          </Text>
        </ImageBackground>
      </View>
    </LinearGradient>
  );
};

DisconnectChildScreen.navigationOptions = () => {
  return {
    headerTitle: '',
    headerTintColor: 'black',
    headerBackTitleVisible: false,
    safeAreaInsets: Platform.OS === 'ios' ? { top: 45 } : { top: 30 },
    headerStyle: {
      backgroundColor: '#78d0f5',
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    },
  };
};

export default DisconnectChildScreen;
