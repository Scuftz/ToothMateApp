import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
    const { state, signup } = useContext(AuthContext);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>Sign Up for ToothMate</Text>
            </Spacer>
            <Spacer/>
            <Input label="First Name" value={firstname} onChangeText={setFirstName} autoCapitalize="none" autoCorrect={false} />
            <Input label="Last Name" value={lastname} onChangeText={setLastName} autoCapitalize="none" autoCorrect={false} />
            <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" autoCorrect={false} />
            <Input label="Mobile" value={mobile} onChangeText={setMobile} autoCapitalize="none" autoCorrect={false} />
            <Input label="Password" value={password} onChangeText={setPassword} autoCapitalize="none" autoCorrect={false} secureTextEntry />
            {state.errorMessage ? <Text style={styles.errorMessage}>{ state.errorMessage }</Text> : null}
            <Spacer>
                <Button title="Sign Up" onPress={() => signup({firstname, lastname, email, mobile, password})}/>
            </Spacer>
            <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                <Spacer>
                    <Text style={styles.link}>Already have an account? Sign in instead</Text>
                </Spacer>
            </TouchableOpacity>
        </View>
    );
};

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 30
    },
    errorMessage: {
        fontSize: 16,
        color: "red",
        marginLeft: 15
    },
    link: {
        color: "blue",
    }
});

export default SignupScreen;