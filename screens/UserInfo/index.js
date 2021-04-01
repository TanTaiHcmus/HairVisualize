import React, { useEffect, useState, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import UserApi from "../../Api/userApi";
import ImageDisplay from "../../components/ImageDisplay";
import { STATUS_MESSAGE } from "../../constants";
import AppContext from "../../context";
import Icon from "react-native-vector-icons/FontAwesome5";
import Styles from "./style";
import TextCustom from "../../components/TextCustom";

const UserInfoScreen = () => {
  const context = useContext(AppContext);
  const [avatar, setAvatar] = useState(null);

  const navbar = [
    {
      title: "Information detail",
      iconName: "id-card",
      screen: "InfoDetail",
    },
    {
      title: "Your hair store",
      iconName: "store",
      screen: "YourHairStore",
    },
    { title: "History", iconName: "history", screen: "History" },
  ];

  function hexToBase64(str) {
    return btoa(
      String.fromCharCode.apply(
        null,
        str
          .replace(/\r|\n/g, "")
          .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
          .replace(/ +$/, "")
          .split(" ")
      )
    );
  }

  useEffect(() => {
    const handleGetAvatar = async () => {
      const response = await UserApi.getAvatar(context.userId);
      if (response.message === STATUS_MESSAGE.SUCCESS) {
        setAvatar(`data:image/jpeg;base64,${response.data}`);
        console.log(response.data);
      }
    };

    handleGetAvatar();
  }, []);

  return (
    <View style={Styles.container}>
      <ImageDisplay image={avatar} style={Styles.avatar} />
      <View style={Styles.navbarContainer}>
        {navbar.map((item, index) => (
          <TouchableOpacity style={Styles.navbarItem} key={index}>
            <Icon name={item.iconName} size={32} style={Styles.icon} />
            <TextCustom title={item.title} style={Styles.navbarTitle} />
            <Icon name="chevron-right" size={25} style={Styles.icon} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default UserInfoScreen;
