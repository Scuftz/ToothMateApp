import React, { useContext } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Context } from '../context/EducationContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, CarterOne_400Regular } from "@expo-google-fonts/carter-one";
import AppLoading from 'expo-app-loading';


const EducationContentScreen = ({navigation}) => {
    const { state } = useContext(Context)
    
    let [fontsLoaded] = useFonts({ 
        CarterOne_400Regular
    });

    const content = state.find((content) => content._id === navigation.getParam('id'));

    if (!fontsLoaded) {
        return (
            <AppLoading />
        )
    } else {
    return (
        <LinearGradient
            colors={["#78d0f5", "white", "#78d0f5"]}
            style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>{content.topic}</Text>
                <Text style={styles.contentStyle}>{content.content}</Text>
            </ScrollView>
        </LinearGradient>
        );
    }
};

EducationContentScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Education",
        headerTintColor: 'black',
        headerBackTitleVisible: false,
        safeAreaInsets: Platform.OS === "ios" ? { top: 45 } : { top: 30 },
    
        headerStyle: {
          backgroundColor: "#78d0f5",
        },
        cardStyle: {
          backgroundColor: "white",
        },
    };    
}

const styles = StyleSheet.create({
    title:{
        fontSize: 30,
        paddingVertical: 10,
        // fontFamily: "CarterOne_400Regular",
        marginBottom: "1.5%",
        textAlign: "center",
        backgroundColor: "#F0F0F0",
        overflow: "hidden",
        color: "#000",
    },
    contentStyle: {
        marginLeft: "1.5%",
        marginRight: "1.5%",
        fontSize: 22,
        paddingLeft: "3%",
        paddingRight: "1%",
        paddingVertical: "2.5%",
        backgroundColor: "#fff",
        marginBottom: "1%",
        borderWidth: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
});

export default EducationContentScreen;