import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import ClinicScreen from './src/screens/ClinicScreen';
import SignupChildScreen from './src/screens/SignupChildScreen';
import ChildAccountScreen from './src/screens/ChildAccountScreen';
import { Provider as AuthProvider } from './src/context/AuthContext/AuthContext';
import { Provider as EducationProvider } from './src/context/EducationContext/EducationContext';
import { Provider as AppointmentProvider } from './src/context/AppointmentContext/AppointmentContext';
import { Provider as UserProvider } from './src/context/UserContext/UserContext';
import { Provider as ClinicProvider } from './src/context/ClinicContext/ClinicContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import EducationScreen from './src/screens/EducationScreen';
import EducationContentScreen from './src/screens/EducationContentScreen';
import AppointmentScreen from './src/screens/AppointmentScreen';
import SelectClinicScreen from './src/screens/SelectClinicScreen';
import UserScreen from './src/screens/UserScreen';
import UpdateClinicScreen from './src/screens/UpdateClinicScreen';
import PasswordChangeScreen from './src/screens/PasswordChangeScreen';
import UserAccountScreen from './src/screens/UserAccountScreen';
import DentalChartScreen from './src/screens/DentalChartScreen';
import InvoiceScreen from './src/screens/InvoiceScreen';
import ImagesScreen from './src/screens/ImagesScreen';
import DisconnectChildScreen from './src/screens/DisconnectChildScreen';
import AllImagesScreen from './src/screens/AllImagesScreen';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,

  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    SelectClinic: SelectClinicScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    AccountFlow: createStackNavigator(
      {
        Account: AccountScreen,
        User: UserScreen,
        DisconnectChild: DisconnectChildScreen,
        UpdateClinic: UpdateClinicScreen,
        Password: PasswordChangeScreen,
        UserAccount: UserAccountScreen,
      },
      {
        initialRouteName: 'Account',
        navigationOptions: {
          title: 'Home',
          tabBarIcon: () => <Entypo name="home" size={25} />,
        },
      },
    ),
    Education: createStackNavigator(
      {
        list: EducationScreen,
        content: EducationContentScreen,
      },
      {
        initialRouteName: 'list',
        navigationOptions: {
          title: 'Education',
          tabBarIcon: <Entypo name="open-book" size={25} />,
        },
      },
    ),
    ClinicFlow: createStackNavigator(
      {
        clinic: ClinicScreen,
        chart: DentalChartScreen,
        appointment: AppointmentScreen,
        invoice: InvoiceScreen,
        images: ImagesScreen,
        allimages: AllImagesScreen,
      },
      {
        initialRouteName: 'clinic',
        navigationOptions: {
          title: 'Clinic',
          tabBarIcon: <MaterialCommunityIcons name="toothbrush-paste" size={25} />,
        },
      },
    ),
  }),
  childFlow: createBottomTabNavigator({
    AccountFlow: createStackNavigator(
      {
        Account: ChildAccountScreen,
        User: UserScreen,
        DisconnectChild: DisconnectChildScreen,
        UpdateClinic: UpdateClinicScreen,
        Password: PasswordChangeScreen,
        UserAccount: UserAccountScreen,
      },
      {
        initialRouteName: 'Account',
        navigationOptions: {
          title: 'Home',
          tabBarIcon: () => <Entypo name="home" size={25} />,
        },
      },
    ),
    Education: createStackNavigator(
      {
        list: EducationScreen,
        content: EducationContentScreen,
      },
      {
        initialRouteName: 'list',
        navigationOptions: {
          title: 'Education',
          tabBarIcon: <Entypo name="open-book" size={25} />,
        },
      },
    ),
    Clinic: createStackNavigator(
      {
        list: ClinicScreen,
        chart: DentalChartScreen,
        content: AppointmentScreen,
      },
      {
        initialRouteName: 'list',
        navigationOptions: {
          title: 'Clinic',
          tabBarIcon: <MaterialCommunityIcons name="toothbrush-paste" size={25} />,
        },
      },
    ),
  }),
  signUpChildFlow: createStackNavigator({
    Signupchild: SignupChildScreen,
    SelectClinic: SelectClinicScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <ClinicProvider>
        <EducationProvider>
          <AppointmentProvider>
            <UserProvider>
              <App
                ref={navigator => {
                  setNavigator(navigator);
                }}
              />
            </UserProvider>
          </AppointmentProvider>
        </EducationProvider>
      </ClinicProvider>
    </AuthProvider>
  );
};
