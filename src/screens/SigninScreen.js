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
    <LinearGradient colors={["#78d0f5", "white", "#78d0f5"]} style = {styles.container}>
      <View style={styles.container}>
      <KeyboardAwareScrollView>
      <Spacer/>
      {/* Tooth background image */}
        <ImageBackground
          source={require("../components/t_logo1.png")} styles={styles.container}
          style={{
            position: 'absolute',
            top: '-5%',
            left: '-2.5%', //fix image crop so even on each side
            opacity: 1,
            width: '100%',
            height: '100%',
            // borderWidth: 1,
          }}
        />

      {/* <View style={styles.container}>
      <KeyboardAwareScrollView> */}
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <Spacer/>
        <Spacer/>
        <Spacer/>
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
          titleStyle={{color: '#fff'}}
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
    // borderWidth: 1,
    borderRadius: 20,
    // borderColor: "white",
    width: "90%",
    marginLeft: "5%",
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "#10334d",
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
    width: "75%",
    borderColor: "#dedede",
    paddingLeft: 13,
    backgroundColor: "#f8f8ff",
    marginLeft: "12.5%",
  },
  labelStyles: {
    marginLeft: "17.5%",
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
    // padding: 24,
    // paddingBottom: 15,
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
