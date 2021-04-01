// import CheckBox from "@react-native-community/checkbox";
import React, { useContext, useState } from "react";
import { Alert, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import UserApi from "../../Api/userApi";
import Button from "../../components/Button";
import Container from "../../components/Container";
import DismissKeyboardView from "../../components/DismissKeyboardView";
import KeyboardView from "../../components/KeyboardView";
import TextCustom from "../../components/TextCustom";
import TextInputWithIcon from "../../components/TextInputWithIcon";
import { STATUS_MESSAGE } from "../../constants";
import AppContext from "../../context";
import { setTokenFromStorage } from "../../utils";
import { Styles } from "./style";

const LoginScreen = ({ navigation }) => {
  const context = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCheck, setIsCheck] = useState(false);

  const handleLogin = async () => {
    const response = await UserApi.login({ username, password });

    if (response.message === STATUS_MESSAGE.SUCCESS) {
      await setTokenFromStorage(response.data.access_token);
      context.setIsLogin(true);
    } else {
      Alert.alert(response.data.message);
    }
  };

  const handleForgetPassword = async () => {
    // const response = await
  };

  return (
    <KeyboardView>
      <DismissKeyboardView>
        <Container>
          <TextInputWithIcon
            iconName="user"
            iconSize={24}
            onChangeText={(text) => setUsername(text)}
            value={username}
            placeholder="Username"
            editable
          />

          <TextInputWithIcon
            iconName="lock"
            iconSize={28}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            isPassword
            editable
          />

          <View style={Styles.helpContainer}>
            <View style={Styles.checkboxContainer}>
              {/* <CheckBox
                value={isCheck}
                onValueChange={(isCheck) => setIsCheck(isCheck)}
                tintColors={{ true: "#EE2A7B", false: "#707070" }}
                style={Styles.checkbox}
              /> */}
              <TextCustom title="Remember" />
            </View>
            <TextCustom
              title="Forget password?"
              onPress={handleForgetPassword}
            />
          </View>

          <Button onPress={handleLogin}>
            <TextCustom
              title="Log in"
              style={[Styles.buttonText, Styles.bold]}
            />
          </Button>

          <TextCustom
            title="Or"
            style={[Styles.bold, { marginBottom: 30, fontSize: 18 }]}
          />

          <View style={Styles.socialLoginContainer}>
            <View style={Styles.socialLogin}>
              <Icon name="facebook" size={30} color="#3b5ba6" />
            </View>

            <View style={Styles.socialLogin}>
              <Icon name="google" size={30} color="#dc4a38" />
            </View>
          </View>

          <View style={Styles.loginQuestion}>
            <TextCustom title="Did you have an account?" />
            <TextCustom
              style={Styles.loginText}
              onPress={() => {
                navigation.navigate("Register");
              }}
              title="Register"
            />
          </View>
        </Container>
      </DismissKeyboardView>
    </KeyboardView>
  );
};

export default LoginScreen;
