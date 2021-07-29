import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { Entypo } from "@expo/vector-icons";

const EducationScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48 }}>EducationScreen</Text>
    </SafeAreaView>
  );
};

EducationScreen.navigationOptions = {
  title: "Education",
  tabBarIcon: <Entypo name="open-book" size={25} />,
};

const styles = StyleSheet.create({});

export default EducationScreen;
