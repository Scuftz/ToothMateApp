import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AccountContext } from "../context/AccountContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import Caller from "../components/Caller";
import ChildAccountButtons from "../components/ChildAccountButtons";

const AccountScreen = ({ navigation }) => {
  const { state, signout } = useContext(AuthContext);
  let user;
  if (state.token) {
    user = state.token.user;
  }

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48 }}>AccountScreen</Text>
      <Caller />
      <ChildAccountButtons data={user} navigation={navigation} />
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
        <Button title="User" />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({});

export default AccountScreen;
