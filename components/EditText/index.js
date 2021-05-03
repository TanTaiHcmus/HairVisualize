import React from "react";
import { View } from "react-native";
import TextCustom from "../TextCustom";
import Styles from "./style";

const EditText = ({ title, children, editable = true }) => {
  return (
    <View
      style={[
        Styles.container,
        {
          backgroundColor: !editable
            ? "rgba(234, 234, 224, 0.12)"
            : "transparent",
        },
      ]}
    >
      <TextCustom title={title} style={Styles.title} />
      {children}
    </View>
  );
};

export default EditText;
