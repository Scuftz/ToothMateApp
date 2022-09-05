import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 15,
    backgroundColor: '#F0EEEE',
    height: 70,
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconStyle: {
    fontSize: 30,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
  textStyle: {
    alignSelf: 'center',
  },
});

// Component for calling and texting
const Caller = props => {
  const { phone, email, url } = props;

  const phoneLink = `tel:${phone}`;
  const emailLink = `mailto:${email}`;

  return (
    <View style={styles.backgroundStyle}>
      {/* TouchableOpacity for Linking which opens phone calling application */}
      <TouchableOpacity onPress={() => Linking.openURL(phoneLink)}>
        <View>
          <Ionicons name="call" style={styles.iconStyle} />
          <Text style={styles.textStyle}>Call</Text>
        </View>
      </TouchableOpacity>
      {/* TouchableOpacity for Linking which opens phone email application */}
      <TouchableOpacity onPress={() => Linking.openURL(emailLink)}>
        <View>
          <MaterialIcons name="email" style={styles.iconStyle} />
          <Text style={styles.textStyle}>Email</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          const supported = Linking.canOpenURL(url);
          if (supported) {
            await Linking.openURL(url);
          }
        }}
      >
        <View>
          <MaterialIcons name="book-online" style={styles.iconStyle} />
          <Text style={styles.textStyle}>Book Online</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Caller;
