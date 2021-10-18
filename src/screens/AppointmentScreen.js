import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import Spacer from "../components/Spacer";

global.Buffer = global.Buffer || require('buffer').Buffer

const AppointmentScreen = ({ navigation }) => {
  const appointment = navigation.getParam("appointment");
  const base64image = Buffer.from(appointment.imgs[0].img.data.data).toString("base64");
  // console.log("B64: " + base64image);
  const base64pdf = Buffer.from(appointment.pdfs[0].pdf.data.data).toString("base64");
  // console.log("B64pdf: " + base64pdf)

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

        <View style={styles.heading}>
          <Text style={styles.headingFont}>Appointment Date</Text>
        </View>
        <Text style={styles.title}>{convertDate(appointment.date)}</Text>

        <Spacer />
        <Button 
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonText}
          title="Invoice" 
          onPress={() => navigation.navigate("invoice", { pdf: base64pdf })}/>
        <Spacer />
        <Button 
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonText}
          title="Images" onPress={() => navigation.navigate("images", { img: base64image })}/>
        <Spacer />

        <View style={styles.heading}>
          <Text style={styles.headingFont}>Dentist's Notes</Text>
        </View>
        <Text style={styles.title}>{appointment.notes}</Text>

      </View>
    </ScrollView>
  );
};

AppointmentScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Your Appointment",
    headerTintColor: 'black',
    headerBackTitleVisible: false,
    safeAreaInsets: Platform.OS === "ios" ? { top: 45 } : { top: 30 },

    headerStyle: {
      backgroundColor: '#78d0f5',
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    }
  };
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get("screen").width,
    height: 400,
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
    fontSize: 25,
    fontWeight: "bold"
  },
  scroll: {
    marginTop: 15,
    marginBottom: 5,
  },
  buttonContainer: {
    borderRadius: 20,
    borderColor: "white",
    width: "90%",
    marginLeft: "5%",
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "#78d0f5",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold"
  },
});

export default AppointmentScreen;
