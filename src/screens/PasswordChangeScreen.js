import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Context as ClinicContext } from "../context/ClinicContext";
import { Context as UserContext } from "../context/UserContext";
import { LinearGradient } from "expo-linear-gradient";


const PasswordChangeScreen = ({ navigation }) => {

    const { state, changePassword } = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    return (
        <LinearGradient
        colors={["#78d0f5", "white", "#78d0f5"]}
        style={styles.container}>
    <View style={styles.container}>

        <KeyboardAwareScrollView>
            <Input 
                label="Current Password"
                leftIcon={{ type: "fontawesome5", name: "lock" }}
                value={oldPassword}
                onChangeText={setOldPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.textStyle}
                labelStyle={styles.labelStyle}
            />
            <Input 
                label="New Password"
                leftIcon={{ type: "fontawesome5", name: "lock" }}
                value={newPassword}
                onChangeText={setNewPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.textStyle}
                labelStyle={styles.labelStyle}
            />
            {state.errorMessage ? (
                <Text style={styles.errorMessage}>{state.errorMessage}</Text>
            ) : null}
            <Spacer>
                    <Button
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    title="Change Password"
                    titleStyle={styles.buttonText}
                    onPress={() => {
                        changePassword({oldPassword, newPassword})
                       
                    }}
                /> 
            </Spacer>
        </KeyboardAwareScrollView>
</View>
        </LinearGradient>
    );
};

PasswordChangeScreen.navigationOptions = () => {
    return {
      // headerShown: false,
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
        justifyContent: "center",
    
      },
    inputContainerStyle: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#dedede",
        width: "95%",
        paddingLeft: 15,
        backgroundColor: "#ebebeb",
        marginLeft: "2.25%",
    },
    textStyle: {
        fontSize: 16,
    },
    labelStyle: {
        fontSize: 14,
        marginLeft: 18,
        color: "black",
        marginBottom: 3,
        marginTop: 2,
    },
    errorMessage: {
        fontSize: 16,
        color: "red",
        marginLeft: 15,
      },
      buttonContainer: {
        //borderWidth: 1,
        borderRadius: 20,
        borderColor: "white",
        width: "90%",
        marginLeft: "5%",
      },
      button: {
        paddingVertical: 10,
        backgroundColor: "#10334d",
      },
      buttonText: {
        color: "white",
        fontWeight: "bold"
      },
});

export default PasswordChangeScreen;
