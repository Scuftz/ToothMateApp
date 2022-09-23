import React from 'react';
import { View, ScrollView, Platform } from 'react-native';
import AppointmentPDF from '../../components/AppointmentPDF';
import styles from './styles';

const InvoiceScreen = props => {
  const { navigation } = props;

  const base64pdf = navigation.getParam('pdf');

  return (
    <ScrollView>
      <View style={styles.container}>
        <AppointmentPDF base64={base64pdf} />
      </View>
    </ScrollView>
  );
};

// Header Options
InvoiceScreen.navigationOptions = () => {
  return {
    title: 'Invoice',
    headerTintColor: 'black',
    headerBackTitleVisible: false,
    safeAreaInsets: Platform.OS === 'ios' ? { top: 45 } : { top: 30 },
    headerStyle: {
      backgroundColor: '#78d0f5',
    },
    cardStyle: {
      backgroundColor: 'white',
    },
  };
};

export default InvoiceScreen;
