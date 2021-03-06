import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TextCustom from "../../../../../components/TextCustom";
import Styles from "./style";

const InfoLine = ({ iconName, iconSize, title, content }) => {
  return (
    <View style={Styles.container}>
      <Icon name={iconName} style={Styles.icon} size={iconSize} />
      <TextCustom title={title} style={Styles.title} />
      <TextCustom title={content} style={Styles.content} />
    </View>
  );
};

export default InfoLine;
