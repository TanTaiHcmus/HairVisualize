import React from "react";
import { View } from "react-native";
import ImageDisplay from "../../../../../components/ImageDisplay";
import TextCustom from "../../../../../components/TextCustom";
import Styles from "./style";

const Owner = () => {
  return (
    <View style={Styles.container}>
      <ImageDisplay
        defaultImage="https://raw.githubusercontent.com/TanTaiHcmus/HairVisualize/master/Images/avatar.png"
        style={Styles.ownerAvatar}
      />
      <TextCustom
        title={"TanTaiHcmus"}
        style={Styles.ownerName}
        numberOfLines={1}
        ellipsizeMode="tail"
      />
    </View>
  );
};

export default Owner;
