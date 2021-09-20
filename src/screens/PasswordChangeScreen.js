import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Context as ClinicContext } from "../context/ClinicContext";
import { Context as UserContext } from "../context/UserContext";

const PasswordChangeScreen = ({ navigation }) => {

    const { state, changePassword } = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');



    return (
        <KeyboardAwareScrollView>
            <Input 
                label="Current Password"
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
                    title="Change Password"
                    onPress={() => {
                        changePassword({oldPassword, newPassword})
                       
                    }}
                /> 
            </Spacer>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    inputContainerStyle: {
        height: 30,
        marginBottom: 0,
    },
    textStyle: {
        fontSize: 16,
    },
        labelStyle: {
        fontSize: 14,
    },
    errorMessage: {
        fontSize: 16,
        color: "red",
        marginLeft: 15,
      },
});

export default PasswordChangeScreen;
