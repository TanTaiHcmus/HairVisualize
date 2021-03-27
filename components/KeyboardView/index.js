import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

const KeyboardView = ({
  enabled = false,
  keyboardVerticalOffset = 0,
  children,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      enabled={enabled}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default React.memo(KeyboardView);
