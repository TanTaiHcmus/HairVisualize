import React, { useState } from "react";
import { Image, Modal, TouchableOpacity, View } from "react-native";
import { isEmpty } from "../../utils";
import Styles from "./style";

const ImageDisplay = ({ image, style }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleImagePress = async () => {
    setIsShowModal(true);
  };

  const uriImage = !isEmpty(image) ? image : "../../images/download.png";

  return (
    <View>
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          style={[Styles.image, style]}
          source={{
            uri: uriImage,
          }}
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
              style={[Styles.image, style]}
              source={{
                uri: uriImage,
              }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(ImageDisplay);
