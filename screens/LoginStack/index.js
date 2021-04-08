import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/Login";
import RegisterScreen from "./Screens/Register";
import { headerNavigationStyle } from "../../constants";

const LoginStack = createStackNavigator();

const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator
      screenOptions={headerNavigationStyle}
      initialRouteName="Login"
    >
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="Register" component={RegisterScreen} />
    </LoginStack.Navigator>
  );
};

export default LoginStackScreen;
