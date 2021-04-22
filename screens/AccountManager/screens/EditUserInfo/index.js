import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import DismissKeyboardView from "../../../../components/DismissKeyboardView";
import EditText from "../../../../components/EditText";
import KeyboardView from "../../../../components/KeyboardView";
import LoadingWrapper from "../../../../components/LoadingWrapper";
import TextCustom from "../../../../components/TextCustom";
import { EditUserInfoOptions } from "../../../../constants";
import withTranslate from "../../../../HOC/withTranslate";
import { updateUserInfoToServer } from "../../action";
import Styles from "./style";

const EditUSerInfoScreen = ({
  translate,
  navigation,
  route,
  accountServer,
  emailServer,
  displayNameServer,
  handleUpdateUserInfoConnect,
}) => {
  const [displayName, setDisplayName] = useState(displayNameServer);
  const [email, setEmail] = useState(emailServer);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TextCustom
          onPress={async () => {
            const info = {};
            switch (route.params.name) {
              case EditUserInfoOptions.Introduce: {
                info.display_name = displayName;
                break;
              }
              case EditUserInfoOptions.Contact: {
                info.email = email;
                break;
              }
              default: {
                break;
              }
            }
            setIsLoading(true);
            await handleUpdateUserInfoConnect(info);
            setIsLoading(false);
            navigation.goBack();
          }}
          title={translate("save")}
          style={Styles.saveButton}
        />
      ),
    });
  }, [displayName, email]);

  const renderChildFromRouteName = () => {
    switch (route.params.name) {
      case EditUserInfoOptions.Introduce: {
        return (
          <View style={{ width: "100%" }}>
            <EditText
              title={translate("username")}
              value={accountServer}
              editable={false}
            />

            <EditText
              title={translate("display_name")}
              onChangeText={(text) => setDisplayName(text)}
              value={displayName}
            />
          </View>
        );
      }
      case EditUserInfoOptions.Contact: {
        return (
          <View style={{ width: "100%" }}>
            <EditText
              title={translate("email")}
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
        <LoadingWrapper isLoading={isLoading} style={Styles.container}>
          {renderChildFromRouteName()}
        </LoadingWrapper>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(EditUSerInfoScreen));
