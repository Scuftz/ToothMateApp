import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ActivityIndicator, ImageBackground, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import Spinner from "react-native-loading-spinner-overlay";
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
      <ImageBackground
        source={require("../components/t_logo_crop2.png")}
        style={{
          paddingTop: "15%",
          height: Platform.OS == "ios" ? Dimensions.get('window').height * 0.6 : Dimensions.get('window').height * 0.7,
          width: Dimensions.get('window').width,
        }}
      >
      <View style={{flex: 1, marginTop: "5%"}}>
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
      </ImageBackground>
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
    alignSelf: "center",
    fontSize: 50,
    fontFamily: "Righteous_400Regular",
    color: "black",
    marginBottom: "10%"
  },
});

export default UserAccountScreen;
