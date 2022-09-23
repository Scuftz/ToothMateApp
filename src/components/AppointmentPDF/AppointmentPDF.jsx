import React from 'react';
import PDFReader from 'rn-pdf-reader-js';
import { View } from 'react-native';
import styles from './styles';

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
