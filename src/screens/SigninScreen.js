import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "react-native-elements/dist/helpers";
import { BackgroundImage } from "react-native-elements/dist/config";
import { text } from "react-native-communications";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "react-native";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    // Gradient background 
    <LinearGradient colors={["#f54284", "white", "#f54284"]} style = {styles.container}>
      <Spacer/>
      {/* Tooth background image */}
    <ImageBackground
        ImageBackground source={require("../components/t_logo1.png")} styles={styles.container}
          style={{
            position: 'absolute',
            top: '-5%',
            left: '-7%',
            bottom: 0,
            right: 0,
            opacity: 1,
            width: '110%',
            height: '100%',
            // borderWidth: 1,
          }}
        />

    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        {/* Tooth mate Text Image */}
        {/* <Image
            source={require("../components/tm_logo6.png")}
            style={{
            width: 340,
            height: 120,
            alignSelf: 'center',
            justifyContent: 'center',
            resizeMode: 'contain',
            marginTop: 15,
          }}
        /> */}
        <Spacer/>
        <Spacer/>
      <Spacer/>
        {/* <Spacer> */}
          {/* Login image text */}
        {/* <Image
            source={require("../components/tm_login2.png")}
            style={{
            width: 150,
            height: 100,
            alignSelf: 'center',
            justifyContent: 'center',
            resizeMode: 'contain',
            marginTop: -25,
          }}
        /> */}
          {/* <Text style={styles.containerHeading}>  Login </Text> */}
        {/* </Spacer> */}
        {/* Email address label button */}
        <Spacer/>
        <Spacer/>
        <Input
          label="EMAIL ADDRESS"
          leftIcon={{ type: "material-icons", name: "email" }}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyles}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {/* Password label button */}
        <Input
          label="PASSWORD"
          inputContainerStyle={styles.inputContainer}
          leftIcon={{ type: "font-awesome", name: "lock" }}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyles}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {state.errorMessage ? (
          <Text style={styles.errorMessage}>{state.errorMessage}</Text>
        ) : null}
        {/* Log in button */}
        <Spacer/>
        <Spacer/>
        <Spacer/>
        <Spacer/>
        <Spacer/>
        <Spacer/>
        <Spacer/>
        <Spacer>
          <Button
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            title="Log In"
            onPress={() => signin({ email, password })}
            titleStyle={{color: 'black'}}
          />
        </Spacer>
        {/* Create a new account button touchable opacity function*/}
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Spacer>
            <View style={styles.link}>
              <Text style={styles.link}> CREATE A NEW ACCOUNT </Text>
            </View>
          </Spacer>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>

    </LinearGradient>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

//Style Sheets 
const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "white",
    width: "90%",
    marginLeft: "5%",
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "white",
  },
  inputStyle: {
    paddingVertical: 8,
    padding: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dedede",
    paddingLeft: 13,
    backgroundColor: "#f8f8ff",
    marginLeft: "2.20%",
  },
  labelStyles: {
    marginLeft: 15,
    color: "black",
  },
  containerHeading: {
    flex: 1,
    alignSelf: "center",
    fontSize: 48,
    fontWeight: "bold",
    color: "black",
  },
  container: {
    flex: 1,
    padding: 24,
    fontWeight: "bold",
    color: "black",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
  },
  link: {
    color: "black",
    flexDirection: "row",
    justifyContent: "center",
    fontWeight: "bold",
  },
  inputStyle: {
    paddingVertical: 8,
    padding: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },

});

export default SigninScreen;
