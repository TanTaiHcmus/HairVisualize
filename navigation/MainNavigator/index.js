import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";
import HomeScreen from "../../screens/Home/index";
import { headerNavigationStyle } from "../../constants";
import LoadYourHair from "../../screens/LoadYourHair";
import VisualizeScreen from "../../screens/Visualize";
import HairStyleBankScreen from "../../screens/HairStyleBank";
import UserInfoScreen from "../../screens/UserInfo";

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

const HairStyleBankStack = createStackNavigator();

const HairStyleBankStackScreen = () => {
  return (
    <HairStyleBankStack.Navigator screenOptions={headerNavigationStyle}>
      <HairStyleBankStack.Screen
        name="HairStyleBank"
        component={HairStyleBankScreen}
      />
    </HairStyleBankStack.Navigator>
  );
};

const UserInfoStack = createStackNavigator();

const UserInfoStackScreen = () => {
  return (
    <UserInfoStack.Navigator screenOptions={headerNavigationStyle}>
      <UserInfoStack.Screen name="UserInformation" component={UserInfoScreen} />
    </UserInfoStack.Navigator>
  );
};

const AppNavigator = createBottomTabNavigator();

const AppNavigatorScreen = () => {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            switch (route.name) {
              case "Home": {
                iconName = "home";
                break;
              }
              case "HairStyleBank": {
                iconName = "university";
                break;
              }
              case "UserInfo": {
                iconName = "user-alt";
                break;
              }
              default: {
                break;
              }
            }
            return (
              <Icon
                name={iconName}
                size={27}
                color={focused ? "#EE2A7B" : "#707070"}
              />
            );
          },
        })}
      >
        <AppNavigator.Screen name="Home" component={HomeStackScreen} />
        <AppNavigator.Screen
          name="HairStyleBank"
          component={HairStyleBankStackScreen}
        />
        <AppNavigator.Screen name="UserInfo" component={UserInfoStackScreen} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigatorScreen;
