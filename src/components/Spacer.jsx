import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  spacer: {
    margin: 15,
  },
});

const Spacer = props => {
  const { children } = props;

  return <View style={styles.spacer}>{children}</View>;
};

export default Spacer;
