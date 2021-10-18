import React, { useState, useContext } from "react";
import { View, StyleSheet, ImageBackground, ActivityIndicator, Dimensions, Platform } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Righteous_400Regular } from "@expo-google-fonts/righteous";

const PasswordChangeScreen = ({ navigation }) => {

    const { state, changePassword } = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    let [fontsLoaded] = useFonts({ 
        Righteous_400Regular
      });

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

    return (
        <LinearGradient
            colors={["#78d0f5", "white", "#78d0f5"]}
            style={styles.container}
        >
        <View style={styles.container}>
        <Text style={styles.header}> ToothMate </Text>

        <ImageBackground
            source={require("../components/t_logo_crop2.png")}
            style={{
                paddingTop: "15%",
                height: Platform.OS == "ios" ? Dimensions.get('window').height * 0.6 : Dimensions.get('window').height * 0.7,
                width: Dimensions.get('window').width,
            }}
        >

        <View style={{flex: 1, marginTop: "5%"}}>
            <Input 
                label="Current Password"
                leftIcon={{ type: "fontawesome5", name: "lock" }}
                value={oldPassword}
                onChangeText={setOldPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.textStyle}
                labelStyle={styles.labelStyles}
            />
            <Input 
                label="New Password"
                leftIcon={{ type: "fontawesome5", name: "lock" }}
                value={newPassword}
                onChangeText={setNewPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.textStyle}
                labelStyle={styles.labelStyles}
            />
        </View>
            {state.errorMessage ? (
                <Text style={styles.errorMessage}>{state.errorMessage}</Text>
            ) : null}
        </ImageBackground>


            <Button
                buttonStyle={styles.button}
                containerStyle={styles.buttonContainer}
                title="Change Password"
                titleStyle={styles.buttonText}
                onPress={() => {
                    changePassword({oldPassword, newPassword})
                }}
            /> 
        </View>
        </LinearGradient>
    );
};

PasswordChangeScreen.navigationOptions = () => {
    return {
      headerTitle: "",
      headerTintColor: 'black',
      headerBackTitleVisible: false,
      safeAreaInsets: Platform.OS === "ios" ? { top: 45 } : { top: 30 },
      headerStyle: {
        backgroundColor: '#78d0f5',
        borderBottomWidth: 0,
        shadowOpacity: 0,
        elevation: 0, 
        }
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignSelf: "center",
        fontSize: 48,
        fontFamily: "Righteous_400Regular",
        color: "black",
    },
    textStyle: {
        fontSize: 16,
    },
    inputStyle: {
        paddingVertical: 8,
        padding: 5,
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 20,
        width: "80%",
        marginLeft: "10%",
        borderColor: "#dedede",
        paddingLeft: 13,
        backgroundColor: "#f8f8ff",
    },
    labelStyles: {
        marginLeft: "15%",
        color: "black",
    },
    errorMessage: {
        fontSize: 16,
        color: "red",
        alignSelf: "center",
        justifyContent: "center",
        fontWeight: "bold",
        marginHorizontal: "5%"
    },
    buttonContainer: {
        borderRadius: 20,
        width: "90%",
        alignSelf: "center",
        marginTop: "5%"
    },
    button: {
        paddingVertical: 10,
        backgroundColor: "#F0F0F0",
    },
    buttonText: {
        color: "#000",
        fontWeight: "bold"
    },
});

export default PasswordChangeScreen;
