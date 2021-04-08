import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { headerNavigationStyle } from "../../constants";
import UserInfoScreen from "./Screens/UserInfo";
import UserInfoDetailScreen from "./Screens/UserInfoDetail";

const UserInfoStack = createStackNavigator();

const UserInfoStackScreen = () => {
  return (
    <UserInfoStack.Navigator
      screenOptions={headerNavigationStyle}
      initialRouteName="UserInfo"
    >
      <UserInfoStack.Screen name="UserInfo" component={UserInfoScreen} />

      <UserInfoStack.Screen
        name="UserInfoDetail"
        component={UserInfoDetailScreen}
      />
    </UserInfoStack.Navigator>
  );
};

export default UserInfoStackScreen;
