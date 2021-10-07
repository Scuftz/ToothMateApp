import React, { useContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, ActivityIndicator, View } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = ({ navigation }) => {
  const { state, signout, getchildaccounts } = useContext(AuthContext);
  const { getUser, getDentalClinic } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [parent, setParent] = useState(null);
  const [isFocused, setFocused] = useState(navigation.isFocused());

  const getParent = async () => {
    let parentValue = parent;
    try {
      setLoading(true);
      parentValue = await AsyncStorage.getItem("parentid");
      getchildaccounts();
    } catch (err) {
      console.log("ERROR");
    } finally {
      setParent(parentValue);
      setLoading(false);
    }
  };

  useEffect(() => {
    getParent();
    const focusListener = navigation.addListener("didFocus", () => {
      setFocused(true);
    });
    const blurListener = navigation.addListener("didBlur", () => {
      setFocused(false);
    });

    return () => {
      focusListener.remove();
      blurListener.remove();
    };
  }, [isFocused]);

  const childButtons = () => {
    const buttons = [];
    state.children
      ? state.children.map((element, key) => {
          console.log(element.firstname + " HELLO");
          buttons.push(
            <Button
              key={key}
              title={element.firstname}
              onPress={async () => {
                await AsyncStorage.setItem(
                  "parentid",
                  await AsyncStorage.getItem("id")
                );
                await AsyncStorage.setItem("id", element._id);
                navigation.navigate("childFlow");
              }}
            />
          );
        })
      : null;
    return buttons;
  };

  if (loading) {
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
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48 }}>AccountScreen</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
        <Button title="test" onPress={() => console.log(state.children)} />
        <Button
          title="Sign up child"
          onPress={() => navigation.navigate("signUpChildFlow")}
        />
        <Button
          title="You"
          onPress={() => navigation.navigate("UserAccount")}
        />
      </Spacer>
      {childButtons()}
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({});

export default AccountScreen;
