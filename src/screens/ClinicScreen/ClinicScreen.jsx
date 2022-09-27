import React, { useContext, useEffect } from 'react';
import { Button } from 'react-native-elements';
import { View, Text, TouchableOpacity, Platform, FlatList } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import dayjs from 'dayjs';
import Caller from '../../components/Caller';
import { Context as UserContext } from '../../context/UserContext/UserContext';
import 'intl';
import 'intl/locale-data/jsonp/en';
import styles from './styles';
import LoadingScreen from '../LoadingScreen';

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

  // Convert date from mongoDB date format to be displayed
  const convertDate = React.useCallback(mongoDate => {
    const jsDate = new Date(mongoDate);
    return dayjs(jsDate).format('DD/MM/YYYY');
  }, []);

  if (!clinic || !fontsLoaded) {
    return <LoadingScreen />;
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
