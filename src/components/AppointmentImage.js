import React, { Component, useEffect } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";

const AppointmentImage = ({ base64 }) => {
  const img = base64;

  useEffect(() => {
    console.log("Component: " + img);
  });

  return (
    <Image
      style={styles.imgStyle}
      source={{ uri: "data:image/png;base64," + img }}
    />
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
