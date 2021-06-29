import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, Image, View } from "react-native";
import { connect } from "react-redux";
import logoApp from "../../assets/logoApp.png";
import ButtonGradient from "../../components/ButtonGradient";
import DismissKeyboardView from "../../components/DismissKeyboardView";
import KeyboardView from "../../components/KeyboardView";
import ScrollContainer from "../../components/ScrollContainer";
import TextCustom from "../../components/TextCustom";
import TextInputWithIcon from "../../components/TextInputWithIcon";
import { gradientBackground, Screens, STATUS_MESSAGE } from "../../constants";
import withTranslate from "../../HOC/withTranslate";
import { isEmpty } from "../../utils";
import { loginToServer } from "./action";
import Styles from "./style";

const LoginScreen = ({ translate, navigation, handleLoginConnect }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClicked = async () => {
    if (isEmpty(username)) {
      Alert.alert(translate("empty_username"));
      return;
    }

    if (isEmpty(password)) {
      Alert.alert(translate("empty_password"));
      return;
    }

    const response = await handleLoginConnect({ username, password });

    if (response.message === STATUS_MESSAGE.ERROR) {
      Alert.alert(translate(response.data.data.message));
    }
  };

  const handleForgetPassword = async () => {
    // const response = await
  };

  const handleCreateNewAccount = () => {
    navigation.navigate(Screens.Register);
  };

  return (
    <LinearGradient style={Styles.container} colors={gradientBackground}>
      <ScrollContainer>
        <KeyboardView>
          <DismissKeyboardView>
            <View style={Styles.logoContainer}>
              <Image source={logoApp} style={Styles.logo} />
            </View>

            <View style={Styles.inputContainer}>
              <TextInputWithIcon
                iconName="person"
                iconSize={24}
                onChangeText={(text) => setUsername(text)}
                value={username}
                placeholder={translate("username")}
                style={Styles.input}
                editable
              />

              <TextInputWithIcon
                iconName="lock-open"
                iconSize={25}
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder={translate("password")}
                style={Styles.input}
                isPassword
                editable
              />
            </View>

            <View style={Styles.controlContainer}>
              <ButtonGradient
                onPress={handleLoginClicked}
                linearGradientColors={gradientBackground}
                style={Styles.loginButton}
              >
                <TextCustom
                  title={translate("login")}
                  style={Styles.loginText}
                />
              </ButtonGradient>

              <TextCustom
                onPress={handleForgetPassword}
                title={translate("forgot_password")}
                style={Styles.forgetPassword}
              />

              <TextCustom
                onPress={handleCreateNewAccount}
                title={translate("create_account")}
                style={Styles.createAccount}
              />
            </View>
          </DismissKeyboardView>
        </KeyboardView>
      </ScrollContainer>
    </LinearGradient>
  );
};

const mapDispatchToProps = {
  handleLoginConnect: loginToServer,
};

export default connect(null, mapDispatchToProps)(withTranslate(LoginScreen));
