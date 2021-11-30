import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";
import { Righteous_400Regular } from "@expo-google-fonts/righteous";
import { CarterOne_400Regular } from "@expo-google-fonts/carter-one";

const AccountScreen = ({ navigation }) => {
  const { state, signout, getchildaccounts } = useContext(AuthContext);
  const { getUser, getDentalClinic } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [parent, setParent] = useState(null);
  const [isFocused, setFocused] = useState(navigation.isFocused());

  let [fontsLoaded] = useFonts({
    Righteous_400Regular,
    CarterOne_400Regular,
    VarelaRound_400Regular,
  });

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

  //Child Account Buttons that appear on Screen
  const childButtons = () => {
    const buttons = [];
    state.children
      ? state.children.map((element, key) => {
          buttons.push(
            <Button
              key={key}
              title={element.firstname}
              buttonStyle={styles.childButtonStyle}
              titleStyle={styles.childTextStyle}
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

  if (loading || !fontsLoaded) {
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
    <LinearGradient
      colors={["#7ad0f5", "white", "#7ad0f5"]}
      style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>ToothMate</Text>
        <ImageBackground
          source={require("../components/t_logo_crop2.png")}
          style={{
            paddingTop: "15%",
            height:
              Platform.OS == "ios"
                ? Dimensions.get("window").height * 0.3
                : Dimensions.get("window").height * 0.4,
            width: Dimensions.get("window").width * 0.6,
            alignSelf: "center",
          }}>
          <View
            style={{
              flex: 1,
              marginTop: "2%",
              width: Dimensions.get("window").width,
              marginLeft: "-34%",
            }}>
            <Button
              buttonStyle={styles.button}
              title="Settings"
              onPress={() => navigation.navigate("UserAccount")}
              titleStyle={styles.titleContainer}
            />
            <Button
              buttonStyle={styles.button}
              title="Sign Up A Child/Elderly Account"
              onPress={() => navigation.navigate("signUpChildFlow")}
              titleStyle={styles.titleContainer}
            />
          </View>
        </ImageBackground>

        <View style={{ flex: 3, borderBottomWidth: 3, marginTop: "0%" }}>
          <Text style={styles.yourAccountStyle}>Your Accounts</Text>
          <ScrollView style={{ marginBottom: 10 }}>{childButtons()}</ScrollView>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button
            buttonStyle={styles.signOutButton}
            containerStyle={styles.signOutContainer}
            title="Sign Out"
            onPress={signout}
            titleStyle={styles.signOutTextStyle}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

//Header Options
AccountScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

//StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontWeight: "bold",
    color: "black",
  },
  header: {
    fontSize: 50,
    marginTop: "15%",
    alignSelf: "center",
    fontFamily: "Righteous_400Regular",
  },
  button: {
    width: "80%",
    paddingVertical: 10,
    backgroundColor: "#F0F0F0", //#346185
    marginBottom: 15,
    alignSelf: "center",
    borderRadius: 20,
    borderColor: "#000",
  },
  titleContainer: {
    color: "#000",
    fontWeight: "bold",
  },
  signOutContainer: {
    borderRadius: 20,
    width: "80%",
    alignSelf: "center",
  },
  signOutButton: {
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderColor: "#346185",
  },
  signOutTextStyle: {
    color: "#000",
    fontWeight: "bold",
  },
  childButtonStyle: {
    paddingVertical: 10,
    width: "80%",
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: "#F0F0F0",
    borderColor: "#346185",
  },
  childTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "#000",
  },
  yourAccountStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "#000",
    fontWeight: "bold",
    marginBottom: "3%",
    marginTop: "6%",
  },
});

export default AccountScreen;
