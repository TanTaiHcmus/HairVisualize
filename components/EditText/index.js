import React from "react";
import { View } from "react-native";
import TextCustom from "../TextCustom";
import TextInputCustom from "../TextInputCustom";
import Styles from "./style";

const EditText = ({ title, value, onChangeText, editable = true }) => {
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
      <TextInputCustom
        onChangeText={onChangeText}
        value={value}
        editable={editable}
      />
    </View>
  );
};

export default EditText;
