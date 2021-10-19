import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Platform, ActivityIndicator } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { HeaderBackButton } from "react-navigation-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Righteous_400Regular } from "@expo-google-fonts/righteous";


const SignupChildScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [dob, setDob] = useState(new Date(946700000000));
  const [stringDate, setStringDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  let [fontsLoaded] = useFonts({ 
    Righteous_400Regular
  });

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
    <LinearGradient
      colors={["#78d0f5", "white", "#78d0f5"]}
      style={styles.container}
    >
    <View style={styles.container}>
      <KeyboardAwareScrollView>
      <Text style={{fontSize: 50, alignSelf: "center", fontFamily: "Righteous_400Regular"}}> ToothMate </Text>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <Spacer/>
        <Input
          label="First Name"
          value={firstname}
          leftIcon={{ type: "feather", name: "user" }}
          onChangeText={setFirstName}
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.textStyle}
          labelStyle={styles.labelStyle}
        />
        <Input
          label="Last Name"
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
          label="Password"
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

        <Text style={styles.clinicTextStyle}>Date of Birth</Text>
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
        <Spacer />
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
      </KeyboardAwareScrollView>
    </View>
    </LinearGradient>
  );
};

SignupChildScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "",
    headerTintColor: 'black',
    headerBackTitleVisible: false,
    safeAreaInsets: Platform.OS === "ios" ? { top: 45 } : { top: 30 },

    headerStyle: {
      backgroundColor: '#78d0f5',
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    },

    headerLeft: () => (
      <HeaderBackButton tintColor='black' headerBackTitleVisible={false} headerTitle="a" onPress={() => navigation.navigate("AccountFlow")}/>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
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
     marginLeft: 20,
     fontSize: 14,
     color: "black",
     fontWeight: "bold",
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
    fontSize: 16,
  },
  labelStyle: {
    fontSize: 14,
    marginLeft: 18,
    color: "black",
    marginBottom: 3,
    marginTop: 2,
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "#F0F0F0",
  },
  buttonContainer: {
    borderRadius: 20,
    borderColor: "white",
    width: "90%",
    marginLeft: "5%",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold"
  },
});

export default SignupChildScreen;
