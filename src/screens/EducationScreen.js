import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '../navigationRef';
import { NavigationActions } from 'react-navigation';

const EducationScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.navigate('content')}>
                <View style={styles.topicStyle}>
                    <Text style={styles.topicText}>Teeth</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    topicStyle: {
        margin: 10,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
    },
    topicText: {
        fontSize: 20
    }
});

export default EducationScreen;