import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import ClinicScreen from "./src/screens/ClinicScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as EducationProvider } from "./src/context/EducationContext";
import { Provider as ClinicProvider } from "./src/context/ClinicContext";
import { Provider as UserProvider } from "./src/context/UserContext";
import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import EducationScreen from "./src/screens/EducationScreen";
import EducationContentScreen from "./src/screens/EducationContentScreen";
import { Entypo } from "@expo/vector-icons";

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,

  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    Account: AccountScreen,
    Education: createStackNavigator({
      list: EducationScreen,
      content: EducationContentScreen
    },
      {
        initialRouteName: 'list',
        navigationOptions: {
          title: "Education",
          tabBarIcon: <Entypo name="open-book" size={25} />
        }
      }),
    Clinic: ClinicScreen
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <UserProvider>
        <EducationProvider>
          <ClinicProvider>
            <App
              ref={(navigator) => {
                setNavigator(navigator);
              }}
            />
          </ClinicProvider>
        </EducationProvider>
      </UserProvider>
    </AuthProvider>
  );
};
