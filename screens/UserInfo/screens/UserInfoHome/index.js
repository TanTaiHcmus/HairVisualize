import React, { useEffect } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import ImageDisplay from "../../../../components/ImageDisplay";
import NavbarItem from "../../../../components/NavbarItem";
import TextCustom from "../../../../components/TextCustom";
import { getUserInfoFromServer, logout } from "../../action";
import Styles from "./style";

const UserInfoScreen = ({
  navigation,
  getUserInfoConnect,
  logoutConnect,
  account,
  displayName,
  avatar,
}) => {
  useEffect(() => {
    getUserInfoConnect();
  }, []);

  const defaultImage =
    "https://raw.githubusercontent.com/TanTaiHcmus/HairVisualize/master/Images/avatar.png";

  return (
    <View style={Styles.container}>
      <NavbarItem
        onPress={() => {
          navigation.navigate("UserInfoDetail");
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

      <NavbarItem>
        <Icon name="store" size={22} style={Styles.icon} />
        <TextCustom title="Your hair store" style={Styles.navbarTitle} />
      </NavbarItem>

      <NavbarItem>
        <Icon name="history" size={22} style={Styles.icon} />
        <TextCustom title="History" style={Styles.navbarTitle} />
      </NavbarItem>

      <NavbarItem onPress={logoutConnect}>
        <Icon name="power-off" size={22} style={Styles.icon} />
        <TextCustom title="Log out" style={Styles.navbarTitle} />
      </NavbarItem>
    </View>
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
  logoutConnect: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoScreen);
