import React, { useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as UserContext } from '../context/UserContext';
import { Context as EducationContext } from '../context/EducationContext';
import { FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
    );
};

EducationScreen.navigationOptions = () => {
    return {
        title: "Education",
        headerStyle: {
            backgroundColor: 'lightgreen',
            
        }
    }
}

const styles = StyleSheet.create({
    //Topic Style
    topicStyle: {
        borderColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 10
    },
    //Topic Text Styling
    topicText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 20,
        alignSelf: 'flex-start',
    },
    //Screen Styling
    screenStyle: {
        flex: 1,
        backgroundColor: 'lightgreen',
        padding: 3
    }
});

export default EducationScreen;
