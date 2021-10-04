import React, { useContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, ActivityIndicator, View } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserContext } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DisconnectChildScreen = ({ navigation }) => {
  const { state, canDisconnect, disconnectChild } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [parent, setParent] = useState(null);
  const [dob, setDOB] = useState(null);

  const checkDisconnect = async () => {
    try {
      await canDisconnect();
    } finally {
      console.log(state);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkDisconnect();
    console.log(state);
  }, []);

  if (loading) {
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

  if (state.canDisconnect) {
    return (
      <View>
        <Text>Are you sure you want to do this?</Text>
        <Button
          title="Continue"
          onPress={async () => {
            disconnectChild();
            const parentid = await AsyncStorage.getItem("parentid");
            if (parentid) {
              await AsyncStorage.setItem("id", parentid);
              navigation.navigate("mainFlow");
            } else {
              navigation.popToTop();
            }
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>You cannot disconnect</Text>
    </View>
  );
};

DisconnectChildScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({});

export default DisconnectChildScreen;
