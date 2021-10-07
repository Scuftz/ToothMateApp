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

InvoiceScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Invoice",
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
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

export default InvoiceScreen;
