import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AccountContext } from "../context/AccountContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import Caller from "../components/Caller";
import Spinner from "react-native-loading-spinner-overlay";
import { navigate } from "../navigationRef";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Righteous_400Regular } from "@expo-google-fonts/righteous";


const UserAccountScreen = ({ navigation }) => {
  const { getUser, getDentalClinic } = useContext(UserContext);
  const { clearErrorMessage } = useContext(AuthContext);
  const [spinner, setSpinner] = useState(false);

  let [fontsLoaded] = useFonts({ 
    Righteous_400Regular
  });


  useEffect(() => {
    clearErrorMessage();
    const listener = navigation.addListener("didFocus", () => {
      setSpinner(false);
      clearErrorMessage();
    });
    return () => {
      listener.remove();
    };
  }, []);

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
      <View style={{flex: 1}}>
      <Spinner visible={spinner} textContent={"Loading..."} animation="fade" />
      <Text style={styles.header}>ToothMate</Text>
      <Image source={require("../components/t_logo1.png")} style={{width: 300, height: 300, alignSelf: "center"}} />
      <View style={{flex: 4, marginTop: "2%"}}>
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          title="Update Your Details"
          titleStyle={styles.titleContainer}
          onPress={async () => {
            setSpinner(true);
            await getUser();
            navigation.navigate("User");
            setSpinner(false)
          }}
        />
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          title="Change Clinic"
          titleStyle={styles.titleContainer}
          onPress={async () => {
            setSpinner(true);
            await getDentalClinic();
            navigation.navigate("UpdateClinic");
            setSpinner(false)
          }}
        />
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          title="Change Your Password"
          titleStyle={styles.titleContainer}
          onPress={() => {
            navigation.navigate("Password");
          }}
        />
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          title="Disconnect From Parent"
          titleStyle={styles.titleContainer}
          onPress={() => {
            navigation.push("DisconnectChild");
          }}
        />
      </View>
      </View>
    </LinearGradient>
  );
};

UserAccountScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "",
    headerBackTitleVisible: false,

    headerTintColor: 'black',
    safeAreaInsets: Platform.OS === "ios" ? { top: 45 } : { top: 30 },
    
    headerStyle: {
      backgroundColor: '#78d0f5',
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontWeight: "bold",
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
  header: {
    flex: 1,
    alignSelf: "center",
    fontSize: 48,
    fontFamily: "Righteous_400Regular",
    color: "black",
  },
});

export default UserAccountScreen;
