import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TextCustom from "../../../../components/TextCustom";
import Styles from "./style";

const Interact = ({ isLike, interact, onToggle }) => {
  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={onToggle}>
        <View style={Styles.viewContainer}>
          <Icon
            name="heart"
            style={isLike ? Styles.like : Styles.dislike}
            size={22}
          />
          <TextCustom title={interact.numLikes} style={Styles.amount} />
        </View>
      </TouchableOpacity>

      <View style={Styles.viewContainer}>
        <Icon name="person" size={18} />
        <TextCustom title={interact.numSimulations} style={Styles.amount} />
      </View>
    </View>
  );
};

export default Interact;
