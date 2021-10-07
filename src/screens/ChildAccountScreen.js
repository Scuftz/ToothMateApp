import React, { useContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, ActivityIndicator, View } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = ({ navigation }) => {
  const { state, signout, getchildaccounts } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [parent, setParent] = useState(null);
  //const [isFocused, setFocused] = useState(navigation.isFocused());

  const getParent = async () => {
    let parentValue = parent;
    try {
      setLoading(true);
      parentValue = await AsyncStorage.getItem("parentid");
      await getchildaccounts();
    } catch (err) {
      console.log("ERROR");
    } finally {
      setParent(parentValue);
      console.log(state.chilren);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48 }}>AccountScreen</Text>
      <Spacer>
        <Button
          title="Back to Parent Account"
          onPress={async () => {
            navigation.navigate("mainFlow");
            setLoading(true);
            await AsyncStorage.setItem(
              "id",
              await AsyncStorage.getItem("parentid")
            );
            await AsyncStorage.removeItem("parentid");
          }}
        />
        <Button
          title="You"
          onPress={() => navigation.navigate("UserAccount")}
        />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({});

export default AccountScreen;
