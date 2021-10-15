import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AccountContext } from "../context/AccountContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import Caller from "../components/Caller";
import Spinner from "react-native-loading-spinner-overlay";
import { navigate } from "../navigationRef";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";

const UserAccountScreen = ({ navigation }) => {
  const { getUser, getDentalClinic } = useContext(UserContext);
  const { clearErrorMessage } = useContext(AuthContext);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    clearErrorMessage();
    const listener = navigation.addListener("didFocus", () => {
      setSpinner(false);
      clearErrorMessage();
    });
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <LinearGradient colors={["#7ad0f5", "white", "#7ad0f5"]} style = {styles.container}>
    <Spacer/>
    <Spacer/>
    <Spacer/>
    <Spacer/>
    <Spacer/>
    <Spacer/>
    <Spacer/>
    <Spacer/>
      <Spinner visible={spinner} textContent={"Loading..."} animation="fade" />
      <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title="User"
        titleStyle={styles.titleContainer}
        onPress={async () => {
          setSpinner(true);
          await getUser();
          navigation.navigate("User");
          setSpinner(false)
        }}
      />
      <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title="Clinic"
        titleStyle={styles.titleContainer}
        onPress={async () => {
          setSpinner(true);
          await getDentalClinic();
          navigation.navigate("UpdateClinic");
          setSpinner(false)
        }}
      />
      <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title="Change Your Password"
        titleStyle={styles.titleContainer}
        onPress={() => {
          navigation.navigate("Password");
        }}
      />
      <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title="Disconnect From Parent"
        titleStyle={styles.titleContainer}
        onPress={() => {
          navigation.push("DisconnectChild");
        }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontWeight: "bold",
    color: "black", 
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "black",
    width: "80%",
    marginLeft: "11%",
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "white",
  },
  titleContainer: {
    color: "black",
  },
});

export default UserAccountScreen;
