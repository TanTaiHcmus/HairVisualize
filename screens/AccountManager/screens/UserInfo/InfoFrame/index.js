import React from "react";
import { View } from "react-native";
import TextCustom from "../../../../../components/TextCustom";
import Styles from "./style";

const InfoFrame = ({ title, children, onEdit, translate }) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <TextCustom title={title} style={Styles.title} />
        <TextCustom
          title={translate("edit")}
          style={Styles.editText}
          onPress={onEdit}
        />
      </View>
      {children}
    </View>
  );
};

export default InfoFrame;
