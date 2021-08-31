import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import ChartInstanceClass from "../components/ChartInstanceClass";
import ChartEntryList from "../components/ChartEntryList";
import Spacer from "../components/Spacer";

const DentalChartScreen = ({ navigation }) => {
  const appointments = navigation.getParam("appointments");
  const allChartEntries = new ChartEntryList();
  // console.log("appointments: " + appointments);
  // console.log("test: " + appointments[0].dentalData);

  function initChartEntry() {
    allChartEntries.initList();
  }

  function getAllDentalData() {
    appointments.forEach((app) => {
      console.log("App Date: " + convertDate(app.date));
      app.dentalData.forEach((element) => {
        let index = parseInt(element.substring(3, 5)) - 1; // - 1 to align index starting at 0
        let testString = element.substring(5) + " " + convertDate(app.date);
        allChartEntries.updateValue(index, testString);

        //TODO:
        /**
         * DONE: Initialise all ChartEntry
         * DONE: While reading array, use add() method to add value to values array
         * Convert information into checkbox components
         * Display checkbox components
         *
         * 1) Read in each entry, read numeric value
         * 2) Based on entry, add to right component's own array
         * 3) Component shows
         */
      });
      console.log("Appointment Finished");
    });
  }

  useEffect(() => {
    initChartEntry();
    getAllDentalData();
    allChartEntries.viewList();
  }, []);

  function convertDate(mongoDate) {
    let date = new Date(mongoDate);
    let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
    let month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
    let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

    let stringDate = `${day} ${month} ${year}`;
    return stringDate;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.headingFont}>
            Click on any tooth to see you dental history!
          </Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../components/dental_mouth.png")}
        />
        <CheckBox
          containerStyle={{
            position: "absolute",
            top: "50.5%",
            right: "71%",
          }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="#ff0000"
          onPress={() => Alert.alert("one Incisor")}
        />
        <CheckBox
          containerStyle={{
            position: "absolute",
            top: "55.5%",
            right: "71%",
          }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="#ff0000"
          onPress={() => Alert.alert("Central Incisor")}
        />
      </View>
    </ScrollView>
  );
};

DentalChartScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Your Dental Chart",
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
    marginHorizontal: 20,
    marginVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get("screen").width,
    height: 500,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  heading: {
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  title: {
    fontSize: 22,
    borderColor: "black",
    paddingTop: 5,
  },
  headingFont: {
    fontSize: 16,
  },
  scroll: {
    marginTop: 15,
    marginBottom: 5,
  },
});

export default DentalChartScreen;
