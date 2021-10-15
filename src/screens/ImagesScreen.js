import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppointmentImage from "../components/AppointmentImage";
import { LinearGradient } from "expo-linear-gradient";

const ImagesScreen = ({ navigation }) => {
    const base64image = navigation.getParam("img");

  return (
    <LinearGradient colors={["white", "#7ad0f5", "white"]} style = {styles.container}>
    <ScrollView>
      <View style={styles.container}>
        <AppointmentImage base64={base64image} />
      </View>
    </ScrollView>
    </LinearGradient>
  );
};

ImagesScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Images",
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: "#00BAFF",
    },
    cardStyle: {
      backgroundColor: "white",
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

export default ImagesScreen;
