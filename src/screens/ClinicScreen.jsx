import React, { useContext, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { Button } from 'react-native-elements';
import { View, Text, StyleSheet, TouchableOpacity, Platform, FlatList } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import Caller from '../components/Caller';
import { Context as UserContext } from '../context/UserContext';
import 'intl';
import 'intl/locale-data/jsonp/en';

const styles = StyleSheet.create({
  caller: {
    marginLeft: '-1.5%',
    marginRight: '-1.5%',
    marginBottom: '4%',
  },
  titleTextStyle: {
    fontSize: 28,
    marginLeft: '1.5%',
    marginBottom: 5,
    alignSelf: 'center',
    fontFamily: 'Righteous_400Regular',
  },
  appointmentTextStyle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '1.5%',
    marginBottom: 10,
  },
  topicStyle: {
    borderColor: 'grey',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 7,
  },
  topicText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  insideContainer: {
    marginLeft: '1.5%',
    marginRight: '1.5%',
  },
  buttonContainer: {
    borderRadius: 20,
    width: '90%',
    marginLeft: '5%',
  },
  button: {
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

const ClinicScreen = props => {
  const { navigation } = props;

  const {
    state: { appointments, clinic, images },
    getAllImages,
    getNhiAndAppointments,
    getDentalClinic,
  } = useContext(UserContext);

  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
  });

  useEffect(() => {
    getNhiAndAppointments();
    getDentalClinic();
    getAllImages();

    const listener = navigation.addListener('didFocus', () => {
      getNhiAndAppointments();
    });
    return () => {
      listener.remove();
    };
  }, []);

  // Convert Date from Database to Format Used in App
  function convertDate(mongoDate) {
    const date = new Date(mongoDate);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    const stringDate = `${day} ${month} ${year}`;
    return stringDate;
  }

  if (clinic === null || !fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <LinearGradient colors={['#78d0f5', 'white', '#78d0f5']} style={styles.container}>
      <View>
        <View style={styles.insideContainer}>
          <Text style={styles.titleTextStyle}>{clinic.name}</Text>

          <View style={styles.caller}>
            <Caller phone={clinic.phone} email={clinic.email} url={clinic.bookingURL} />
          </View>
          <Button
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonText}
            title="View Your Dental Chart"
            onPress={() => navigation.navigate('chart', { appointments })}
          />
          <Button
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonText}
            title="All Dental Images"
            onPress={() => navigation.navigate('allimages', { images })}
          />
          <Text style={styles.appointmentTextStyle}>Your appointments</Text>
          <FlatList
            data={appointments}
            keyExtractor={appointment => appointment._id}
            renderItem={item => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('appointment', {
                      appointment: item.item,
                    })
                  }
                >
                  <View style={styles.topicStyle}>
                    <Text style={styles.topicText}>{convertDate(item.item.date)}</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={30} />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

// Header Options
ClinicScreen.navigationOptions = () => {
  return {
    title: '',
    tabBarIcon: <MaterialCommunityIcons name="toothbrush-paste" size={25} />,
    headerTintColor: 'black',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 45 } : { top: 10 },
    headerStyle: {
      backgroundColor: '#78d0f5',
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    },
  };
};

export default ClinicScreen;
