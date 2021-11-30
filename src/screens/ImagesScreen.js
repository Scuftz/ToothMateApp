import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import AppointmentImage from "../components/AppointmentImage";
import { LinearGradient } from "expo-linear-gradient";
import ImageZoom from "react-native-image-pan-zoom";

const ImagesScreen = ({ navigation }) => {
  const index = navigation.getParam("imageIndex");
  const base64images = navigation.getParam("images");
  const [currentImageIndex, setCurrentImageIndex] = useState(
    index != null ? index : 0
  );
  const [currentImage, setCurrentImage] = useState(
    base64images[currentImageIndex]
  );

  console.log(index);
  console.log(currentImageIndex);

  const nextImage = () => {
    if (currentImageIndex < base64images.length - 1) {
      setCurrentImage(base64images[currentImageIndex + 1]);
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImage(base64images[currentImageIndex - 1]);
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const buttons = () => {
    if (base64images.length > 1) {
      return (
        <View style={styles.buttonViewStyle}>
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            title={"Previous"}
            onPress={() => previousImage()}
          />
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            title={"Next"}
            onPress={() => nextImage()}
          />
        </View>
      );
    }
  };

  return (
    <LinearGradient
      colors={["#78d0f5", "#fff", "#78d0f5"]}
      style={styles.container}>
      <ScrollView>
        <View style={styles.containerImage}>
          <ImageZoom
            cropWidth={Dimensions.get("window").width}
            cropHeight={500}
            imageWidth={400}
            imageHeight={300}>
            <AppointmentImage key={currentImageIndex} base64={currentImage} />
          </ImageZoom>
          {buttons()}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

//Header Options
ImagesScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Images",
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
    marginTop: "25%",
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

export default ImagesScreen;
