import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

const KeyboardView = ({ keyboardVerticalOffset = 0, children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      enabled={false}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default React.memo(KeyboardView);
