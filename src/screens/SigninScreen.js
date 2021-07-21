import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SigninScreen = ({ navigation }) => {
    const { state, signin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>Sign In</Text>
            </Spacer>
            <Spacer/>
                <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" autoCorrect={false} />
                <Input label="Password" value={password} onChangeText={setPassword} autoCapitalize="none" autoCorrect={false} secureTextEntry />
                {state.errorMessage ? <Text style={styles.errorMessage}>{ state.errorMessage }</Text> : null}
            <Spacer>
                <Button title="Sign In" onPress={() => signin({ email, password })}/>
            </Spacer>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Spacer>
                    <Text style={styles.link}>Don't have an account? Sign up instead</Text>
                </Spacer>
            </TouchableOpacity>
        </View>
    );
};

SigninScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 200
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

export default SigninScreen;