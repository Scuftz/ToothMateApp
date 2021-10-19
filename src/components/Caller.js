import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// Component for calling and texting
const Caller = (props) => {
  const phoneLink = "tel:" + props.phone;
  const emailLink = "mailto:" + props.email;

  return (
    <View style={styles.backgroundStyle}>
      {/* TouchableOpacity for Linking which opens phone calling application */}
      <TouchableOpacity onPress={() => Linking.openURL(phoneLink)}>
        <View>
          <Ionicons name="call" style={styles.iconStyle} />
          <Text style={styles.textStyle}>Call</Text>
        </View>
      </TouchableOpacity>
      {/* TouchableOpacity for Linking which opens phone email application */}
      <TouchableOpacity onPress={() => Linking.openURL(`${emailLink}`)}>
        <View>
          <MaterialIcons name="email" style={styles.iconStyle} />
          <Text style={styles.textStyle}>Email</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Linking.canOpenURL(props.url).then((supported) => {
            if (supported) {
              Linking.openURL(props.url);
            } else {
              console.log(props.url);
            }
          });
        }}
      >
        <View>
          <MaterialIcons name="book-online" style={styles.iconStyle} />
          <Text style={styles.textStyle}>Book Online</Text>
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
