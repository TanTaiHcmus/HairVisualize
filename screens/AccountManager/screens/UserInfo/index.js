import React from "react";
import { Alert, ScrollView, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import ImageDisplay from "../../../../components/ImageDisplay";
import TextCustom from "../../../../components/TextCustom";
import {
  EditUserInfoOptions,
  Screens,
  STATUS_MESSAGE,
} from "../../../../constants";
import withTranslate from "../../../../HOC/withTranslate";
import { getFileFromUri } from "../../../../utils";
import { openGallery } from "../../../../utils/gallery";
import { updateUserInfoToServer } from "../../action";
import InfoFrame from "./InfoFrame";
import InfoLine from "./InfoLine";
import Styles from "./style";

const UserInfoScreen = ({
  translate,
  navigation,
  handleUpdateUserInfoConnect,
  account,
  displayName,
  avatar,
  email,
}) => {
  const handleChangeAvatar = async () => {
    const result = await openGallery([1, 1]);

    if (result) {
      const response = await handleUpdateUserInfoConnect({
        upload_avatar: getFileFromUri(result),
      });
      if (response.message === STATUS_MESSAGE.SUCCESS) {
        Alert.alert("Update avatar successfully!");
      }
    }
  };

  const defaultImage =
    "https://raw.githubusercontent.com/TanTaiHcmus/HairVisualize/master/Images/avatar.png";

  return (
    <View style={Styles.container}>
      <ScrollView>
        <View style={Styles.infoHeader}>
          <View style={Styles.avatarControl}>
            <View style={Styles.avatarContainer}>
              <ImageDisplay
                image={avatar}
                defaultImage={defaultImage}
                style={Styles.avatar}
              />
            </View>
          </View>

          <TextCustom title={account.toUpperCase()} style={Styles.account} />
          <TextCustom title={displayName} />
        </View>

        <InfoFrame
          title={translate(EditUserInfoOptions.Introduce)}
          onEdit={() => {
            navigation.navigate(Screens.EditUserInfo, {
              name: EditUserInfoOptions.Introduce,
            });
          }}
          translate={translate}
        >
          <InfoLine
            iconName="person"
            title={translate("username")}
            iconSize={25}
            content={account}
          />
          <InfoLine
            iconName="information"
            title={translate("display_name")}
            iconSize={30}
            content={displayName}
          />
        </InfoFrame>

        <InfoFrame
          title={translate(EditUserInfoOptions.Contact)}
          onEdit={() => {
            navigation.navigate(Screens.EditUserInfo, {
              name: EditUserInfoOptions.Contact,
            });
          }}
          translate={translate}
        >
          <InfoLine
            iconName="mail-open"
            title="Email"
            iconSize={25}
            content={email}
          />
        </InfoFrame>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  const { account, displayName, email, avatar } = state.user;

  return {
    account,
    displayName,
    avatar,
    email,
  };
};

const mapDispatchToProps = {
  handleUpdateUserInfoConnect: updateUserInfoToServer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(UserInfoScreen));
