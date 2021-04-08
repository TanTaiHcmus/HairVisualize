import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { headerNavigationStyle } from "../../constants";
import HairStyleBankScreen from "./Screens/HairStyleBank";

const HairStyleBankStack = createStackNavigator();

const HairStyleBankStackScreen = () => {
  return (
    <HairStyleBankStack.Navigator
      screenOptions={headerNavigationStyle}
      initialRouteName="HairStyleBank"
    >
      <HairStyleBankStack.Screen
        name="HairStyleBank"
        component={HairStyleBankScreen}
      />
    </HairStyleBankStack.Navigator>
  );
};

export default HairStyleBankStackScreen;
