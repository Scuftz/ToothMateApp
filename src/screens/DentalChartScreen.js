import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { CheckBox } from "react-native-elements";
import ChartInstanceClass from "../components/ChartInstanceClass";
import ChartEntryList from "../components/ChartEntryList";
import Spacer from "../components/Spacer";

const DentalChartScreen = ({ navigation }) => {
  const appointments = navigation.getParam("appointments");
  const allChartEntries = new ChartEntryList();
  const [chart, setChart] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [toothName, setToothName] = useState("");
  const [toothCodes, setToothCodes] = useState("");

  function toothTappedAlert(name, codes) {
    setToothName(name);
    setToothCodes(codes);
    setModalVisible(!modalVisible);
  }

  function getAllDentalData() {
    appointments.forEach((app) => {
      //for each appointment
      app.dentalData.forEach((element) => {
        //for each dental treatment in appointment
        //index number of tooth from dental data
        let index = parseInt(element.substring(3, 5)) - 1; // - 1 to align index starting at 0
        //converting code to full dental treatment name
        let code = "";
        switch (element.substring(5)) {
          case "VNR":
            code = "Veneer";
            break;
          case "FIL":
            code = "Filling";
            break;
          case "BRK":
            code = "Broken Tooth";
            break;
          case "RTC":
            code = "Root Canal";
            break;
          case "EXT":
            code = "Tooth Extraction";
            break;
          case "CRW":
            code = "Dental Crown";
            break;
          case "BND":
            code = "Dental Bonding";
            break;
          case "SEA":
            code = "Dental Sealant";
            break;
          default:
            //if not found, use dental code
            code = element.substring(5);
            break;
        }
        let codeDateString = code + " " + convertDate(app.date);
        allChartEntries.updateValue(index, codeDateString);
      });
    });
  }

  useEffect(() => {
    allChartEntries.initList(); //initialise checkbox's for dental chart
    getAllDentalData(); //grab, convert, and store dental data in checkbox's
    setChart(allChartEntries); //once data is all set, now store and display dental chart
  }, []);

  function convertDate(mongoDate) {
    let date = new Date(mongoDate);
    let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
    let month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(
      date
    );
    let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

    let stringDate = `${day}/${month}/${year}`;
    return stringDate;
  }

  if (chart === null) {
    //if still gathering user data, display loading while data loads
    return (
      <View>
        <Text> Loading... </Text>
      </View>
    );
  } else {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View>
          <Text style={styles.headingFont}>
            Tap on any tooth to see you dental history!
          </Text>
        </View>
        <Spacer />
        <View style={styles.imageContainer}>
          <Image //Dental Chart Image
            style={styles.image}
            source={require("../components/dental_mouth.png")}
          />

          <View style={styles.centeredView}>
            <Modal //Pop-Up for when user taps on a tooth
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalHeading}>{toothName}</Text>
                  <Text style={styles.modalText}>{toothCodes}</Text>
                  <Pressable
                    onPress={() => setModalVisible(!modalVisible)}
                    style={[styles.button, styles.buttonOpen]}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          {(() => {
            //setting up checkbox's
            let checkBox = [];
            checkBox = chart.allEntries.map((tooth) => (
              <CheckBox
                key={tooth.id}
                containerStyle={{
                  position: "absolute",
                  top: tooth.top,
                  right: tooth.right,
                }}
                uncheckedIcon="circle-o"
                uncheckedColor="#00ff0000"
                onPress={() => toothTappedAlert(tooth.name, tooth.output)}
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
    borderWidth: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    width: 390,
    height: 500,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  headingFont: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalHeading: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default DentalChartScreen;
