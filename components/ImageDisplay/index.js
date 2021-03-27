import React from "react";
import { Image } from "react-native";
import Styles from "./style";

const ImageDisplay = ({ image }) => {
  return (
    <Image style={Styles.image} source={{ uri: image }} resizeMode="stretch" />
  );
};

export default React.memo(ImageDisplay);
