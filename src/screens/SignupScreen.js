import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';

const SignupScreen = ({ navigation }) => {
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
            <Spacer>
                <Button title="Sign Up" />
            </Spacer>
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
    }
});

export default SignupScreen;