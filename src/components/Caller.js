import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// Component for calling and texting
const Caller = () => {
  return (
    <View style={styles.backgroundStyle}>
      {/* TouchableOpacity for Linking which opens phone calling application */}
      <TouchableOpacity onPress={() => Linking.openURL(`tel:0211106874`)}>
        <View>
          <Ionicons name="call" style={styles.iconStyle} />
          <Text style={styles.textStyle}>Call</Text>
        </View>
      </TouchableOpacity>
      {/* TouchableOpacity for Linking which opens phone email application */}
      <TouchableOpacity
        onPress={() => Linking.openURL(`mailto:qtn0334@autuni.ac.nz`)}>
        <View>
          <MaterialIcons name="email" style={styles.iconStyle} />
          <Text style={styles.textStyle}>Email</Text>
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
