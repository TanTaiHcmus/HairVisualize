import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { headerNavigationStyle, Screens } from "../../constants";
import AccountInfoScreen from "../../screens/AccountManager/screens/AccountInfo";
import HomeScreen from "../../screens/Home";
import LoadYOurHairScreen from "../../screens/LoadYourHair";
import UserInfoScreen from "../../screens/AccountManager/screens/UserInfo";
import EditUserInfoScreen from "../../screens/AccountManager/screens/EditUserInfo";
import VisualizeScreen from "../../screens/Visualize";
import HeaderBackground from "../components/HeaderBackground";
import TabBar from "../components/TabBar";
import withTranslate from "../../HOC/withTranslate";

function getRouteName(route) {
  return getFocusedRouteNameFromRoute(route) || Screens.Home;
}

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <BottomTab.Screen name={Screens.Home} component={HomeScreen} />
      <BottomTab.Screen
        name={Screens.AccountManager}
        component={AccountInfoScreen}
      />
    </BottomTab.Navigator>
  );
};

const MainStack = createStackNavigator();

const MainStackNavigator = ({ translate }) => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={Screens.Home}
        screenOptions={{
          headerBackground: () => <HeaderBackground />,
          ...headerNavigationStyle,
        }}
      >
        <MainStack.Screen
          name={Screens.Home}
          component={BottomTabNavigator}
          options={({ route }) => {
            const routeName = getRouteName(route);

            return {
              headerTitle: translate(routeName),
            };
          }}
        />
        <MainStack.Screen
          name="LoadYourHair"
          component={LoadYOurHairScreen}
          options={({ route }) => ({ headerTitle: route.params.name })}
        />
        <MainStack.Screen name="Visualize" component={VisualizeScreen} />
        <MainStack.Screen
          name={Screens.UserInfo}
          component={UserInfoScreen}
          options={{ headerTitle: translate(Screens.UserInfo) }}
        />
        <MainStack.Screen
          name={Screens.EditUserInfo}
          component={EditUserInfoScreen}
          options={({ route }) => ({
            headerTitle: translate(route.params.name),
          })}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default withTranslate(MainStackNavigator);
