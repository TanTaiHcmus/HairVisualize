import React from "react";
import { Image, View } from "react-native";
import logoApp from "../../../../assets/logoApp.png";
import TextCustom from "../../../../components/TextCustom";
import { AppName, AppVersion } from "../../../../constants";
import withTranslate from "../../../../HOC/withTranslate";
import Styles from "./style";

const AppInfoScreen = ({ translate }) => {
  return (
    <View style={Styles.container}>
      <Image source={logoApp} style={Styles.logoApp} />
      <TextCustom
        title={`${translate("app_name")}: ${AppName}`}
        style={Styles.logoText}
      />
      <TextCustom
        title={`${translate("app_version")}: ${AppVersion}`}
        style={Styles.logoText}
      />
    </View>
  );
};

export default withTranslate(AppInfoScreen);
