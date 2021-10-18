import React, { useContext, useEffect } from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { Context as EducationContext } from '../context/EducationContext';
import { FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { VarelaRound_400Regular } from "@expo-google-fonts/varela-round";
import { useFonts, Righteous_400Regular } from "@expo-google-fonts/righteous";

const EducationScreen = ({ navigation }) => {
    const { state, getEducationRange } = useContext(EducationContext);

    let [fontsLoaded] = useFonts({ 
        Righteous_400Regular, VarelaRound_400Regular
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
            <View style={{flex: 1, borderWidth: 1}}>
            <Text style={{fontSize: 50, marginTop: "15%", alignSelf: "center", fontFamily: "Righteous_400Regular"}}> ToothMate </Text>
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
        headerShown: false,
        }
    // return {
    //     title: "",
    //     safeAreaInsets: Platform.OS === "ios" ? { top: 45 } : { top: 10 },
    //     headerStyle: {
    //         backgroundColor: '#78d0f5',//78d0f5
    //         borderBottomWidth: 0,
    //         shadowOpacity: 0,
    //         elevation: 0,            
    //     }
    // }
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
        fontFamily: "VarelaRound_400Regular",
    },
    topicText: {
        flex: 1,
        fontSize: 25,
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
