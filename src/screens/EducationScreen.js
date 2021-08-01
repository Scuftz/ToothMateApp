import React, { useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context } from '../context/EducationContext';
import { FlatList } from 'react-native';

const EducationScreen = ({ navigation }) => {

    const { state, getEducationContent } = useContext(Context)
    
    useEffect(() => {
        getEducationContent();
        const listener = navigation.addListener('didFocus', () => {
            getEducationContent();
        });
        return () => {
            listener.remove();
        };
    }, []);


    return (
        <SafeAreaView>
                <FlatList 
                    data={state}
                    keyExtractor={(education) => education._id}
                    renderItem = {(item) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('content', {id: item.item._id})}>
                            <View style={styles.topicStyle}>
                                <Text style={styles.topicText}>{item.item.topic}</Text>
                            </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                
            
            {state.error ? <Text>{state.error}</Text> : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    topicStyle: {
        margin: 10,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
    },
    topicText: {
        fontSize: 20
    }
});

export default EducationScreen;
