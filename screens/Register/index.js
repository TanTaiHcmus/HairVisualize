import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ButtonGradient from "../../components/ButtonGradient";
import ScrollContainer from "../../components/ScrollContainer";
import DismissKeyboardView from "../../components/DismissKeyboardView";
import KeyboardView from "../../components/KeyboardView";
import TextCustom from "../../components/TextCustom";
import TextInputWithIcon from "../../components/TextInputWithIcon";
import {
  AppName,
  ConfirmPasswordIsEmpty,
  ConfirmPasswordIsNotMatch,
  DisplayNameIsEmpty,
  EmailIsEmpty,
  gradientBackground,
  PasswordIsEmpty,
  STATUS_MESSAGE,
  UsernameIsEmpty,
} from "../../constants";
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
      Alert.alert(UsernameIsEmpty);
      return;
    }
    if (isEmpty(email)) {
      Alert.alert(EmailIsEmpty);
      return;
    }
    if (isEmpty(displayName)) {
      Alert.alert(DisplayNameIsEmpty);
      return;
    }
    if (isEmpty(password)) {
      Alert.alert(PasswordIsEmpty);
      return;
    }
    if (isEmpty(confirmPassword)) {
      Alert.alert(ConfirmPasswordIsEmpty);
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(ConfirmPasswordIsNotMatch);
      return;
    }

    const response = await registerToServer({
      account: username,
      email,
      password,
      display_name: displayName,
    });

    if (response.message === STATUS_MESSAGE.SUCCESS) {
      Alert.alert("Register successfully!");
      navigation.goBack();
    } else {
      Alert.alert(response.data.data.message);
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
              <Icon name="logo-instagram" style={Styles.logo} size={100} />
              <TextCustom title={AppName} style={Styles.logoName} />
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
