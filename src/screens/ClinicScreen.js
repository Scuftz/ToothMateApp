import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ClinicScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48 }}>ClinicScreen</Text>
    </SafeAreaView>
  );
};

ClinicScreen.navigationOptions = {
  title: "Clinic",
  tabBarIcon: <MaterialCommunityIcons name="toothbrush-paste" size={25} />,
};

const styles = StyleSheet.create({});

export default ClinicScreen;
