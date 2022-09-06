import React, { useState, useContext, useEffect } from 'react';
import { View, ActivityIndicator, Image, Platform } from 'react-native';
import { Text, Button } from 'react-native-elements';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import Spacer from '../../components/Spacer';
import { Context as AuthContext } from '../../context/AuthContext/AuthContext';
import { Context as ClinicContext } from '../../context/ClinicContext/ClinicContext';
import { Context as UserContext } from '../../context/UserContext/UserContext';
import ToothLogo from '../../assets/t_logo1.png';
import styles from './styles';

const UpdateClinicScreen = () => {
  const {
    state: { errorMessage },
    updateUserClinic,
  } = useContext(AuthContext);
  const { state: clinicState, getClinicNames } = useContext(ClinicContext);
  const {
    state: {
      clinic: { _id, name },
    },
  } = useContext(UserContext);

  const [clinic, setClinic] = useState({ id: _id, name });

  const [fontsLoaded] = useFonts({
    Righteous_400Regular,
  });

  useEffect(() => {
    getClinicNames();
  }, []);

  const searchableDropdownTextInputProps = React.useMemo(() => {
    return {
      placeholder: clinic.name,
      style: styles.searchableDropdownTextInputPropsStyle,
    };
  }, [clinic.name]);

  const handleItemSelect = item => {
    setClinic({ id: item._id, name: item.name });
  };

  const handleUpdateClinic = () => {
    updateUserClinic({ clinic: clinic.id });
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.activityIndicatorViewStyle}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#78d0f5', 'white', '#78d0f5']} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleTextStyle}> ToothMate </Text>
        <Image source={ToothLogo} style={{ width: 200, height: 200, alignSelf: 'center' }} />
        <Text style={styles.clinicTextStyle}>Select Your Clinic</Text>
        <SearchableDropdown
          items={clinicState}
          onItemSelect={handleItemSelect}
          textInputProps={searchableDropdownTextInputProps}
          placeholderTextColor="#888"
          containerStyle={styles.dropdownContainer}
          itemStyle={styles.searchableDropdownItemStyle}
          itemTextStyle={styles.searchableDropdownItemTextStyle}
        />
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        <Spacer>
          <Button
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonText}
            title="Change Clinic"
            onPress={handleUpdateClinic}
          />
        </Spacer>
      </View>
    </LinearGradient>
  );
};

UpdateClinicScreen.navigationOptions = () => {
  return {
    title: '',
    headerBackTitleVisible: false,
    headerTintColor: 'black',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 45 } : { top: 30 },
    headerStyle: {
      backgroundColor: '#78d0f5',
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    },
  };
};

export default UpdateClinicScreen;
