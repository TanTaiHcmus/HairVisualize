import React from "react";
import { View } from "react-native";
import Styles from "./style";

const Container = ({ children }) => {
  return <View style={Styles.container}>{children}</View>;
};

export default Container;
