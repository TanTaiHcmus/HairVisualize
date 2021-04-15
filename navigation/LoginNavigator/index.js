import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { headerNavigationStyle } from "../../constants";
import LoginScreen from "../../screens/Login";
import RegisterScreen from "../../screens/Register";

const LoginStack = createStackNavigator();

const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator
      initialRouteName="Login"
      screenOptions={headerNavigationStyle}
    >
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="Register" component={RegisterScreen} />
    </LoginStack.Navigator>
  );
};

const LoginNavigator = () => {
  return (
    <NavigationContainer>
      <LoginStackScreen />
    </NavigationContainer>
  );
};

export default LoginNavigator;
