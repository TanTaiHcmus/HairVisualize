import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { headerNavigationStyle } from "../../constants";
import HairStyleBankScreen from "../../screens/HairStyleBank";
import HomeScreen from "../../screens/Home";
import LoadYOurHairScreen from "../../screens/LoadYourHair";
import UserInfoScreen from "../../screens/UserInfo/screens/UserInfoHome";
import UserInfoDetailScreen from "../../screens/UserInfo/screens/UserInfoDetail";
import VisualizeScreen from "../../screens/Visualize";
import EditUserInfo from "../../screens/UserInfo/screens/EditUserInfo";

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) || "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "HairStyleBank":
      return "HairStyleBank";
    case "UserInfo":
      return "UserInfo";
  }
}

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
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
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="HairStyleBank" component={HairStyleBankScreen} />
      <BottomTab.Screen name="UserInfo" component={UserInfoScreen} />
    </BottomTab.Navigator>
  );
};

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Home"
        screenOptions={headerNavigationStyle}
      >
        <MainStack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
        <MainStack.Screen
          name="LoadYourHair"
          component={LoadYOurHairScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
        <MainStack.Screen name="Visualize" component={VisualizeScreen} />
        <MainStack.Screen
          name="UserInfoDetail"
          component={UserInfoDetailScreen}
        />
        <MainStack.Screen
          name="EditUserInfo"
          component={EditUserInfo}
          options={({ route }) => ({ title: route.params.name })}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
