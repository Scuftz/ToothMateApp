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
        <Button title="Invoice" onPress={() => navigation.navigate("invoice", { pdf: base64pdf })}/>
        <Spacer />
        <Button title="Images" onPress={() => navigation.navigate("images", { img: base64image })}/>
      </View>
    </ScrollView>
  );
};

AppointmentScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Your Appointment",
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
    fontSize: 16,
  },
  scroll: {
    marginTop: 15,
    marginBottom: 5,
  },
});

export default AppointmentScreen;
