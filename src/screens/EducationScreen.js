import React, { useContext, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as UserContext } from '../context/UserContext';
import { Context as EducationContext } from '../context/EducationContext';
import { FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { VarelaRound_400Regular } from "@expo-google-fonts/varela-round";
import { CarterOne_400Regular } from "@expo-google-fonts/carter-one";
import { useFonts, Righteous_400Regular } from "@expo-google-fonts/righteous";

const EducationScreen = ({ navigation }) => {
    const { state, getEducationRange } = useContext(EducationContext);

    let [fontsLoaded] = useFonts({ 
        Righteous_400Regular, CarterOne_400Regular, VarelaRound_400Regular
    });

    useEffect(() => {
        //when the screen is opened get all the education contents
        
        getEducationRange();
        const listener = navigation.addListener('didFocus', () => {            
        getEducationRange();
        });
        return () => {
            listener.remove();
        };
    }, []);


    if (!fontsLoaded) {
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
    else {
        return (
            <LinearGradient
                colors={["#78d0f5", "white", "#78d0f5"]}
                style={styles.screenStyle}>
            <View style={styles.screenStyle}>
            <Text style={{fontSize: 50, alignSelf: "center", fontFamily: "Righteous_400Regular"}}> ToothMate </Text>
                <Text style = {styles.titleTextStyle}>Education Library</Text>
                <FlatList
                    data={state}
                    keyExtractor={(education) => education._id}
                    renderItem={(item) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('content', { id: item.item._id })}>
                                <View style={styles.topicStyle}>
                                    <Text style={styles.topicText}>{item.item.topic}</Text>
                                    <MaterialIcons name="keyboard-arrow-right" size={30} />
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
            </LinearGradient>
        );
    }
};

EducationScreen.navigationOptions = () => {
    return {
        title: "",
        safeAreaInsets: Platform.OS === "ios" ? { top: 45 } : { top: 10 },
        headerStyle: {
            backgroundColor: '#78d0f5',
            borderBottomWidth: 0,
            shadowOpacity: 0,
            elevation: 0,            
        }
    }
}

const styles = StyleSheet.create({
    //Topic Style
    topicStyle: {
        borderColor: 'grey', //#10334d
        // borderBottomWidth: 6, //9
        borderRadius: 11, //11 initial value
        justifyContent: 'flex-end',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 2,
        marginBottom: 1,
    },
    titleTextStyle: {
        fontSize: 24,
        marginLeft: "1.5%",
        marginBottom: 20,
        marginTop: 20,
        alignSelf: "center",
        // fontFamily: "CarterOne_400Regular", //good
        // fontFamily: "Righteous_400Regular",
        // fontFamily: "FredokaOne_400Regular",
        fontFamily: "VarelaRound_400Regular",
        // fontFamily: "NotoSans_400Regular",
    },
    topicText: {
        flex: 1,
        fontSize: 25,
        // fontWeight: 'bold',
        // fontFamily: "NotoSans_400Regular",
        // fontFamily: "SourceSansPro_400Regular",
        // fontFamily: "RobotoCondensed_400Regular",
        // fontFamily: "Ubuntu_400Regular",
        // fontFamily: "Merriweather_400Regular",
        // fontFamily: "Rubik_400Regular",
        // fontFamily: "SourceCodePro_400Regular",
        // fontFamily: "JosefinSans_400Regular",
        // fontFamily: "YanoneKaffeesatz_400Regular",
        // fontFamily: "VarelaRound_400Regular",
        // fontFamily: "Kanit_400Regular", //OK
        // fontFamily: "ArchitectsDaughter_400Regular",
        // fontFamily: "IndieFlower_400Regular",
        // fontFamily: "BalsamiqSans_400Regular",
        // fontFamily: "PermanentMarker_400Regular",
        // fontFamily: "Domine_400Regular",
        // fontFamily: "FredokaOne_400Regular",
        // fontFamily: "Righteous_400Regular", //GOOD
        // fontFamily: "Courgette_400Regular",
        // fontFamily: "Alegreya_400Regular",
        // fontFamily: "KaushanScript_400Regular",
        // fontFamily: "ArchivoBlack_400Regular", //OK
        // fontFamily: "Kalam_400Regular", //GOOD
        // fontFamily: "Merienda_400Regular", //GOOD
        // fontFamily: "AsapCondensed_400Regular",
        // fontFamily: "Yantramanav_400Regular",
        // fontFamily: "PathwayGothicOne_400Regular",
        // fontFamily: "GloriaHallelujah_400Regular",
        // fontFamily: "Handlee_400Regular", //OK
        // fontFamily: "BenchNine_400Regular",
        // fontFamily: "ElMessiri_400Regular", //OK
        // fontFamily: "HammersmithOne_400Regular", //GOOD
        // fontFamily: "ArimaMadurai_400Regular", //OK
        // fontFamily: "CarterOne_400Regular", //good
        alignSelf: 'flex-start',
        marginLeft: 15,
    },
    //Screen Styling
    screenStyle: {
        flex: 1,
        //padding: 1,
        justifyContent: "center",

    }
});

export default EducationScreen;
