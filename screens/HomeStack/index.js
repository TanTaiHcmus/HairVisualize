import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { headerNavigationStyle } from "../../constants";
import HomeScreen from "./Screens/Home";
import LoadYourHair from "./Screens/LoadYourHair";
import VisualizeScreen from "./Screens/Visualize";

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={headerNavigationStyle}
      initialRouteName="Home"
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="LoadYourHair"
        component={LoadYourHair}
        options={({ route }) => ({ title: route.params.name })}
      />
      <HomeStack.Screen name="Visualize" component={VisualizeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
