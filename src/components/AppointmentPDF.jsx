import React from 'react';
import PDFReader from 'rn-pdf-reader-js';
import { View, Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pdfStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const AppointmentPDF = props => {
  const { base64 } = props;

  return (
    <View>
      <PDFReader
        source={{
          base64: `data:application/pdf;base64,${base64}`,
        }}
        style={styles.pdfStyle}
      />
    </View>
  );
};

export default AppointmentPDF;
