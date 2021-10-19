import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppointmentPDF from "../components/AppointmentPDF";

const InvoiceScreen = ({ navigation }) => {
    const base64pdf = navigation.getParam("pdf");

  return (
    <ScrollView>
      <View style={styles.container}>
        <AppointmentPDF base64={base64pdf} />
      </View>
    </ScrollView>
  );
};

//Header Options
InvoiceScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Invoice",
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

//StyleSheet
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

export default InvoiceScreen;
