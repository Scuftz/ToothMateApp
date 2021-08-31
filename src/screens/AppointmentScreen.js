import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import Spacer from "../components/Spacer";

const AppointmentScreen = ({ navigation }) => {
  const appointment = navigation.getParam("appointment");
  console.log("appointment: " + appointment.dentalData);

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
          <Text style={styles.headingFont}>Date</Text>
        </View>
        <Text style={styles.title}>{convertDate(appointment.date)}</Text>
        <Spacer />

        <Button title="Invoice" />
        <Spacer />
        <Button title="X-Rays" />
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
