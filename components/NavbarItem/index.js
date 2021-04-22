import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import Styles from "./style";

const NavbarItem = ({ children, onPress }) => {
  return (
    <TouchableOpacity style={Styles.container} onPress={onPress}>
      {children}
      <Icon name="chevron-forward" size={22} style={Styles.icon} />
    </TouchableOpacity>
  );
};

export default NavbarItem;
