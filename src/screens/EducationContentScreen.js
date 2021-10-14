import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context } from '../context/EducationContext';
import { LinearGradient } from 'expo-linear-gradient';

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


const EducationContentScreen = ({navigation}) => {
    const { state } = useContext(Context)
    
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

    const content = state.find((content) => content._id === navigation.getParam('id'));

    return (
        <LinearGradient
            colors={["#f54284", "white", "#f54284"]}
            style={styles.container}>
        <View style={styles.container}>
            <View style = {{backgroundColor: 'white'}}>
            <Text style={styles.title}>{content.topic}</Text>
            </View>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.contentStyle}>{content.content}</Text>
            </ScrollView>
        </View>

    </LinearGradient>
    );
};

EducationContentScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Education",
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        headerStyle: {
            backgroundColor: '#78d0f5',
            height: 100,
        },
        cardStyle: {
            backgroundColor: 'white'
        }
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: 'black',
        paddingLeft: 10,

    },
    contentStyle: {
        fontSize: 18,
        paddingLeft: 14,
        paddingRight: 5,
        // fontFamily: "NotoSans_400Regular",
        // fontFamily: "SourceSansPro_400Regular",
        // fontFamily: "RobotoCondensed_400Regular",
        // fontFamily: "Ubuntu_400Regular",
        // fontFamily: "Merriweather_400Regular",
        fontFamily: "Rubik_400Regular",
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
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    scroll: {
        //marginTop: 15,
        //marginBottom: 5,
        backgroundColor: 'white'
        
    }
});

export default EducationContentScreen;