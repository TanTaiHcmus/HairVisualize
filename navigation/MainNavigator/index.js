import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { headerNavigationStyle, Screens } from "../../constants";
import withTranslate from "../../HOC/withTranslate";
import AccountInfoScreen from "../../screens/AccountManager/screens/AccountInfo";
import AppInfoScreen from "../../screens/AccountManager/screens/AppInfo";
import EditUserInfoScreen from "../../screens/AccountManager/screens/EditUserInfo";
import HelpScreen from "../../screens/AccountManager/screens/Help";
import HistoryScreen from "../../screens/AccountManager/screens/History";
import UserInfoScreen from "../../screens/AccountManager/screens/UserInfo";
import HomeScreen from "../../screens/Home";
import HairStyleBankScreen from "../../screens/Home/components/HairStyleBank";
import YourHairStylesScreen from "../../screens/Home/components/YourHairStyles";
import HeaderBackground from "../components/HeaderBackground";
import TabBar from "../components/TabBar";
import HairVisualizeScreen from "../../screens/Visualize";
import HairLikesScreen from "../../screens/AccountManager/screens/HairLikes";
import ResultInfoScreen from "../../screens/ResultInfo";

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
        <MainStack.Screen
          name={Screens.Help}
          component={HelpScreen}
          options={{ headerTitle: translate(Screens.Help) }}
        />
        <MainStack.Screen
          name={Screens.History}
          component={HistoryScreen}
          options={{ headerTitle: translate(Screens.History) }}
        />
        <MainStack.Screen
          name={Screens.AppInfo}
          component={AppInfoScreen}
          options={{ headerTitle: translate(Screens.AppInfo) }}
        />
        <MainStack.Screen
          name={Screens.HairStyleBank}
          component={HairStyleBankScreen}
          options={{ headerTitle: translate(Screens.HairStyleBank) }}
        />
        <MainStack.Screen
          name={Screens.YourHairStyle}
          component={YourHairStylesScreen}
          options={{ headerTitle: translate(Screens.YourHairStyle) }}
        />
        <MainStack.Screen
          name={Screens.HairVisualize}
          component={HairVisualizeScreen}
          options={{ headerTitle: translate(Screens.HairVisualize) }}
        />
        <MainStack.Screen
          name={Screens.HairLikes}
          component={HairLikesScreen}
          options={{ headerTitle: translate(Screens.HairLikes) }}
        />
        <MainStack.Screen
          name={Screens.ResultInfo}
          component={ResultInfoScreen}
          options={{ headerTitle: translate(Screens.ResultInfo) }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default withTranslate(MainStackNavigator);
