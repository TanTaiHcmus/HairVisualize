import React, { useState } from "react";
import { TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Styles from "./style";

const TextInputWithIcon = ({
  iconName,
  iconSize,
  isInvalid,
  style,
  isPassword,
  ...props
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <View style={[Styles.container, style, isInvalid ? Styles.invalid : null]}>
      <Icon name={iconName} style={Styles.icon} size={iconSize} solid />
      <TextInput
        style={Styles.inputText}
        secureTextEntry={isShowPassword || !isPassword ? false : true}
        {...props}
      />
      {isPassword && (
        <Icon
          name={isShowPassword ? "eye-slash" : "eye"}
          size={22}
          style={Styles.icon}
          onPress={() => setIsShowPassword(!isShowPassword)}
        />
      )}
    </View>
  );
};

export default React.memo(TextInputWithIcon);
