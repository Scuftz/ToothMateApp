import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Context as ClinicContext } from "../context/ClinicContext";
import { Context as UserContext } from "../context/UserContext";

const PasswordChangeScreen = () => {

    const { changePassword } = useContext(AuthContext);
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
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.textStyle}
                labelStyle={styles.labelStyle}
            />
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
});

export default PasswordChangeScreen;
