import React from "react";
import { View } from "react-native";
import Button from "../../../../../components/Button";
import TextCustom from "../../../../../components/TextCustom";
import Styles from "./style";

const InfoFrame = ({ title, children, onEdit }) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <TextCustom title={title} style={Styles.title} />
        <TextCustom title="Edit" style={Styles.editText} />
      </View>
      {children}
    </View>
  );
};

export default InfoFrame;
