import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Caller = () => {
  return (
    <View style={styles.backgroundStyle}>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:0211106874`)}>
        <View>
          <Ionicons name="call" style={styles.iconStyle} />
          <Text style={styles.textStyle}>Call</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL(`sms:0211106874`)}>
        <View>
          <Entypo name="message" style={styles.iconStyle} />
          <Text style={styles.textStyle}>Text Message</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 15,
    backgroundColor: "#F0EEEE",
    height: 70,
    // borderRadius: 5,
    // marginHorizontal: 15,
    flexDirection: "row",
    alignSelf: "stretch",
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-around",
  },
  iconStyle: {
    fontSize: 30,
    alignSelf: "center",
    marginHorizontal: 15,
  },
  textStyle: {
    alignSelf: "center",
  },
});

export default Caller;
