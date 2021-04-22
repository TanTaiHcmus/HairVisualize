import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { gradientHeader } from "../../../constants";
import Styles from "./style";

const HeaderBackground = () => {
  return <LinearGradient colors={gradientHeader} style={Styles.container} />;
};

export default HeaderBackground;
