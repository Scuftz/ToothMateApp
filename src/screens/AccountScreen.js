import React, { useContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, ActivityIndicator, View } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
    <LinearGradient colors={["#7ad0f5", "white", "#7ad0f5"]} style = {styles.container}>
    <View style={styles.container}>
    <KeyboardAwareScrollView>
    <Spacer/>
    <Spacer/>
    <Spacer/>
    <Spacer/>
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={styles.header}>Your Account</Text>
      <Spacer/>
      <Spacer/>
      <Spacer/>
        <Button 
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title="Sign Out" onPress={signout} 
        titleStyle={styles.titleContainer}
        />
        <Button 
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title="Test?" onPress={() => console.log(state.children)} 
        titleStyle={styles.titleContainer}
        />
        <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title="Sign Up Child Account"
        onPress={() => navigation.navigate("signUpChildFlow")}
        titleStyle={styles.titleContainer}
        />
        <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        title="User"
        onPress={() => navigation.navigate("UserAccount")}
        titleStyle={styles.titleContainer}
        />
      {childButtons()}
    </SafeAreaView>

  </KeyboardAwareScrollView>
  </View>
  </LinearGradient>
  );
};


AccountScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontWeight: "bold",
    color: "black",
  },
  header: {
    flex: 1,
    alignSelf: "center",
    fontSize: 48,
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

export default AccountScreen;
