import React from "react";
import { Modal, View, TouchableOpacity } from "react-native";
import Styles from "./style";

const ModalCustom = ({ children, onExit }) => {
  return (
    <Modal
      animationType="slide"
      transparent
      presentationStyle="overFullScreen"
      onRequestClose={onExit}
    >
      <View style={Styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          style={Styles.outside}
          onPress={onExit}
        />
        <View style={Styles.content}>{children}</View>
      </View>
    </Modal>
  );
};

export default ModalCustom;
