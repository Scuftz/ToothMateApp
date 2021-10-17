import React, { useContext, useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import { Button } from "react-native-elements";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Caller from "../components/Caller";
import Spacer from "../components/Spacer";
import { Context as UserContext } from "../context/UserContext";
import "intl";
import "intl/locale-data/jsonp/en";
import { LinearGradient } from "expo-linear-gradient";

import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { Raleway_100Thin } from '@expo-google-fonts/raleway';
import { NotoSans_400Regular,  NotoSans_700Bold } from "@expo-google-fonts/noto-sans";
import { SourceSansPro_400Regular, SourceSansPro_700Bold } from "@expo-google-fonts/source-sans-pro";
import { RobotoCondensed_400Regular, RobotoCondensed_700Bold } from "@expo-google-fonts/roboto-condensed"
import { Ubuntu_400Regular, Ubuntu_700Bold } from "@expo-google-fonts/ubuntu";
import { Merriweather_400Regular, Merriweather_700Bold} from "@expo-google-fonts/merriweather";
import { Rubik_400Regular, Rubik_700Bold } from "@expo-google-fonts/rubik";
import { SourceCodePro_400Regular, SourceCodePro_700Bold } from "@expo-google-fonts/source-code-pro";
import { JosefinSans_400Regular, JosefinSans_700Bold } from "@expo-google-fonts/josefin-sans";
import { YanoneKaffeesatz_400Regular, YanoneKaffeesatz_700Bold } from "@expo-google-fonts/yanone-kaffeesatz";
import { VarelaRound_400Regular } from "@expo-google-fonts/varela-round";
import { Kanit_400Regular, Kanit_700Bold } from "@expo-google-fonts/kanit";
import { ArchitectsDaughter_400Regular } from "@expo-google-fonts/architects-daughter";
import { IndieFlower_400Regular } from "@expo-google-fonts/indie-flower";
import { BalsamiqSans_400Regular, BalsamiqSans_700Bold } from "@expo-google-fonts/balsamiq-sans";
import { PermanentMarker_400Regular } from "@expo-google-fonts/permanent-marker";
import { Domine_400Regular, Domine_700Bold } from "@expo-google-fonts/domine";
import { Righteous_400Regular } from "@expo-google-fonts/righteous";
import { FredokaOne_400Regular } from "@expo-google-fonts/fredoka-one";
import { CreteRound_400Regular } from "@expo-google-fonts/crete-round";
import { Courgette_400Regular } from "@expo-google-fonts/courgette";
import { Alegreya_400Regular, Alegreya_700Bold } from "@expo-google-fonts/alegreya";
import { KaushanScript_400Regular } from "@expo-google-fonts/kaushan-script";
import { ArchivoBlack_400Regular } from "@expo-google-fonts/archivo-black";
import { Kalam_400Regular, Kalam_700Bold } from "@expo-google-fonts/kalam";
import { Merienda_400Regular, Merienda_700Bold } from "@expo-google-fonts/merienda";
import { AsapCondensed_400Regular, AsapCondensed_700Bold } from "@expo-google-fonts/asap-condensed";
import {Yantramanav_400Regular, Yantramanav_700Bold } from "@expo-google-fonts/yantramanav";
import { PathwayGothicOne_400Regular } from "@expo-google-fonts/pathway-gothic-one";
import { GloriaHallelujah_400Regular} from "@expo-google-fonts/gloria-hallelujah";
import { Handlee_400Regular} from "@expo-google-fonts/handlee";
import { BenchNine_400Regular, BenchNine_700Bold } from "@expo-google-fonts/benchnine";
import { ElMessiri_400Regular, ElMessiri_700Bold } from "@expo-google-fonts/el-messiri";
import { HammersmithOne_400Regular} from "@expo-google-fonts/hammersmith-one";
import { ArimaMadurai_400Regular, ArimaMadurai_700Bold} from "@expo-google-fonts/arima-madurai";
import { CarterOne_400Regular } from "@expo-google-fonts/carter-one";

const ClinicScreen = ({ navigation }) => {

  const {
    state: { appointments, clinic },
    getEmailAndAppointments,
    getDentalClinic,
  } = useContext(UserContext);

  let [fontsLoaded] = useFonts({ 
    SourceSansPro_700Bold, SourceSansPro_400Regular,
    NotoSans_400Regular, NotoSans_700Bold, SourceCodePro_400Regular, SourceCodePro_700Bold,
    RobotoCondensed_400Regular, RobotoCondensed_700Bold, Ubuntu_400Regular, Ubuntu_700Bold,
    Merriweather_400Regular, Merriweather_700Bold, Rubik_400Regular, Rubik_700Bold,
    JosefinSans_400Regular, JosefinSans_700Bold, YanoneKaffeesatz_400Regular, YanoneKaffeesatz_700Bold,
    VarelaRound_400Regular, Kanit_400Regular, Kanit_700Bold, ArchitectsDaughter_400Regular, IndieFlower_400Regular,
    BalsamiqSans_700Bold, BalsamiqSans_400Regular, PermanentMarker_400Regular, Domine_700Bold, Domine_400Regular,
    FredokaOne_400Regular, Righteous_400Regular, CreteRound_400Regular, Courgette_400Regular,
    Alegreya_400Regular, Alegreya_700Bold, KaushanScript_400Regular, ArchivoBlack_400Regular,
    Kalam_400Regular, Kalam_700Bold, Merienda_400Regular, Merienda_700Bold, AsapCondensed_400Regular,
    AsapCondensed_700Bold, Yantramanav_700Bold, Yantramanav_400Regular, PathwayGothicOne_400Regular,
    GloriaHallelujah_400Regular, Handlee_400Regular, BenchNine_400Regular, BenchNine_700Bold,
    ElMessiri_400Regular, ElMessiri_700Bold, HammersmithOne_400Regular, ArimaMadurai_700Bold, ArimaMadurai_400Regular, CarterOne_400Regular
});

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

  if (clinic === null || !fontsLoaded) {
    return (
      <AppLoading/>
      // <LinearGradient
      // colors={["#78d0f5", "white", "#78d0f5"]}
      // style={styles.container}>
      // <View style = {styles.container}>
      //           <Text style = {styles.titleTextStyle}> Loading... </Text>
      // </View>
      // </LinearGradient>
    );
  } else {
    return (
    <LinearGradient
      colors={["#78d0f5", "white", "#78d0f5"]}
      style={styles.container}>
      <View>
        <View style = {styles.insideContainer}>
        <Text style = {styles.titleTextStyle}>{clinic.name}</Text>

        <View style={styles.caller}>
          <Caller
            phone={clinic.phone}
            email={clinic.email}
            url={clinic.bookingURL}
          />
        </View>

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

        <Text style = {styles.appointmentTextStyle}>Your appointments</Text>
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

// ClinicScreen.navigationOptions = {
//   title: "Clinic",
// };

ClinicScreen.navigationOptions = () => {
  return {
    title: "",
    tabBarIcon: <MaterialCommunityIcons name="toothbrush-paste" size={25} />,
    headerTintColor: 'black',
    safeAreaInsets: Platform.OS === "ios" ? { top: 45 } : { top: 10 },

    headerStyle: {
      backgroundColor: '#78d0f5',//78d0f5
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,    
    }
  };
};

const styles = StyleSheet.create({
  caller: {
    marginLeft: "-1.5%",
    marginRight: "-1.5%",
    marginBottom: "4%",
  },
  titleTextStyle: {
    fontSize: 28,
    marginLeft: "1.5%",
    marginBottom: 5,
    alignSelf: "center",
    // fontFamily: "Rubik_400Regular",
    // fontFamily: "VarelaRound_400Regular",
    fontFamily: "Righteous_400Regular", //GOOD
    // fontFamily: "CarterOne_400Regular", //good
  },
  appointmentTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "1.5%",
    marginBottom: 10,
  },
  topicStyle: {
    borderColor: "grey", //grey
    // borderBottomWidth: 5, //5
    justifyContent: "flex-end",
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 7
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
  },
  insideContainer:{
    marginLeft: "1.5%",
    marginRight: "1.5%",
  },
  buttonContainer: {
    borderRadius: 20,
    width: "90%",
    marginLeft: "5%",
    // borderWidth: 1,
    // borderBottomWidth: 5,
    // borderColor: "black"
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "#F0F0F0", //00b3ff  005a80 //dfe4e8
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold"
  },
});

export default ClinicScreen;
