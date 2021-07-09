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
      <View style={Styles.appInfoLine}>
        <TextCustom
          title={`${translate("app_name")}:`}
          style={Styles.appInfoTitle}
        />
        <TextCustom title={AppName} style={Styles.appInfoValue} />
      </View>
      <View style={Styles.appInfoLine}>
        <TextCustom
          title={`${translate("app_version")}:`}
          style={Styles.logoText}
        />
        <TextCustom title={AppVersion} style={Styles.appInfoValue} />
      </View>
    </View>
  );
};

export default withTranslate(AppInfoScreen);
