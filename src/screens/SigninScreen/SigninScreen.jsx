import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Text, Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import Spacer from '../../components/Spacer';
import { Context as AuthContext } from '../../context/AuthContext/AuthContext';
import ToothLogo from '../../assets/t_logo_crop2.png';
import styles from './styles';
import LoadingScreen from '../LoadingScreen';

const SigninScreen = props => {
  const { navigation } = props;

  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
  });

  const handleSignin = () => signin({ email, password });

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <LinearGradient colors={['#78d0f5', 'white', '#78d0f5']} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleTextStyle}> ToothMate </Text>
        <ImageBackground source={ToothLogo} style={styles.imageBackgroundStyle}>
          <NavigationEvents onWillFocus={clearErrorMessage} />
          <Input
            label="Email Address"
            leftIcon={{ type: 'material-icons', name: 'email' }}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyles}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            label="Password"
            inputContainerStyle={styles.inputContainer}
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyles}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
        </ImageBackground>
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          title="Log In"
          onPress={handleSignin}
          titleStyle={styles.signinButtonTitleStyle}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Spacer>
            <View style={styles.link}>
              <Text style={styles.link}> CREATE A NEW ACCOUNT </Text>
            </View>
          </Spacer>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

// Header Options
SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SigninScreen;
