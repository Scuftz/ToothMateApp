import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChildAccountButtons = () => {
  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.titleViewStyle}>
        <Text style={styles.textStyle}>Other Accounts</Text>
      </View>
      <View style={styles.buttonViewStyle}>
        <Button title="Other Accounts" />
        <Button title="Create Account" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#F0EEEE",
  },
  titleViewStyle: {
    backgroundColor: "#F0EEEE",
    height: 30,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonViewStyle: {
    backgroundColor: "#F0EEEE",
    height: 50,
    flexDirection: "row",
    alignSelf: "stretch",
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-around",
  },
  textStyle: {
    fontSize: 18,
    alignSelf: "center",
  },
});

export default ChildAccountButtons;
