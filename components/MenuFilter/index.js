import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import withTranslate from "../../HOC/withTranslate";
import ScrollContainer from "../ScrollContainer";
import TextCustom from "../TextCustom";
import Styles from "./style";

const MenuFilter = ({
  children,
  handleHidePopup,
  isShowMenu,
  handleToggle,
  translate,
}) => {
  return (
    <TouchableOpacity
      style={[Styles.container, isShowMenu ? Styles.fullScreen : undefined]}
      activeOpacity={1}
      onPress={() => {
        handleHidePopup();
      }}
    >
      <ScrollContainer>
        <View style={Styles.menuContainer}>
          <TextCustom title={translate("filter")} style={Styles.filterText} />
          <Icon
            name={isShowMenu ? "checkmark" : "menu"}
            size={35}
            color={isShowMenu ? "green" : "black"}
            onPress={handleToggle}
            style={Styles.menuIcon}
          />
        </View>
        {isShowMenu && children}
      </ScrollContainer>
    </TouchableOpacity>
  );
};

export default withTranslate(MenuFilter);
