import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../components/dental_background.jpg")}
        />
      </View>
      <Spacer>
        <Spacer />
        <Text h3 style={styles.signinText}>
          Sign In
        </Text>
      </Spacer>
      <Spacer />
      <Input
        // label="Email"
        placeholder="Email"
        leftIcon={{ type: "material-icons", name: "email" }}
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
        leftIcon={{ type: "font-awesome", name: "lock" }}
        inputStyle={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        // raised="true"
        title="Sign In"
        onPress={() => signin({ email, password })}
      />
      <Spacer />
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Spacer>
          <View style={styles.link}>
            <Text style={styles.linkText}>Don't have an account? </Text>
            <Text style={styles.secondLinkText}>Sign up instead</Text>
          </View>
        </Spacer>
      </TouchableOpacity>
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
  imageContainer: {
    width: "100%",
    height: 177,
    marginBottom: 25,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    borderColor: "blue",
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#21cbff",
    width: "90%",
    marginLeft: "5%",
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "#21cbff",
  },
  inputStyle: {
    paddingVertical: 8,
    padding: 5,
    fontSize: 16,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#dedede",
    width: "95%",
    paddingLeft: 10,
    backgroundColor: "#ebebeb",
    marginLeft: "2.5%",
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
