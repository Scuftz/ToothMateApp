import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  LogBox,
  Platform,
  Image,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
// import { Context as ClinicContext } from "../context/ClinicContext";
import SearchableDropdown from "react-native-searchable-dropdown";
import { InteractionManager } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAvoidingView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  //   const cc = useContext(ClinicContext);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [dob, setDob] = useState(new Date(946700000000));
  const [stringDate, setStringDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  useEffect(() => {
    convertDate(dob);
  }, []);

  function convertDate(inputDate) {
    let date = new Date(inputDate);
    let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
    let month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
    let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

    let stringDate = `${day} ${month} ${year}`;
    setStringDate(stringDate);
    return stringDate;
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShow(Platform.OS === "ios");
    setDob(currentDate);
    convertDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <LinearGradient
      colors={["#97ff78", "#AFE69E", "#AFE69E"]}
      style={styles.container}
    >
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <NavigationEvents onWillFocus={clearErrorMessage} />
          {/* <Text style = {styles.header}>
            Sign Up for Tooth Mate
          </Text> */}
          <Image
            source={require("../components/tm_white_logo.png")}
            style={{
              alignSelf: "center",
              justifyContent: "center",
              width: 150,
              height: 90,
              resizeMode: "contain",
              marginTop: 25,
            }}
          />
          <Input
            label="First Name"
            placeholder="First name"
            leftIcon={{ type: "feather", name: "user" }}
            value={firstname}
            onChangeText={setFirstName}
            autoCapitalize="none"
            autoCorrect={false}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.textStyle}
            labelStyle={styles.labelStyle}
          />
          <Input
            label="Last Name"
            placeholder="Last name"
            leftIcon={{ type: "feather", name: "user" }}
            value={lastname}
            onChangeText={setLastName}
            autoCapitalize="none"
            autoCorrect={false}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.textStyle}
            labelStyle={styles.labelStyle}
          />
          <Input
            label="Email"
            placeholder="Email"
            leftIcon={{ type: "material-icons", name: "email" }}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.textStyle}
            labelStyle={styles.labelStyle}
          />
          <Input
            label="Mobile"
            placeholder="Mobile"
            leftIcon={{ type: "entypo", name: "mobile" }}
            value={mobile}
            onChangeText={setMobile}
            autoCapitalize="none"
            autoCorrect={false}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.textStyle}
            labelStyle={styles.labelStyle}
          />
          <Input
            label="Password"
            placeholder="Password"
            leftIcon={{ type: "fontawesome5", name: "lock" }}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.textStyle}
            labelStyle={styles.labelStyle}
          />

          <Text style={styles.clinicTextStyle}>Enter Date of Birth</Text>
          <View>
            {(() => {
              if (Platform.OS === "android") {
                return (
                  <View
                    style={{
                      width: "90%",
                      marginLeft: "5%",
                    }}
                  >
                    <TouchableOpacity onPress={showDatepicker}>
                      <Text style={styles.dateStyle}>{stringDate}</Text>
                    </TouchableOpacity>
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={dob}
                        mode={mode}
                        is24Hour={true}
                        display="spinner"
                        onChange={onChange}
                      />
                    )}
                  </View>
                );
              } else {
                return (
                  <>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={dob}
                      mode={mode}
                      is24Hour={true}
                      display="spinner"
                      style={{ height: 150 }}
                      onChange={onChange}
                    />
                  </>
                );
              }
              return null;
            })()}
          </View>
          <Spacer>
            <Button
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              title="Next"
              titleStyle={styles.buttonText}
              onPress={() =>
                navigation.navigate("SelectClinic", {
                  firstname,
                  lastname,
                  email,
                  password,
                  dob,
                })
              }
            />
          </Spacer>
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Spacer>
              <View style={styles.link}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Already have an account?
                  <Text style={styles.link}> Sign in instead</Text>
                </Text>
              </View>
            </Spacer>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </LinearGradient>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#8FBC8B",
    //backgroundColor: "lightblue",
    flex: 1,
    justifyContent: "center",
  },
  dateStyle: {
    fontSize: 18,
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  dobButton: {
    backgroundColor: "#f2f2f2",
    justifyContent: "flex-start",
    paddingLeft: 10,
  },
  dobText: {
    color: "#000000",
    paddingLeft: 0,
    textAlign: "left",
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#dedede",
    width: "95%",
    paddingLeft: 15,
    backgroundColor: "#ebebeb",
    marginLeft: "2.25%",
  },
  textStyle: {
    //This is for the box
    fontSize: 16,
    //fontFamily: 'Helvetica'
  },
  labelStyle: {
    //This is for the text
    fontSize: 14,
    marginLeft: 18,
    color: "black",
    marginBottom: 3,
    marginTop: 2,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
  },
  link: {
    color: "blue",
    flexDirection: "row",
    justifyContent: "center",
  },

  dropdownContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  clinicTextStyle: {
    //Enter Date of Birth Styling
    marginLeft: 20,
    fontSize: 14,
    //color: "#86939e",
    color: "black",
    fontWeight: "bold",
  },
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
  header: {
    color: "#2B510C",
    fontWeight: "bold",
    fontSize: 30,
    padding: 2,
    justifyContent: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
  },
});

export default SignupScreen;
