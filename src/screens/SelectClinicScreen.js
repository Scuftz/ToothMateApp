import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ClinicContext } from "../context/ClinicContext";
import SearchableDropdown from "react-native-searchable-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelectClinicScreen = ({ navigation }) => {
  const { state, signup, signupchild } = useContext(AuthContext);

  let firstname = navigation.getParam("firstname");
  let lastname = navigation.getParam("lastname");
  let email = navigation.getParam("email");
  let mobile = navigation.getParam("mobile");
  let password = navigation.getParam("password");
  let dob = navigation.getParam("dob");

  const cc = useContext(ClinicContext);
  const [clinic, setClinic] = useState({ name: "Clinic" });

  useEffect(() => {
    cc.getClinicNames();
  }, []);
  const items = cc.state;

  return (
    <View style={styles.container}>
      <Text style={styles.clinicTextStyle}>Select Your Clinic</Text>
      <SearchableDropdown
        items={items}
        onItemSelect={(item) => {
          setClinic({ id: item._id, name: item.name });
        }}
        textInputProps={{
          placeholder: `${clinic.name}`,
          style: {
            padding: 5,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
          },
        }}
        containerStyle={styles.dropdownContainer}
        itemStyle={{
          padding: 5,
          marginTop: 3,
          backgroundColor: "white",
          borderColor: "#bbb",
          borderWidth: 1,
          borderRadius: 2,
        }}
        itemTextStyle={{ color: "#222" }}
      />
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title="Sign Up"
        titleStyle={styles.buttonText}
          onPress={() => {
            signup({
              firstname,
              lastname,
              email,
              mobile,
              password,
              dob,
              clinic: clinic.id,
            });
          }}
        />
      </Spacer>
    </View>
  );
};

SelectClinicScreen.navigationOptions = () => {
  return {
    // headerShown: false,
    headerTitle: "Back to Sign Up",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginBottom: 30,
    marginTop: 50,
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
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
  },
  link: {
    color: "blue",
  },
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
  buttonText: {
    color: "white",
  },
});

export default SelectClinicScreen;
