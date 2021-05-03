import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TextCustom from "../../../../components/TextCustom";
import withTranslate from "../../../../HOC/withTranslate";
import Styles from "./style";

const AppInfoScreen = ({ translate }) => {
  return (
    <View style={Styles.container}>
      <Icon name="logo-instagram" style={Styles.logo} size={80} />
      <TextCustom title={translate("app_version")} style={Styles.logoName} />
    </View>
  );
};

export default withTranslate(AppInfoScreen);
