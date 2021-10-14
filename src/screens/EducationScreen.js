import React, { useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as UserContext } from '../context/UserContext';
import { Context as EducationContext } from '../context/EducationContext';
import { FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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


const EducationScreen = ({ navigation }) => {
    const { state, getEducationRange } = useContext(EducationContext);

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
        //when the screen is opened get all the education contents
        
        getEducationRange();
        const listener = navigation.addListener('didFocus', () => {            
        getEducationRange();
        });
        return () => {
            listener.remove();
        };
    }, []);


    return (
        <LinearGradient
      colors={["#78d0f5", "white", "#78d0f5"]}
      style={styles.screenStyle}>
        <View style={styles.screenStyle}>
            <Text style = {styles.titleTextStyle}>Learn More About Dental Health!</Text>
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
        borderColor: 'grey',
        borderBottomWidth: 9,
        borderRadius: 11, //11 initial value
        justifyContent: 'flex-end',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 2,
    },
    titleTextStyle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: "1.5%",
        marginBottom: 20,
        alignSelf: "center",
    },
    //Topic Text Styling
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
        fontFamily: "CarterOne_400Regular", //good
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
