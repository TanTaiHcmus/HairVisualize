import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Screens } from "../../constants";
import LoginScreen from "../../screens/Login";
import RegisterScreen from "../../screens/Register";

const LoginStack = createStackNavigator();

const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator
      initialRouteName={Screens.Login}
      screenOptions={{
        headerShown: false,
      }}
    >
      <LoginStack.Screen name={Screens.Login} component={LoginScreen} />
      <LoginStack.Screen name={Screens.Register} component={RegisterScreen} />
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
