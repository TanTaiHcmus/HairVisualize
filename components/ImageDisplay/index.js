import React, { useState } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { isEmpty } from "../../utils";
import LoadingWrapper from "../LoadingWrapper";
import ModalCustom from "../ModalCustom";
import Styles from "./style";

const ImageDisplay = ({
  image,
  defaultImage = "https://raw.githubusercontent.com/TanTaiHcmus/HairVisualize/master/Images/image.png",
  style,
}) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImagePress = async () => {
    setIsShowModal(true);
  };

  const handleModalExit = () => {
    setIsLoading(false);
    setIsShowModal(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          style={[Styles.image, style]}
          source={{
            uri: isEmpty(image) ? defaultImage : image,
          }}
          resizeMode="stretch"
        />
      </TouchableOpacity>
      {isShowModal && (
        <ModalCustom onExit={handleModalExit}>
          <LoadingWrapper isLoading={isLoading} style={Styles.modal}>
            <Image
              style={[Styles.image, style]}
              source={{
                uri: isEmpty(image) ? defaultImage : image,
              }}
              resizeMode="stretch"
              onLoadStart={() => {
                setIsLoading(true);
              }}
              onLoadEnd={() => {
                setIsLoading(false);
              }}
            />
          </LoadingWrapper>
        </ModalCustom>
      )}
    </View>
  );
};

export default React.memo(ImageDisplay);
