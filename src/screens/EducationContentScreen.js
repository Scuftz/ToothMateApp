import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context } from '../context/EducationContext';

const EducationContentScreen = ({navigation}) => {
    const { state } = useContext(Context)
    
    const content = state.find((content) => content._id === navigation.getParam('id'));

    return (
            <View style={styles.container}>
                <Text style={styles.title}>{content.topic}</Text>
                <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                    <Text style={styles.contentStyle}>{content.content}</Text>
                </ScrollView>
            </View>
    );
};

EducationContentScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Education",
        headerStyle: {
            backgroundColor: '#00BAFF'
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
    },
    contentStyle: {
        fontSize: 18,
    },
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
        flex: 1
    },
    scroll: {
        marginTop: 15,
        marginBottom: 5
    }
});

export default EducationContentScreen;