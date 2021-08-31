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
  const [cc, setCC] = useState(null);
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
         * DONE: Convert information into checkbox components
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
    // allChartEntries.viewList();
    setCC(allChartEntries);
    // console.log(allChartEntries.allEntries[0]);
  }, []);

  function convertDate(mongoDate) {
    let date = new Date(mongoDate);
    let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
    let month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
    let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

    let stringDate = `${day} ${month} ${year}`;
    return stringDate;
  }

  if (cc === null) {
    return (
      <View>
        <Text> Loading... </Text>
      </View>
    );
  } else {
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

          {(() => {
            let checkBox = [];
            checkBox = cc.allEntries.map((tooth) => (
              <CheckBox
                key={tooth.id}
                containerStyle={{
                  position: "absolute",
                  top: tooth.top,
                  right: tooth.right,
                }}
                uncheckedIcon="circle-o"
                uncheckedColor="#00ff0000"
                onPress={() => Alert.alert(tooth.name)}
              ></CheckBox>
            ));
            return <>{checkBox}</>;
          })()}
        </View>
      </ScrollView>
    );
  }
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

//   console.log("C: " + counter);

//   return (
//     <>
//       <CheckBox
//         containerStyle={{
//           position: "absolute",
//           top: "66%",
//           right: "66%",
//         }}
// checkedIcon="dot-circle-o"
// uncheckedIcon="circle-o"
// checkedColor="#ff0000"
// onPress={() => Alert.alert("a")}
//       />
//     </>
//   );

export default DentalChartScreen;
