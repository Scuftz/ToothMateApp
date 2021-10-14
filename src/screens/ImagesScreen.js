import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppointmentImage from "../components/AppointmentImage";

const ImagesScreen = ({ navigation }) => {
    const base64image = navigation.getParam("img");

  return (
    <ScrollView>
      <View style={styles.container}>
        <AppointmentImage base64={base64image} />
      </View>
    </ScrollView>
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
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

export default ImagesScreen;
