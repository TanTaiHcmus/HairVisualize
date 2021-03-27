import React from "react";
import { TextInput } from "react-native";
import Styles from "./style";

const TextInputCustom = ({ style, ...props }) => {
  return <TextInput style={[Styles.container, style]} {...props} editable />;
};

export default React.memo(TextInputCustom);
