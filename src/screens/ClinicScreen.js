import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-native-elements";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Caller from "../components/Caller";
import Spacer from "../components/Spacer";
import { Context as UserContext } from "../context/UserContext";
import "intl";
import "intl/locale-data/jsonp/en";
import { LinearGradient } from "expo-linear-gradient";


const ClinicScreen = ({ navigation }) => {
  const {
    state: { appointments, clinic },
    getEmailAndAppointments,
    getDentalClinic,
  } = useContext(UserContext);

  useEffect(() => {
    getEmailAndAppointments();
    getDentalClinic();

    const listener = navigation.addListener("didFocus", () => {
      getEmailAndAppointments();
    });
    return () => {
      listener.remove();
    };
  }, []);

  function convertDate(mongoDate) {
    let date = new Date(mongoDate);
    let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
    let month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
    let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

    let stringDate = `${day} ${month} ${year}`;
    return stringDate;
  }

  if (clinic === null) {
    return (
      <LinearGradient
      colors={["#f54284", "white", "#f54284"]}
      style={styles.container}>
      <View style = {styles.container}>
                <Text style = {styles.titleTextStyle}> Loading... </Text>
      </View>
      </LinearGradient>
    );
  } else {
    return (
    <LinearGradient
      colors={["#f54284", "white", "#f54284"]}
      style={styles.container}>
      <View style={styles.container}>
        <View style = {styles.insideContainer}>
        <Text style = {styles.titleTextStyle}>{clinic.name}</Text>

        <Caller
          phone={clinic.phone}
          email={clinic.email}
          url={clinic.bookingURL}
        />
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonText}
          title="View Your Dental Chart"
          onPress={() =>
            navigation.navigate("chart", { appointments: appointments })
          }
        />
        <Spacer />

        <Text style = {styles.titleTextStyle}>Your appointments</Text>
        <FlatList
          data={appointments}
          keyExtractor={(appointment) => appointment._id}
          renderItem={(item) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("appointment", { appointment: item.item })
                }
              >
                <View style={styles.topicStyle}>
                  <Text style={styles.topicText}>
                    {convertDate(item.item.date)}
                  </Text>
                  <MaterialIcons name="keyboard-arrow-right" size={30} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
        </View>
      </View>
      </LinearGradient>
    );
  }
};

ClinicScreen.navigationOptions = {
  title: "Clinic",
  tabBarIcon: <MaterialCommunityIcons name="toothbrush-paste" size={25} />,
};

ClinicScreen.navigationOptions = () => {
  return {
    title: "Clinic",
    // headerShown: false,
    headerTitle: "",
    headerTintColor: 'black',
 
    headerStyle: {
      backgroundColor: '#f54284',
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,    
    }
  };
};

const styles = StyleSheet.create({
  caller: {
    marginTop: 0,
  },
  topicStyle: {
    borderColor: "grey",
    borderBottomWidth: 5,
    justifyContent: "flex-end",
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 20,


  },
  topicText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    //marginLeft: 2,
    //marginRight: 2

  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "white",
    width: "90%",
    marginLeft: "5%",
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "lightgreen",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold"
  },
  titleTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 4

  },
  insideContainer:{
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 4,
    marginRight: 4


  }
});

export default ClinicScreen;
