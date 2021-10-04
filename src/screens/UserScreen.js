import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationEvents } from "react-navigation";
import { Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as userContext } from "../context/UserContext";
import { Context as authContext } from "../context/AuthContext";

const UserScreen = ({ navigation }) => {
  const { state, getUser } = useContext(userContext);
  const { updateUser } = useContext(authContext);
  const authState = useContext(authContext);
  const [firstname, setFirstName] = useState(state.details.firstname);
  const [lastname, setLastName] = useState(state.details.lastname);
  const [email, setEmail] = useState(state.details.email);
  const [mobile, setMobile] = useState(state.details.mobile);

  const [dob, setDob] = useState(new Date(state.details.dob));
  const [stringDate, setStringDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  useEffect(() => {
    convertDate(dob);

    const listener = navigation.addListener("didFocus", () => {
      convertDate(dob);
    });
    return () => {
      listener.remove();
    };
  }, []);

  const userinfo = () => {
    getUser();
    let i = 1;
    //    while (state.details.length == 0){
    //      console.log("i")
    //     i++;
    //  }
  };

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

  p;

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <NavigationEvents />
        <Spacer>
          <Text h3 style={{ marginBottom: 5 }}>
            Change your details
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
        {authState.errorMessage ? (
          <Text style={styles.errorMessage}>{authState.errorMessage}</Text>
        ) : null}
        <Spacer>
          <Button
            title="Change Details"
            onPress={() => {
              updateUser({ firstname, lastname, email, mobile, dob });
            }}
          />
        </Spacer>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 30,
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
});

export default UserScreen;
