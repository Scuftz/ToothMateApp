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
    <LinearGradient colors={["#97ff78", "#AFE69E", "#AFE69E"]} style = {styles.container}>
      <ImageBackground
        ImageBackground source={require("../components/tooth.png")} styles={styles.container}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            opacity: 0.2,
          }}
        />
    <View style={styles.container}>
      <KeyboardAwareScrollView>
     
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <Image
            source={require("../components/tm_white_logo.png")}
            style={{
            width: 150,
            height: 90,
            alignSelf: 'center',
            justifyContent: 'center',
            resizeMode: 'contain',
            marginTop: 25
          }}
        />
      <Spacer/> 
       <Spacer/>
       <Spacer/> 
        <Spacer>
          <Text style={styles.containerHeading}>  Login </Text>
        </Spacer>
        <Spacer />
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
        <Spacer>
          <Button
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            //raised = "true"
            title="Log In"
            onPress={() => signin({ email, password })}
          />
        </Spacer>
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
    backgroundColor: "green",
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
    // width: "103%",
    paddingLeft: 13,
    backgroundColor: "#ebebeb",
    marginLeft: "2.20%",
  },
  labelStyles: {
    marginLeft: 15,
  },
  containerHeading: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    alignSelf: "center",
    //padding: 24,
    fontSize: 48,
    fontWeight: "bold",
    color: "black",
  },
  container: {
    flex: 1,
    //justifyContent: "center",
    padding: 24,
    fontWeight: "bold",
    color: "black",
    //flexDirection: 'column',
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
