import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationEvents } from "react-navigation";
import { Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as userContext } from "../context/UserContext";
import { Context as authContext } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Righteous_400Regular } from "@expo-google-fonts/righteous";



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

  let [fontsLoaded] = useFonts({ 
    Righteous_400Regular
  });

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
      <Text style={{fontSize: 50, alignSelf: "center", fontFamily: "Righteous_400Regular", marginBottom: "2%", marginTop: "5%"}}> ToothMate </Text>
        <NavigationEvents />
        <Spacer/>
        <Input
          label="First Name"
          value={firstname}
          onChangeText={setFirstName}
          autoCapitalize="none"
          leftIcon={{ type: "feather", name: "user" }}
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
          leftIcon={{ type: "feather", name: "user" }}
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
          leftIcon={{ type: "material-icons", name: "email" }}
          autoCorrect={false}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.textStyle}
          labelStyle={styles.labelStyle}
        />
        {/* <Input
          label="Mobile"
          value={mobile}
          onChangeText={setMobile}
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.textStyle}
          labelStyle={styles.labelStyle}
        /> */}
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
        {authState.errorMessage ? (
          <Text style={styles.errorMessage}>{authState.errorMessage}</Text>
        ) : null}
        <Spacer>
          <Button
            title="Update Details"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonText}   
            onPress={() => {
              updateUser({ firstname, lastname, email, mobile, dob });
            }}
          />
        </Spacer>
      </KeyboardAwareScrollView>
    </View>
    </LinearGradient>
  );
};

UserScreen.navigationOptions = ({ navigation }) => {
  return {
      title: "",
      headerTintColor: 'black',
      safeAreaInsets: Platform.OS === "ios" ? { top: 45 } : { top: 30 },
      headerBackTitleVisible: false,
  
      headerStyle: {
        backgroundColor: '#78d0f5',
        borderBottomWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
      },
      cardStyle: {
        backgroundColor: "white",
      },
  };    
}


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

export default UserScreen;
