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

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <Image
          style={{
            width: 120,
            height: 150,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            position: "relative",
            left: 5,
            top: 65,
          }}
          source={require("../../assets/tooth.png")}
        />
        <Spacer>
          <Text style={styles.containerHeading}> SIGN IN TO TOOTHMATE </Text>
        </Spacer>
        <Spacer />
        <Input
          label="E-MAIL ADDRESS"
          leftIcon={{ type: "material-icons", name: "email" }}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
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
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
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
    paddingLeft: 15,
    backgroundColor: "#ebebeb",
    marginLeft: "2.25%",
  },
  containerHeading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 24,
    fontSize: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "lightblue",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
  },
  link: {
    color: "white",
    flexDirection: "row",
    justifyContent: "center",
  },
  inputStyle: {
    paddingVertical: 8,
    padding: 5,
    fontSize: 16,
  },
});

export default SigninScreen;
