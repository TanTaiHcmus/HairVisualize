import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TextCustom from "../../../../../components/TextCustom";
import Styles from "./style";

const Interact = ({ isLike, onToggle, like = 0, view = 0 }) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.viewContainer}>
        <TouchableOpacity onPress={onToggle}>
          <Icon
            name="heart"
            style={isLike ? Styles.like : Styles.dislike}
            size={22}
          />
        </TouchableOpacity>
        <TextCustom title={like + isLike} style={Styles.amount} />
      </View>

      <View style={Styles.viewContainer}>
        <Icon name="person" size={18} />
        <TextCustom title={view} style={Styles.amount} />
      </View>
    </View>
  );
};

export default Interact;
