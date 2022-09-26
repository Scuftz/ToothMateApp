import React, { useState, useContext } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationEvents } from 'react-navigation';
import { Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import Spacer from '../../components/Spacer';
import { Context as userContext } from '../../context/UserContext/UserContext';
import { Context as authContext } from '../../context/AuthContext/AuthContext';
import styles from './styles';
import LoadingScreen from '../LoadingScreen';

const MIN_DATE = dayjs().subtract(100, 'years');
const MAX_DATE = dayjs();

const UserScreen = () => {
  const { state } = useContext(userContext);
  const { updateUser } = useContext(authContext);
  const {
    state: { errorMessage },
  } = useContext(authContext);

  const [firstname, setFirstName] = useState(state.details.firstname);
  const [lastname, setLastName] = useState(state.details.lastname);
  const [email, setEmail] = useState(state.details.email);
  const [mobile, setMobile] = useState(state.details.mobile);
  const [dob, setDob] = useState(new Date(state.details.dob));

  const modalDate = React.useMemo(() => (dob ? dayjs(dob).toDate() : ''), [dob]);
  const displayDate = React.useMemo(() => (dob ? dayjs(dob).format('DD/MM/YYYY') : ''), [dob]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
  });

  const handleDateChange = newDate => {
    const currentDate = newDate ?? dob;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
  };

  const handleUpdateDetails = () => {
    updateUser({ firstname, lastname, email, mobile, dob });
  };

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <LinearGradient colors={['#78d0f5', 'white', '#78d0f5']} style={styles.container}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <Text style={styles.titleTextStyle}> ToothMate </Text>
          <NavigationEvents />
          <Spacer />
          <Input
            label="First Name"
            value={firstname}
            onChangeText={setFirstName}
            autoCapitalize="none"
            leftIcon={{ type: 'feather', name: 'user' }}
            autoCorrect={false}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.textStyle}
            labelStyle={styles.labelStyle}
          />
          <Input
            label="Last Name"
            value={lastname}
            onChangeText={setLastName}
            autoCapitalize="none"
            leftIcon={{ type: 'feather', name: 'user' }}
            autoCorrect={false}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.textStyle}
            labelStyle={styles.labelStyle}
          />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            leftIcon={{ type: 'material-icons', name: 'email' }}
            autoCorrect={false}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.textStyle}
            labelStyle={styles.labelStyle}
          />
          <Text style={styles.clinicTextStyle}>Date of Birth</Text>
          <View>
            {Platform.OS === 'android' ? (
              <View style={styles.androidModalViewStyle}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.dateStyle}>{displayDate}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={showDatePicker}
                  mode="date"
                  date={modalDate}
                  minimumDate={MIN_DATE.toDate()}
                  maximumDate={MAX_DATE.toDate()}
                  onCancel={() => setShowDatePicker(false)}
                  onConfirm={handleDateChange}
                />
              </View>
            ) : (
              <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                date={modalDate}
                minimumDate={MIN_DATE.toDate()}
                maximumDate={MAX_DATE.toDate()}
                onCancel={() => setShowDatePicker(false)}
                onConfirm={handleDateChange}
              />
            )}
          </View>
          <Spacer />
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
          <Spacer>
            <Button
              title="Update Details"
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              titleStyle={styles.buttonText}
              onPress={handleUpdateDetails}
            />
          </Spacer>
        </KeyboardAwareScrollView>
      </View>
    </LinearGradient>
  );
};

UserScreen.navigationOptions = () => {
  return {
    title: '',
    headerTintColor: 'black',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 45 } : { top: 30 },
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: '#78d0f5',
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    },
    cardStyle: {
      backgroundColor: 'white',
    },
  };
};

export default UserScreen;
