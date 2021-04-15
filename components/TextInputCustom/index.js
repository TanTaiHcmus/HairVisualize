import React from "react";
import { TextInput } from "react-native";
import Styles from "./style";

const TextInputCustom = ({ style, ...props }) => {
  return <TextInput style={[Styles.container, style]} {...props} />;
};

export default React.memo(TextInputCustom);
