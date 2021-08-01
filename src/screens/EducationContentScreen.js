import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context } from '../context/EducationContext';

const EducationContentScreen = ({navigation}) => {
    const { state } = useContext(Context)
    
    const content = state.find((content) => content._id === navigation.getParam('id'));

    return (
            <View style={styles.container}>
                <Text style={styles.title}>{content.topic}</Text>
                <Text>{content.content}</Text>
            </View>
    );
};

const styles = StyleSheet.create({
    title:{
        fontSize: 30,
        fontWeight: 'bold'
    },
    contentStyle: {
        fontSize: 18
    },
    container: {
        margin: 20
    }
});

export default EducationContentScreen;