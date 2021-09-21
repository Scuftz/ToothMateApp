import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";

const AccountScreen = ({ navigation }) => {
  const { state, signout, getchildaccounts } = useContext(AuthContext);
  //const [isReady, setIsReady] = useState(false);
  const [parent, setParent] = useState(null);
  const [spinner, setSpinner] = useState(true);

  const getParent = async () => {
    let parentValue = parent;
    try {
      parentValue = await AsyncStorage.getItem("parentid");
      await getchildaccounts();
    } catch (err) {
      console.log("ERROR");
    } finally {
      setParent(parentValue);
      //setIsReady(true);
      setSpinner(false);
      console.log(state.chilren);
    }
  };

  useEffect(() => {
    if (navigation.isFocused()) {
      getParent();
    }
  }, []);

  /*if (!isReady) {
    return <Spinner visible={spinner} animation="fade" />;
  }*/

  const childButtons = () => {
    const buttons = [];
    state.children
      ? state.children.map((element, key) => {
          console.log(element.firstname);
          buttons.push(
            <Button
              key={key}
              title={element.firstname}
              onPress={async () => {
                await AsyncStorage.setItem(
                  "parentid",
                  await AsyncStorage.getItem("id")
                );
                await AsyncStorage.setItem("id", element._id);
                navigation.push("Account" /*, { goBack: onNavigateBack }*/);
                //setIsReady(false);
              }}
            />
          );
        })
      : null;
    return buttons;
  };

  /*onNavigateBack = async () => {
    //setIsReady(false);
    setSpinner(true);
    await getchildaccounts();
    setSpinner(false);
    //setIsReady(true);
  };*/

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Spinner visible={spinner} animation="fade" />
      <Text style={{ fontSize: 48 }}>AccountScreen</Text>
      <Spacer>
        {parent == null ? (
          <Button title="Sign Out" onPress={signout} />
        ) : (
          <Button
            title="Back to Parent Account"
            onPress={async () => {
              await AsyncStorage.setItem(
                "id",
                await AsyncStorage.getItem("parentid")
              );
              await AsyncStorage.removeItem("parentid");
              //navigation.state.params.goBack();
              //onNavigateBack();
              navigation.pop();
            }}
          />
        )}
        <Button title="test" onPress={() => console.log(state.children)} />
      </Spacer>
      {childButtons()}
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({});

export default AccountScreen;
