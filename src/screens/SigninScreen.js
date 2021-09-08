import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <View style={styles.imageContainer}>
        <LinearGradient
          // colors={["#00e1ff", "#00c8ff", "#0091ff"]}
          colors={["#1a194a", "#00c8ff", "#0fafff"]}
          style={styles.temp}
        >
          <View style={styles.logoContainer}>
            <Image
              style={styles.image}
              source={require("../components/tm_white.png")}
            />
          </View>
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Input
            // label="Email"
            placeholder="Email"
            placeholderTextColor="white"
            leftIcon={{ type: "feather", name: "user" }}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputStyle}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            // label="Password"
            inputContainerStyle={styles.inputContainer}
            leftIcon={{ type: "antdesign", name: "lock" }}
            inputStyle={styles.inputStyle}
            placeholder="Password"
            placeholderTextColor="white"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          {state.errorMessage ? (
            <Text style={styles.errorMessage}>{state.errorMessage}</Text>
          ) : null}
          <Spacer />
          <View style={styles.buttonHorizontal}>
            <Button
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              // raised="true"
              title="Sign In"
              raised
              onPress={() => signin({ email, password })}
            />
            <Spacer />
            <Button
              buttonStyle={styles.buttonTwo}
              containerStyle={styles.buttonContainerTwo}
              // raised="true"
              title="Sign Up"
              titleStyle={styles.buttonText}
              onPress={() => navigation.navigate("Signup")}
            />
          </View>
          {/* <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Spacer>
              <View style={styles.link}>
                <Text style={styles.linkText}>Don't have an account? </Text>
                <Text style={styles.secondLinkText}>Sign up instead</Text>
              </View>
            </Spacer>
          </TouchableOpacity> */}
        </LinearGradient>
        {/* <Image
          style={styles.image}
          source={require("../components/dental_background.jpg")}
        /> */}
      </View>
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    // marginBottom: 200,
  },
  temp: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    marginBottom: 25,
  },
  logoContainer: {
    marginTop: 150,
    width: "85%",
    height: 80,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  buttonContainer: {
    borderWidth: 1,
    // borderRadius: 20,
    borderColor: "#21cbff",
    width: "50%",
    marginLeft: "10%",
  },
  button: {
    paddingVertical: 10,
    // backgroundColor: "#21cbff",
    backgroundColor: "#042e6b",
  },
  buttonContainerTwo: {
    borderWidth: 1,
    // borderRadius: 20,
    borderColor: "#21cbff",
    width: "25%",
    marginLeft: -20,
  },
  buttonTwo: {
    paddingVertical: 10,
    // backgroundColor: "#21cbff",
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#000",
  },
  buttonHorizontal: {
    flexDirection: "row",
  },
  inputStyle: {
    paddingVertical: 8,
    padding: 5,
    fontSize: 16,
    color: "white",
  },
  inputContainer: {
    borderBottomWidth: 1,
    // borderRadius: 20,
    borderColor: "#dedede",
    width: "80%",
    paddingLeft: 10,
    // backgroundColor: "#ebebeb",
    marginLeft: "7.5%",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: "5%",
  },
  linkText: {
    color: "gray",
    fontWeight: "bold",
  },
  secondLinkText: {
    color: "#005a8a",
    fontWeight: "bold",
  },
  signinText: {
    marginLeft: "2.5%",
  },
});

export default SigninScreen;
