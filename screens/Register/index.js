import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, Image, View } from "react-native";
import logoApp from "../../assets/logoApp.png";
import ButtonGradient from "../../components/ButtonGradient";
import DismissKeyboardView from "../../components/DismissKeyboardView";
import KeyboardView from "../../components/KeyboardView";
import ScrollContainer from "../../components/ScrollContainer";
import TextCustom from "../../components/TextCustom";
import TextInputWithIcon from "../../components/TextInputWithIcon";
import { gradientBackground, STATUS_MESSAGE } from "../../constants";
import withTranslate from "../../HOC/withTranslate";
import { isEmpty } from "../../utils";
import { registerToServer } from "./action";
import { Styles } from "./style";

const RegisterScreen = ({ translate, navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (isEmpty(username)) {
      Alert.alert(translate("empty_username"));
      return;
    }
    if (isEmpty(email)) {
      Alert.alert(translate("empty_email"));
      return;
    }
    if (isEmpty(displayName)) {
      Alert.alert(translate("empty_display_name"));
      return;
    }
    if (isEmpty(password)) {
      Alert.alert(translate("empty_password"));
      return;
    }
    if (isEmpty(confirmPassword)) {
      Alert.alert(translate("empty_confirm_password"));
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(translate("confirm_password_not_match"));
      return;
    }

    const response = await registerToServer({
      account: username,
      email,
      password,
      display_name: displayName,
    });

    if (response.message === STATUS_MESSAGE.SUCCESS) {
      Alert.alert(translate("register_success"));
      navigation.goBack();
    } else {
      Alert.alert(translate(response.data.data.message));
    }
  };

  const handleGoBackLogin = () => {
    navigation.goBack();
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
                iconName="mail-open"
                iconSize={22}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder={translate("email")}
                keyboardType="email-address"
                style={Styles.input}
                editable
              />

              <TextInputWithIcon
                iconName="information"
                iconSize={30}
                onChangeText={(text) => setDisplayName(text)}
                value={displayName}
                placeholder={translate("display_name")}
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

              <TextInputWithIcon
                iconName="lock-open"
                iconSize={25}
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                placeholder={translate("confirm_password")}
                style={Styles.input}
                isPassword
                editable
              />
            </View>

            <View style={Styles.controlContainer}>
              <ButtonGradient
                onPress={handleRegister}
                linearGradientColors={gradientBackground}
                style={Styles.registerButton}
              >
                <TextCustom
                  title={translate("register")}
                  style={Styles.registerText}
                />
              </ButtonGradient>

              <TextCustom
                title={translate("already_registered")}
                onPress={handleGoBackLogin}
                style={Styles.backLogin}
              />
            </View>
          </DismissKeyboardView>
        </KeyboardView>
      </ScrollContainer>
    </LinearGradient>
  );
};

export default withTranslate(RegisterScreen);
