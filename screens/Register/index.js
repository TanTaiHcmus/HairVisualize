import React, { useState } from "react";
import { View, Alert } from "react-native";
import UserApi from "../../Api/userApi";
import Button from "../../components/Button";
import Container from "../../components/Container";
import DismissKeyboardView from "../../components/DismissKeyboardView";
import KeyboardView from "../../components/KeyboardView";
import TextCustom from "../../components/TextCustom";
import TextInputWithIcon from "../../components/TextInputWithIcon";
import {
  ConfirmPasswordIsEmpty,
  ConfirmPasswordIsNotMatch,
  DisplayNameIsEmpty,
  EmailIsEmpty,
  PasswordIsEmpty,
  UsernameIsEmpty,
} from "../../constants";
import { isEmpty } from "../../utils";
import { Styles } from "./style";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const handleRegister = () => {
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

    UserApi.register({
      account: username,
      email: email,
      display_name: displayName,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <KeyboardView enabled={isEnabled}>
      <DismissKeyboardView>
        <Container>
          <TextInputWithIcon
            iconName="user"
            iconSize={24}
            onChangeText={(text) => setUsername(text)}
            value={username}
            placeholder="Username"
            onFocus={() => setIsEnabled(false)}
            editable
          />

          <TextInputWithIcon
            iconName="envelope"
            iconSize={22}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            onFocus={() => setIsEnabled(false)}
            editable
          />

          <TextInputWithIcon
            iconName="info"
            iconSize={27}
            onChangeText={(text) => setDisplayName(text)}
            value={displayName}
            placeholder="Display name"
            onFocus={() => setIsEnabled(false)}
            editable
          />

          <TextInputWithIcon
            iconName="lock"
            iconSize={28}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            onFocus={() => setIsEnabled(false)}
            isPassword
            editable
          />

          <TextInputWithIcon
            iconName="lock"
            iconSize={28}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            placeholder="Confirm password"
            style={{ marginBottom: 80 }}
            onFocus={() => setIsEnabled(true)}
            isPassword
            editable
          />

          <Button onPress={handleRegister}>
            <TextCustom title="Register" style={Styles.buttonText}></TextCustom>
          </Button>

          <View style={Styles.registerQuestion}>
            <TextCustom title="Already registered?" />
            <TextCustom
              style={Styles.registerText}
              onPress={() => {
                navigation.goBack();
              }}
              title="Log in"
            />
          </View>
        </Container>
      </DismissKeyboardView>
    </KeyboardView>
  );
};

export default RegisterScreen;
