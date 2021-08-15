import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ClinicContext } from "../context/ClinicContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";

const ClinicScreen = () => {
  const { signout } = useContext(AuthContext);
  const { state, searchClinics, getAllClinics } = useContext(ClinicContext)

  useEffect(() => {
    //console.log(state);
    getAllClinics()
  }, [])

  const [ search, setSearch ] = useState('');
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48 }}>ClinicScreen</Text>
      <TextInput 
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search" 
        value={search} 
        onChangeText={term => setSearch(term)}
      />
      <Button title="Search" onPress={() => searchClinics(search)} />
      <FlatList 
                    data={state}
                    keyExtractor={(clinic) => clinic._id}
                    renderItem = {(item) => {
                        return (
                            <View>
                                <Text>{item.item.name}</Text>
                            </View>
                        );
                    }}
                />
    </SafeAreaView>
  );
};

ClinicScreen.navigationOptions = {
  title: "Clinic",
  tabBarIcon: <MaterialCommunityIcons name="toothbrush-paste" size={25} />,
};

const styles = StyleSheet.create({});

export default ClinicScreen;
