import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import DismissKeyboardView from "../../../../components/DismissKeyboardView";
import EditText from "../../../../components/EditText";
import KeyboardView from "../../../../components/KeyboardView";
import TextCustom from "../../../../components/TextCustom";
import { updateUserInfoToServer } from "../../action";
import Styles from "./style";

const EditUSerInfoScreen = ({
  navigation,
  route,
  accountServer,
  emailServer,
  displayNameServer,
  handleUpdateUserInfoConnect,
}) => {
  const [displayName, setDisplayName] = useState(displayNameServer);
  const [email, setEmail] = useState(emailServer);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TextCustom
          onPress={() => {
            const info = {};
            switch (route.params.name) {
              case "Introduce": {
                info.display_name = displayName;
                break;
              }
              case "Contact": {
                info.email = email;
                break;
              }
              default: {
                break;
              }
            }
            handleUpdateUserInfoConnect(info);
            navigation.goBack();
          }}
          title="Edit"
          style={Styles.editButton}
        />
      ),
    });
  }, [displayName, email]);

  const renderChildFromRouteName = () => {
    switch (route.params.name) {
      case "Introduce": {
        return (
          <View style={{ width: "100%" }}>
            <EditText title="Account" value={accountServer} editable={false} />

            <EditText
              title="Display name"
              onChangeText={(text) => setDisplayName(text)}
              value={displayName}
            />
          </View>
        );
      }
      case "Contact": {
        return (
          <View style={{ width: "100%" }}>
            <EditText
              title="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              editable
            />
          </View>
        );
      }
    }
  };

  return (
    <KeyboardView>
      <DismissKeyboardView>
        <View style={Styles.container}>{renderChildFromRouteName()}</View>
      </DismissKeyboardView>
    </KeyboardView>
  );
};

const mapStateToProps = (state) => {
  const { account, displayName, email } = state.user;
  return {
    accountServer: account,
    displayNameServer: displayName,
    emailServer: email,
  };
};

const mapDispatchToProps = {
  handleUpdateUserInfoConnect: updateUserInfoToServer,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUSerInfoScreen);
