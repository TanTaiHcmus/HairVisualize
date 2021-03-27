import React from "react";
import { Text } from "react-native";
import Styles from "./style";

const TextCustom = ({ title, onPress, style }) => {
  return (
    <Text style={[Styles.container, style]} onPress={onPress}>
      {title}
    </Text>
  );
};

export default React.memo(TextCustom);
