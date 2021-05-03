import React from "react";
import { ScrollView } from "react-native";

const ScrollContainer = ({ children }) => {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
  );
};

export default ScrollContainer;
