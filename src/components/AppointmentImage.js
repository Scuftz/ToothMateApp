import React, { Component, useEffect } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

const AppointmentImage = ({ base64 }) => {
  const img = base64;

  return (
    <ImageZoom
      cropWidth={Dimensions.get("window").width}
      cropHeight={500}
      //cropWidth={Dimensions.get("window").width}
      //cropHeight={Dimensions.get("window").height}
      imageWidth={400}
      imageHeight={300}>
      <Image
        style={styles.imgStyle}
        source={{ uri: "data:image/png;base64," + img }}
      />
    </ImageZoom>
  );
};

const styles = StyleSheet.create({
  imgStyle: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 400,
    height: 300,
  },
});

export default AppointmentImage;
