import React from "react";
import { TouchableOpacity } from "react-native";
import Styles from "./style";

const Button = ({ onPress, style, children }) => {
  return (
    <TouchableOpacity style={[Styles.container, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default React.memo(Button);
