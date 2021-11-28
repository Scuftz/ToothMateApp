import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import AppointmentImage from "../components/AppointmentImage";
import { LinearGradient } from "expo-linear-gradient";

const AllImagesScreen = ({ navigation }) => {
  const images = navigation.getParam("images");
  const preFilterBase64images = images.map((image) => {
    return Buffer.from(image.img.data.data).toString("base64");
  });
  const base64images = preFilterBase64images.filter((image) => image);
  const [currentImage, setCurrentImage] = useState(base64images[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageCount, setImageCount] = useState(base64images.length);

  useEffect(() => {
    console.log(base64images);
    setCurrentImage(base64images[currentImageIndex]);
  }, [currentImageIndex]);

  const handleNextImage = () => {
    if (currentImageIndex === imageCount - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(imageCount - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#78d0f5", "#fff", "#78d0f5"]}
        style={styles.container}>
        <ScrollView>
          <View style={styles.containerImage}>
            <AppointmentImage
              base64={currentImage}
              key={currentImageIndex}
              onPress={handleNextImage}
              onLongPress={handlePreviousImage}
            />
          </View>
        </ScrollView>
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
