import React, { useContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, ActivityIndicator, View, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

const AccountScreen = ({ navigation }) => {
  const { state, signout, getchildaccounts } = useContext(AuthContext);
  const { getUser, getDentalClinic } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [parent, setParent] = useState(null);
  const [isFocused, setFocused] = useState(navigation.isFocused());

  let [fontsLoaded] = useFonts({ 
    Righteous_400Regular, CarterOne_400Regular, VarelaRound_400Regular
  });

  const getParent = async () => {
    let parentValue = parent;
    try {
      setLoading(true);
      parentValue = await AsyncStorage.getItem("parentid");
      getchildaccounts();
    } catch (err) {
      console.log("ERROR");
    } finally {
      setParent(parentValue);
      setLoading(false);
    }
  };

  useEffect(() => {
    getParent();
    const focusListener = navigation.addListener("didFocus", () => {
      setFocused(true);
    });
    const blurListener = navigation.addListener("didBlur", () => {
      setFocused(false);
    });

    return () => {
      focusListener.remove();
      blurListener.remove();
    };
  }, [isFocused]);

  const childButtons = () => {
    const buttons = [];
    state.children
      ? state.children.map((element, key) => {
          console.log(element.firstname + " HELLO");
          buttons.push(
            <Button
              key={key}
              title={element.firstname}
              buttonStyle={styles.childButtonStyle}
              titleStyle={styles.childTextStyle}
              onPress={async () => {
                await AsyncStorage.setItem(
                  "parentid",
                  await AsyncStorage.getItem("id")
                );
                await AsyncStorage.setItem("id", element._id);
                navigation.navigate("childFlow");
              }}
            />
          );
        })
      : null;
    return buttons;
  };

  if (loading || !fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <LinearGradient colors={["#7ad0f5", "white", "#7ad0f5"]} style = {styles.container}>
    {/* <View style={styles.container}> */}
      {/* <KeyboardAwareScrollView> */}
        <SafeAreaView style={{flex: 1}}>
          <Image source={require("../components/t_logo1.png")} style={{width: 100, height: 100, alignSelf: "center"}} />
          <Text style={styles.header}>ToothMate</Text>
          <View style={{flex: 2, marginTop: "2%"}}>
              {/* <Button 
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              title="Test?" onPress={() => console.log(state.children)} 
              titleStyle={styles.titleContainer}
              /> */}
              <Button
                buttonStyle={styles.button}
                containerStyle={styles.buttonContainer}
                title="Settings"
                onPress={() => navigation.navigate("UserAccount")}
                titleStyle={styles.titleContainer}
              />
              <Button
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              title="Sign Up A Child/Elderly Account"
              onPress={() => navigation.navigate("signUpChildFlow")}
              titleStyle={styles.titleContainer}
              />
              <Spacer/>
          </View>

          <View style={{flex: 3, borderBottomWidth: 3, marginTop: "-10%"}}>
            <Text style={styles.yourAccountStyle}>Your Accounts</Text>
            <ScrollView style={{ marginBottom: 10  }}>
              {childButtons()}
            </ScrollView>
          </View>

          <View style={{flex: 1,  justifyContent: "center"}}>
            <Button 
              buttonStyle={styles.signOutButton}
              containerStyle={styles.signOutContainer}
              title="Sign Out" onPress={signout} 
              titleStyle={styles.signOutTextStyle}
            />
          </View>
        </SafeAreaView>
      {/* </KeyboardAwareScrollView> */}
    {/* </View> */}
  </LinearGradient>
  );
};


AccountScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontWeight: "bold",
    color: "black",
  },
  header: {
    flex: 1,
    alignSelf: "center",
    fontSize: 48,
    fontFamily: "Righteous_400Regular",
    color: "black",
  },
  buttonContainer: {
    borderRadius: 20,
    width: "80%",
    marginBottom: 15,
    alignSelf: "center"
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "#346185",
  },
  signOutContainer: {
    borderRadius: 20,
    width: "80%",
    alignSelf: "center"
  },
  signOutButton: {
    paddingVertical: 10,
    backgroundColor: "#346185",
    borderColor: "#346185",
  },
  signOutTextStyle: {
    color: "#fff",
    fontWeight: "bold"
  },
  titleContainer: {
    color: "#fff",
    fontWeight: "bold"
  },
  childButtonStyle: {
    paddingVertical: 10,
    width: "80%",
    alignSelf: "center",
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#346185",
  },
  childTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "#000"
  },
  yourAccountStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "#000",
    fontWeight: "bold"
  },

});

export default AccountScreen;
