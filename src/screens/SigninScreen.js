import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, Platform } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "react-native";
import { useFonts, Righteous_400Regular } from "@expo-google-fonts/righteous";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let [fontsLoaded] = useFonts({ 
    Righteous_400Regular
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <LinearGradient colors={["#78d0f5", "white", "#78d0f5"]} style = {styles.container}>
      <View style={styles.container}>

      <Text style={{fontSize: 50, marginTop: "15%", marginBottom: "10%", alignSelf: "center", fontFamily: "Righteous_400Regular"}}> ToothMate </Text>
      <ImageBackground
        source={require("../components/t_logo_crop2.png")}
        style={{
          paddingTop: "20%",
          height: Platform.OS == "ios" ? Dimensions.get('window').height * 0.6 : Dimensions.get('window').height * 0.7,
          width: Dimensions.get('window').width,
        }}
        >

        <NavigationEvents onWillFocus={clearErrorMessage} />
        
        <Input
          label="Email Address"
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
          label="Password"
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
     </ImageBackground>  
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          title="Log In"
          onPress={() => signin({ email, password })}
          titleStyle={{color: '#000', fontWeight: "bold"}}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
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

//Header Options
SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

//Style Sheets 
const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 20,
    width: "90%",
    marginLeft: "5%",
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "#F0F0F0",
  },
  inputStyle: {
    paddingVertical: 8,
    padding: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  titleContainer: {
    color: 'black',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 20,
    width: "80%",
    marginLeft: "10%",
    borderColor: "#dedede",
    paddingLeft: 13,
    backgroundColor: "#f8f8ff",
  },
  labelStyles: {
    marginLeft: "15%",
    color: "black",
  },
  containerHeading: {
    alignSelf: "center",
    fontSize: 48,
    fontWeight: "bold",
    color: "black",
  },
  imageContainer: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1, 
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    alignSelf: "center",
    marginTop: "-5%",
    fontWeight: "bold"
  },
  link: {
    color: "black",
    flexDirection: "row",
    justifyContent: "center",
    fontWeight: "bold",
    marginTop: "2%",
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
