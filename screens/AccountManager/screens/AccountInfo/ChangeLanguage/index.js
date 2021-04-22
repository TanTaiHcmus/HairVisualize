import React, { useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import NavbarItem from "../../../../../components/NavbarItem";
import OptionsPopup from "../../../../../components/OptionsPopup";
import TextCustom from "../../../../../components/TextCustom";
import { LanguageOptions } from "../../../../../constants";
import { changeLanguage } from "./action";
import Styles from "./style";

const ChangeLanguage = ({ translate, changeLanguageConnect }) => {
  const [isShowLanguageOptions, setIsShowLanguageOptions] = useState(false);

  const options = [
    {
      title: translate("vietnamese"),
      onPress: () => {
        changeLanguageConnect(LanguageOptions.Vietnamese);
      },
    },
    {
      title: translate("english"),
      onPress: () => {
        changeLanguageConnect(LanguageOptions.English);
      },
    },
  ];

  const handleChangeLanguage = () => {
    setIsShowLanguageOptions(true);
  };

  const handleExit = () => {
    setIsShowLanguageOptions(false);
  };

  return (
    <View>
      <NavbarItem onPress={handleChangeLanguage}>
        <Icon name="globe" size={25} style={Styles.icon} />
        <TextCustom
          title={translate("change_language")}
          style={Styles.navbarTitle}
        />
      </NavbarItem>

      {isShowLanguageOptions && (
        <OptionsPopup
          title={translate("change_language")}
          options={options}
          onExit={handleExit}
        />
      )}
    </View>
  );
};

const mapDispatchToProps = {
  changeLanguageConnect: changeLanguage,
};

export default connect(null, mapDispatchToProps)(ChangeLanguage);
