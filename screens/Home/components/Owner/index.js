import React from "react";
import { View } from "react-native";
import ImageDisplay from "../../../../components/ImageDisplay";
import TextCustom from "../../../../components/TextCustom";
import Styles from "./style";

const Owner = ({ own }) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.avatarContainer}>
        <ImageDisplay
          defaultImage="https://raw.githubusercontent.com/TanTaiHcmus/HairVisualize/master/Images/avatar.png"
          image={own.avatar}
          style={Styles.ownerAvatar}
        />
      </View>
      <TextCustom
        title={own.displayName}
        style={Styles.ownerName}
        numberOfLines={1}
        ellipsizeMode="tail"
      />
    </View>
  );
};

export default Owner;
