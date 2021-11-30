import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import AppointmentImage from "../components/AppointmentImage";
import { LinearGradient } from "expo-linear-gradient";

const AllImagesScreen = ({ navigation }) => {
  const images = navigation.getParam("images");
  const preFilterBase64images = images.map((image) => {
    return Buffer.from(image.img.data.data).toString("base64");
  });
  const base64images = preFilterBase64images.filter((image) => image);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#78d0f5", "#fff", "#78d0f5"]}
        style={styles.container}>
        <FlatList
          numColumns={1}
          data={base64images}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("images", {
                  images: base64images,
                  imageIndex: base64images.indexOf(item),
                })
              }>
              <View>
                <AppointmentImage key={item.key} base64={item} />
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </LinearGradient>
    </View>
  );
};

//Header Options
AllImagesScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "All Images",
    headerTintColor: "black",
    headerBackTitleVisible: false,
    safeAreaInsets: Platform.OS === "ios" ? { top: 45 } : { top: 30 },

    headerStyle: {
      backgroundColor: "#78d0f5",
    },
    cardStyle: {
      backgroundColor: "white",
    },
  };
};

//StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImage: {
    flex: 1,
    marginTop: "50%",
  },
  buttonViewStyle: {
    marginTop: 15,
    //backgroundColor: "#F0EEEE",
    height: 70,
    flexDirection: "row",
    alignSelf: "stretch",
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    width: "80%",
    paddingVertical: 10,
    backgroundColor: "#F0F0F0", //#346185
    marginBottom: 15,
    alignSelf: "center",
    borderRadius: 20,
    borderColor: "#000",
  },
  buttonTitle: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default AllImagesScreen;
