import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TextCustom from "../../../../components/TextCustom";
import { Screens } from "../../../../constants";
import Styles from "./style";
import withTranslate from "../../../../HOC/withTranslate";

const Tab = ({ translate, isFocused, name, onPress }) => {
  const getIconNameFromTabName = () => {
    switch (name) {
      case Screens.Home: {
        return isFocused ? "home" : "home-outline";
      }
      case Screens.AccountManager: {
        return isFocused ? "person" : "person-outline";
      }
      default: {
        return "";
      }
    }
  };

  return (
    <TouchableOpacity style={Styles.container} onPress={onPress}>
      <Icon
        name={getIconNameFromTabName()}
        size={25}
        color="#fff"
        style={Styles.icon}
      />
      <TextCustom style={Styles.label} title={translate(name)} />
    </TouchableOpacity>
  );
};

export default withTranslate(Tab);
