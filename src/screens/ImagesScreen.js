import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppointmentImage from "../components/AppointmentImage";
import { LinearGradient } from "expo-linear-gradient";

const ImagesScreen = ({ navigation }) => {
    const base64image = navigation.getParam("img");

  return (
    <LinearGradient colors={["#78d0f5", "#fff", "#78d0f5"]} style = {styles.container}>
    <ScrollView>
      <View style={styles.containerImage}>
        <AppointmentImage base64={base64image} />
      </View>
    </ScrollView>
    </LinearGradient>
  );
};

ImagesScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Images",
    headerTintColor: 'black',
    headerBackTitleVisible: false,
    safeAreaInsets: Platform.OS === "ios" ? { top: 45 } : { top: 30 },

    headerStyle: {
      backgroundColor: "#78d0f5",
    },
    cardStyle: {
      backgroundColor: "white",
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImage: {
    flex: 1,
    marginTop: "50%"
  }
});

export default ImagesScreen;
