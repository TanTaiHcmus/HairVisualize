// import CheckBox from "@react-native-community/checkbox";
import React, { useState, useContext } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Container from "../../components/Container";
import DismissKeyboardView from "../../components/DismissKeyboardView";
import KeyboardView from "../../components/KeyboardView";
import TextCustom from "../../components/TextCustom";
import TextInputWithIcon from "../../components/TextInputWithIcon";
import AppContext from "../../context";
import { Styles } from "./style";
import Button from "../../components/Button";

const LoginScreen = ({ navigation }) => {
  const context = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCheck, setIsCheck] = useState(false);

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
            <TextCustom title="Forget password?" />
          </View>

          <Button
            onPress={() => {
              context.setIsLogin(true);
            }}
          >
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
