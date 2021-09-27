<<<<<<< HEAD
<<<<<<< HEAD
import React, { useContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, ActivityIndicator, View } from "react-native";
=======
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
>>>>>>> ea8f0a034098f46e1a71757ab25b457a705a7de3
=======
import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
>>>>>>> parent of c71b04f (Merge branch 'childaccountview')
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AccountContext } from "../context/AccountContext";
import { Context as AuthContext } from "../context/AuthContext";
<<<<<<< HEAD
<<<<<<< HEAD
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = ({ navigation }) => {
  const { state, signout, getchildaccounts } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [parent, setParent] = useState(null);
  const [isFocused, setFocused] = useState(navigation.isFocused());

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
=======
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
>>>>>>> ea8f0a034098f46e1a71757ab25b457a705a7de3
=======
import { Ionicons } from "@expo/vector-icons";
import Caller from "../components/Caller";
import ChildAccountButtons from "../components/ChildAccountButtons";

const AccountScreen = ({ navigation }) => {
  const { state, signout } = useContext(AuthContext);
>>>>>>> parent of c71b04f (Merge branch 'childaccountview')

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Spinner  
          visible={spinner}
          textContent={'loading...'}
          animation="fade"
      />
      
      <Text style={{ fontSize: 48 }}>AccountScreen</Text>
<<<<<<< HEAD
<<<<<<< HEAD
=======
      <ChildAccountButtons navigation={navigation} />
>>>>>>> parent of c71b04f (Merge branch 'childaccountview')
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
        <Button title="User" />
      </Spacer>
<<<<<<< HEAD
      {childButtons()}
=======
      <ChildAccountButtons navigation={navigation} />
      <Button title="You" onPress={()=> navigation.navigate("UserAccount")} />
      <Button title="Sign Out" onPress={signout} />
>>>>>>> ea8f0a034098f46e1a71757ab25b457a705a7de3
=======
>>>>>>> parent of c71b04f (Merge branch 'childaccountview')
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({});

export default AccountScreen;
