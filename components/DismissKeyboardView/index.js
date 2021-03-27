import React from "react";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";

const DismissKeyboardView = ({ children }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(DismissKeyboardView);
