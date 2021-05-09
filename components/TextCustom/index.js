import React from "react";
import { Text } from "react-native";
import Styles from "./style";

const TextCustom = ({ title, style, ...props }) => {
  return (
    <Text style={[Styles.container, style]} {...props}>
      {title}
    </Text>
  );
};

export default React.memo(TextCustom);
