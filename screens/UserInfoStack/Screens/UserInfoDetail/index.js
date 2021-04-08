import React from "react";
import { connect } from "react-redux";
import { ScrollView, View, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import ImageDisplay from "../../../../components/ImageDisplay";
import TextCustom from "../../../../components/TextCustom";
import { INVALID_TOKEN_STATUS, STATUS_MESSAGE } from "../../../../constants";
import { getFileFromUri } from "../../../../utils";
import { openGallery } from "../../../../utils/gallery";
import InfoFrame from "./InfoFrame";
import InfoLine from "./InfoLine";
import Styles from "./style";
import { updateUserInfoToServer } from "./action";

const UserInfoDetailScreen = ({
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
            <Icon
              name="edit"
              size={20}
              style={Styles.buttonChangeAvatar}
              onPress={handleChangeAvatar}
            />
          </View>

          <TextCustom title={account.toUpperCase()} style={Styles.account} />
          <TextCustom title={displayName} />
        </View>

        <InfoFrame title="Introduce">
          <InfoLine
            iconName="user-alt"
            title="Account"
            iconSize={18}
            content={account}
          />
          <InfoLine
            iconName="info"
            title="Display name"
            iconSize={20}
            content={displayName}
          />
        </InfoFrame>

        <InfoFrame title="Contact">
          <InfoLine
            iconName="envelope"
            title="Email"
            iconSize={20}
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
)(UserInfoDetailScreen);
