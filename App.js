import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import ClinicScreen from "./src/screens/ClinicScreen";
import SignupChildScreen from "./src/screens/SignupChildScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as EducationProvider } from "./src/context/EducationContext";
import { Provider as AppointmentProvider } from "./src/context/AppointmentContext";
import { Provider as UserProvider } from "./src/context/UserContext";
import { Provider as ClinicProvider } from "./src/context/ClinicContext";
import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import EducationScreen from "./src/screens/EducationScreen";
import EducationContentScreen from "./src/screens/EducationContentScreen";
import AppointmentScreen from "./src/screens/AppointmentScreen";
import SelectClinicScreen from "./src/screens/SelectClinicScreen";
import UserScreen from "./src/screens/UserScreen";
import { Entypo, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

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
        Signupchild: SignupChildScreen,
        SelectClinic: SelectClinicScreen,
        User: UserScreen,
      },
      {
        initialRouteName: "Account",
        navigationOptions: {
          title: "Account",
          tabBarIcon: () => <Ionicons name="person" size={25} />,
        },
      }
    ),
    Education: createStackNavigator(
      {
        list: EducationScreen,
        content: EducationContentScreen,
      },
      {
        initialRouteName: "list",
        navigationOptions: {
          title: "Education",
          tabBarIcon: <Entypo name="open-book" size={25} />,
        },
      }
    ),
    // Clinic: ClinicScreen,
    Clinic: createStackNavigator(
      {
        list: ClinicScreen,
        content: AppointmentScreen,
      },
      {
        initialRouteName: "list",
        navigationOptions: {
          title: "Clinic",
          tabBarIcon: (
            <MaterialCommunityIcons name="toothbrush-paste" size={25} />
          ),
        },
      }
    ),
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
                ref={(navigator) => {
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
