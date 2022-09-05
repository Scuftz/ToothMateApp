import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imgStyle: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 400,
    height: 300,
  },
});

const AppointmentImage = props => {
  const { base64 } = props;

  return <Image style={styles.imgStyle} source={{ uri: `data:image/png;base64,${base64}` }} />;
};

export default AppointmentImage;
