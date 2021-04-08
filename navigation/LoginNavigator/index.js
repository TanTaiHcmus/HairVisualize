import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import LoginStackScreen from "../../screens/LoginStack";

const LoginNavigator = () => {
  return (
    <NavigationContainer>
      <LoginStackScreen />
    </NavigationContainer>
  );
};

export default LoginNavigator;
