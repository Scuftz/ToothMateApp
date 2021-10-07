import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context } from '../context/EducationContext';
import { LinearGradient } from 'expo-linear-gradient';

const EducationContentScreen = ({navigation}) => {
    const { state } = useContext(Context)
    
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
        title: "",
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        headerStyle: {
            backgroundColor: '#f54284'
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
        paddingRight: 5
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