import React, { useState } from "react";
import { Image, TouchableOpacity, Modal, View } from "react-native";
import Styles from "./style";

const ImageDisplay = ({ image }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleImagePress = () => {
    setIsShowModal(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          style={Styles.image}
          source={{ uri: image }}
          resizeMode="stretch"
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent
        visible={isShowModal}
        presentationStyle="overFullScreen"
        onRequestClose={() => {
          setIsShowModal(false);
        }}
      >
        <View style={Styles.modal}>
          <TouchableOpacity
            activeOpacity={1}
            style={Styles.outsideImage}
            onPress={() => {
              setIsShowModal(false);
            }}
          />
          <TouchableOpacity activeOpacity={1} style={Styles.imageShowContainer}>
            <Image
              style={Styles.image}
              source={{ uri: image }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(ImageDisplay);
