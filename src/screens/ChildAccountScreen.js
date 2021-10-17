import React, { useContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, Image, ActivityIndicator, View } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Righteous_400Regular } from "@expo-google-fonts/righteous";


const AccountScreen = ({ navigation }) => {
  const { state, signout, getchildaccounts } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [parent, setParent] = useState(null);
  //const [isFocused, setFocused] = useState(navigation.isFocused());

  let [fontsLoaded] = useFonts({ 
    Righteous_400Regular
  });

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

  if (!fontsLoaded) {
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
    <SafeAreaView style={{flex: 1}}>
      {/* <Text style={{ fontSize: 48 }}>AccountScreen</Text> */}
      <Text style={styles.header}>ToothMate</Text>
      <Image source={require("../components/t_logo1.png")} style={{width: 300, height: 300, alignSelf: "center"}} />

      <View style={{flex: 1, marginTop: "10%"}}>
        <Button
          buttonStyle={styles.backButton}
          containerStyle={styles.backButtonContainer}
          titleStyle={styles.backTitleContainer}
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
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.titleContainer}
          title="Update Account Details"
          onPress={() => navigation.navigate("UserAccount")}
        />
      </View>
    </SafeAreaView>
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
    alignSelf: "center",
    fontSize: 48,
    fontFamily: "Righteous_400Regular",
    color: "black",
  },
  buttonContainer: {
    borderRadius: 20,
    width: "80%",
    marginBottom: 15,
    alignSelf: "center"
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "#F0F0F0",
  },
  titleContainer: {
    color: "#000",
    fontWeight: "bold"
  },
  backButton: {
    paddingVertical: 10,
    backgroundColor: "#F0f0f0",
    borderColor: "#000",
    // borderWidth: 2,
    borderRadius: 20,
    width: "80%",
    marginBottom: 30,
    alignSelf: "center",
    // borderWidth: 2
  },
  backButtonContainer: {
  },
  backTitleContainer: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default AccountScreen;
