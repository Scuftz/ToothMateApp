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

  /*useEffect(() => {
    setLoading(true);
    getParent();
    const didBlur = () => {
      setFocused(false);
    };
    const didFocus = () => {
      setFocused(true);
    };

    const blurSubscription = navigation.addListener("didBlur", didBlur);
    const focusSubscription = navigation.addListener("didFocus", didFocus);

    return () => {
      blurSubscription.remove();
      focusSubscription.remove();
    };
  }, [isFocused]);*/

  /*const childButtons = () => {
    const buttons = [];
    state.children
      ? state.children.map((element, key) => {
          console.log(element.firstname);
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
                navigation.push("Account");
              }}
            />
          );
        })
      : null;
    return buttons;
  };*/

  /*if (loading) {
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
  }*/

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
        <Button title="test" onPress={() => console.log(state.children)} />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({});

export default AccountScreen;
