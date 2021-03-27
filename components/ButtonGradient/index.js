import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity } from "react-native";
import Styles from "./style";

const ButtonGradient = ({ onPress, children, style, linearGradientColors }) => {
  return (
    <TouchableOpacity style={[Styles.container, style]} onPress={onPress}>
      <LinearGradient
        colors={linearGradientColors}
        style={Styles.linearGradient}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default React.memo(ButtonGradient);
