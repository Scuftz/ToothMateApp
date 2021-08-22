import React, { useContext, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Context } from "../context/AppointmentContext";

const ClinicScreen = ({ navigation }) => {
  const { state, getAppointmentContent } = useContext(Context);

  useEffect(() => {
    //when the screen is opened get all the appointment contents
    getAppointmentContent();
    const listener = navigation.addListener("didFocus", () => {
      getAppointmentContent();
    });
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View style={styles.screenStyle}>
      <FlatList
        data={state}
        keyExtractor={(appointment) => appointment._id}
        renderItem={(item) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("content", { id: item.item._id })
              }
            >
              <View style={styles.topicStyle}>
                <Text style={styles.topicText}>{item.item.email}</Text>
                <MaterialIcons name="keyboard-arrow-right" size={30} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

ClinicScreen.navigationOptions = {
  title: "Clinic",
  tabBarIcon: <MaterialCommunityIcons name="toothbrush-paste" size={25} />,
};

ClinicScreen.navigationOptions = () => {
  return {
    title: "Clinic",
    headerStyle: {
      backgroundColor: "#00BAFF",
    },
  };
};

const styles = StyleSheet.create({
  topicStyle: {
    borderColor: "black",
    borderBottomWidth: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
  },
  topicText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    alignSelf: "flex-start",
  },
  screenStyle: {
    flex: 1,
    backgroundColor: "#6AC9F1",
  },
});

export default ClinicScreen;
