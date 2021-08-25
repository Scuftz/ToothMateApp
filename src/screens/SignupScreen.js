<<<<<<< HEAD
import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
=======
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  LogBox,
  Platform,
} from "react-native";
>>>>>>> master
import { NavigationEvents } from "react-navigation";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
<<<<<<< HEAD

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
=======
// import { Context as ClinicContext } from "../context/ClinicContext";
import SearchableDropdown from "react-native-searchable-dropdown";
import { InteractionManager } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAvoidingView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  //   const cc = useContext(ClinicContext);
>>>>>>> master
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

<<<<<<< HEAD
  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <Spacer>
        <Text h3>Sign Up for ToothMate</Text>
      </Spacer>
      <Spacer />
      <Input
        label="First Name"
        value={firstname}
        onChangeText={setFirstName}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Last Name"
        value={lastname}
        onChangeText={setLastName}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Mobile"
        value={mobile}
        onChangeText={setMobile}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Password"
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
          title="Sign Up"
          onPress={() =>
            signup({ firstname, lastname, email, mobile, password })
          }
        />
      </Spacer>
      <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
        <Spacer>
          <Text style={styles.link}>
            Already have an account? Sign in instead
          </Text>
        </Spacer>
      </TouchableOpacity>
=======
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
    console.log("State Date: " + dob);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <Spacer>
          <Text h3 style={{ marginBottom: 5 }}>
            Sign Up for ToothMate
          </Text>
        </Spacer>
        <Spacer />
        <Input
          label="First Name"
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
                <>
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
                </>
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
        <Spacer />
        <Spacer>
          <Button
            title="Next"
            onPress={() =>
              navigation.navigate("SelectClinic", {
                firstname,
                lastname,
                email,
                mobile,
                password,
                dob,
              })
            }
          />
        </Spacer>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
          <Spacer>
            <Text style={styles.link}>
              Already have an account? Sign in instead
            </Text>
          </Spacer>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
>>>>>>> master
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 30,
<<<<<<< HEAD
=======
    marginTop: 50,
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
    height: 30,
    marginBottom: 0,
  },
  textStyle: {
    fontSize: 16,
  },
  labelStyle: {
    fontSize: 14,
>>>>>>> master
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
  },
  link: {
    color: "blue",
  },
<<<<<<< HEAD
=======
  dropdownContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  clinicTextStyle: {
    marginLeft: 10,
    fontSize: 14,
    color: "#86939e",
    fontWeight: "bold",
  },
>>>>>>> master
});

export default SignupScreen;
