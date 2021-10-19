import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Text, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ClinicContext } from "../context/ClinicContext";
import { Context as UserContext } from "../context/UserContext";
import SearchableDropdown from "react-native-searchable-dropdown";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Righteous_400Regular } from "@expo-google-fonts/righteous";

const UpdateClinicScreen = ({ navigation }) => {
  const { state, updateUserClinic } = useContext(AuthContext);
  const cc = useContext(ClinicContext);
  const uc = useContext(UserContext);

  const [clinic, setClinic] = useState({ id: uc.state.clinic._id, name: uc.state.clinic.name });

  let [fontsLoaded] = useFonts({ 
    Righteous_400Regular
  });

  useEffect(() => {
    cc.getClinicNames();
  }, []);
  const items = cc.state;

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
    style={styles.container}>
    <View style={styles.container}>
      <Text style={{fontSize: 50, alignSelf: "center", color: "#000", fontFamily: "Righteous_400Regular"}}> ToothMate </Text>
      <Image source={require("../components/t_logo1.png")} style={{width: 200, height: 200, alignSelf: "center"}} />
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
            paddingLeft: 15,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 20,
            backgroundColor: "white",
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
        placeholderTextColor="#888"

        containerStyle={styles.dropdownContainer}
        itemStyle={{
          padding: 8,
          marginTop: 3,
          backgroundColor: "white",
          borderColor: "#bbb",
          borderWidth: 3,
          borderRadius: 20,
        }}
        itemTextStyle={{ color: "#222" , marginLeft: 2, fontSize: 15, fontWeight: "bold"}}
      />
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonText}
          title="Change Clinic"
          onPress={() => {
            updateUserClinic({ clinic: clinic.id })
          }}
        />
      </Spacer>
    </View>

    </LinearGradient>
  );
};

UpdateClinicScreen.navigationOptions = () => {
  return {
    title: "",
    headerBackTitleVisible: false,

    headerTintColor: 'black',
    safeAreaInsets: Platform.OS === "ios" ? { top: 45 } : { top: 30 },
    
    headerStyle: {
      backgroundColor: '#78d0f5',
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
    fontSize: 17,
    color: "black",
    fontWeight: "bold",
    paddingTop: 10,
    alignSelf: "center"
  },
  buttonContainer: {
    borderRadius: 20,
    borderColor: "white",
    width: "90%",
    marginLeft: "5%",
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "#F0F0F0",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold"
  },
});

export default UpdateClinicScreen;
