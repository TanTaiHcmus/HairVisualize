import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { gradientBackground, Screens } from "../../../constants";
import Icon from "react-native-vector-icons/Ionicons";
import Styles from "./style";
import Tab from "./Tab";

const TabBar = ({ state, navigation }) => {
  return (
    <LinearGradient colors={gradientBackground} style={Styles.container}>
      {state.routes.map((route, index) => (
        <Tab
          name={route.name}
          isFocused={state.index === index}
          onPress={() => {
            navigation.navigate(route.name);
          }}
          key={index}
        />
      ))}
      <View style={Styles.startButtonContainer}>
        <LinearGradient colors={gradientBackground} style={Styles.startButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Screens.HairVisualize);
            }}
          >
            <Icon name="add" size={45} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

export default TabBar;
