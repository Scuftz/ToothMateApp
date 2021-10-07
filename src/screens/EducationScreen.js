import React, { useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as UserContext } from '../context/UserContext';
import { Context as EducationContext } from '../context/EducationContext';
import { FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";


const EducationScreen = ({ navigation }) => {
    const { state, getEducationRange } = useContext(EducationContext);

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
      colors={["#f54284", "white", "#f54284"]}
      style={styles.screenStyle}>
        <View style={styles.screenStyle}>
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
        title: "Education",
        headerStyle: {
            backgroundColor: '#f54284',
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
        borderRadius: 11,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 2

    },
    //Topic Text Styling
    topicText: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
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
