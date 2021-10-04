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
    <Spacer>
      <Spinner visible={spinner} textContent={"loading..."} animation="fade" />
      <Button
        title="User"
        onPress={async () => {
          setSpinner(true);
          await getUser();
          navigation.navigate("User");
        }}
      />
      <Button
        title="Clinic"
        onPress={async () => {
          setSpinner(true);
          await getDentalClinic();
          navigation.navigate("UpdateClinic");
        }}
      />
      <Button
        title="Change Your Password"
        onPress={() => {
          navigation.navigate("Password");
        }}
      />
      <Button
        title="Disconnect from parent"
        onPress={() => {
          navigation.push("DisconnectChild");
        }}
      />
    </Spacer>
  );
};

export default UserAccountScreen;
