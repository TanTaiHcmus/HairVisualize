import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";
import HomeStackScreen from "../../screens/HomeStack";
import UserInfoStackScreen from "../../screens/UserInfoStack";
import HairStyleBankStackScreen from "../../screens/HairStyleBankStack";

const MainNavigator = createBottomTabNavigator();

const MainNavigatorScreen = () => {
  return (
    <NavigationContainer>
      <MainNavigator.Navigator
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
        <MainNavigator.Screen name="Home" component={HomeStackScreen} />
        <MainNavigator.Screen
          name="HairStyleBank"
          component={HairStyleBankStackScreen}
        />
        <MainNavigator.Screen name="UserInfo" component={UserInfoStackScreen} />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigatorScreen;
