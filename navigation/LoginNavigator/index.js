import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import LoginScreen from "../../screens/Login";
import RegisterScreen from "../../screens/Register";
import OTPConfirm from "../../screens/OTPConfirm";
import { headerNavigationStyle } from "../../constants";

export default function LoginNavigator() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={headerNavigationStyle}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OTPConfirm" component={OTPConfirm} />
    </Stack.Navigator>
  );
}
