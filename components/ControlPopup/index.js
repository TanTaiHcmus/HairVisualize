import React from "react";
import { View, TouchableOpacity } from "react-native";
import Styles from "./style";

const ControlPopup = ({ children, haveOptionsPopup, closeOptionsPopup }) => {
  return (
    <View>
      {children}
      {haveOptionsPopup && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            closeOptionsPopup();
          }}
          style={Styles.outside}
        />
      )}
    </View>
  );
};

export default ControlPopup;
