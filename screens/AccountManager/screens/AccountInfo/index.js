import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import ImageDisplay from "../../../../components/ImageDisplay";
import LoadingWrapper from "../../../../components/LoadingWrapper";
import NavbarItem from "../../../../components/NavbarItem";
import TextCustom from "../../../../components/TextCustom";
import { Screens } from "../../../../constants";
import withTranslate from "../../../../HOC/withTranslate";
import { handleLogout } from "../../../../utils";
import { getUserInfoFromServer } from "../../action";
import ChangeLanguage from "./ChangeLanguage";
import Styles from "./style";

const AccountInfoScreen = ({
  translate,
  navigation,
  getUserInfoConnect,
  logoutConnect,
  account,
  displayName,
  avatar,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);
      await getUserInfoConnect();
      setIsLoading(false);
    };

    getUserInfo();
  }, []);

  const defaultImage =
    "https://raw.githubusercontent.com/TanTaiHcmus/HairVisualize/master/Images/avatar.png";

  return (
    <LoadingWrapper isLoading={isLoading} style={Styles.container}>
      <NavbarItem
        onPress={() => {
          navigation.navigate(Screens.UserInfo);
        }}
      >
        <View style={Styles.avatarContainer}>
          <ImageDisplay
            image={avatar}
            defaultImage={defaultImage}
            style={Styles.avatar}
          />
        </View>

        <View style={Styles.infoDetail}>
          <TextCustom
            title={account.toUpperCase()}
            style={Styles.accountName}
          />
          <TextCustom title={displayName} style={Styles.displayName} />
        </View>
      </NavbarItem>

      <NavbarItem
        onPress={() => {
          navigation.navigate(Screens.History);
        }}
      >
        <Icon name="time" size={26} style={Styles.icon} />
        <TextCustom title={translate("history")} style={Styles.navbarTitle} />
      </NavbarItem>

      <ChangeLanguage translate={translate} />

      <NavbarItem
        onPress={() => {
          navigation.navigate(Screens.Help);
        }}
      >
        <Icon name="help-buoy" size={25} style={Styles.icon} />
        <TextCustom title={translate("help")} style={Styles.navbarTitle} />
      </NavbarItem>

      <NavbarItem
        onPress={() => {
          navigation.navigate(Screens.AppInfo);
        }}
      >
        <Icon name="information" size={30} style={Styles.icon} />
        <TextCustom title={translate("app_info")} style={Styles.navbarTitle} />
      </NavbarItem>

      <NavbarItem
        onPress={() => {
          handleLogout();
        }}
      >
        <Icon name="log-out" size={28} style={Styles.icon} />
        <TextCustom title={translate("log_out")} style={Styles.navbarTitle} />
      </NavbarItem>
    </LoadingWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.user.account,
    displayName: state.user.displayName,
    avatar: state.user.avatar,
  };
};

const mapDispatchToProps = {
  getUserInfoConnect: getUserInfoFromServer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(AccountInfoScreen));
