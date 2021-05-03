import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import DismissKeyboardView from "../../../../components/DismissKeyboardView";
import EditText from "../../../../components/EditText";
import KeyboardView from "../../../../components/KeyboardView";
import LoadingWrapper from "../../../../components/LoadingWrapper";
import TextCustom from "../../../../components/TextCustom";
import TextInputCustom from "../../../../components/TextInputCustom";
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
          <View>
            <EditText title={translate("username")} editable={false}>
              <TextInputCustom value={accountServer} editable={false} />
            </EditText>

            <EditText title={translate("display_name")}>
              <TextInputCustom
                onChangeText={(text) => setDisplayName(text)}
                value={displayName}
              />
            </EditText>
          </View>
        );
      }
      case EditUserInfoOptions.Contact: {
        return (
          <View>
            <EditText title={translate("email")}>
              <TextInputCustom
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </EditText>
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
