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
import ChildAccountButtons from "../components/ChildAccountButtons";
import Spinner from "react-native-loading-spinner-overlay";

const AccountScreen = ({ navigation }) => {
  const { state, signout } = useContext(AuthContext);
  const { getUser, getDentalClinic } = useContext(UserContext)
  const [ spinner, setSpinner ] = useState(false)

  useEffect(() => {
    const listener = navigation.addListener("didFocus", () => {
      setSpinner(false)
    });
    return () => {
      listener.remove();
    }
  }, [])

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Spinner  
          visible={spinner}
          textContent={'loading...'}
          animation="fade"
      />
      <Text style={{ fontSize: 48 }}>AccountScreen</Text>
      <ChildAccountButtons navigation={navigation} />
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
        <Button title="User" onPress={async () => {
          setSpinner(true)
          await getUser();
          navigation.navigate("User")
          }} />
        <Button title="Clinic" onPress={async () => {
          setSpinner(true)
          await getDentalClinic();
          navigation.navigate("UpdateClinic")
          }} />
        <Button title="Change Your Password" onPress={() => {
          navigation.navigate("Password")
          }} />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({});

export default AccountScreen;
