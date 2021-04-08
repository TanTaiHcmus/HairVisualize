import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { openCamera } from "../../utils/camera";
import { openGallery } from "../../utils/gallery";
import ButtonGradient from "../ButtonGradient";
import ImageDisplay from "../ImageDisplay";
import TextCustom from "../TextCustom";
import { Styles } from "./style";

const ImageUpload = ({ image, onChange }) => {
  const handleOpenCamera = async () => {
    const result = await openCamera([4, 3]);
    if (result) {
      onChange(result);
    }
  };

  const handleOpenGallery = async () => {
    const result = await openGallery([4, 3]);
    if (result) {
      onChange(result);
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.imageContainer}>
        {image ? (
          <ImageDisplay image={image} style={Styles.image} />
        ) : (
          <View style={Styles.noImage}>
            <Icon name="cloud-upload-alt" size={70} color="#EE2A7B" />
            <TextCustom
              title="Let's upload from server or open your camera"
              style={Styles.uploadFromServerText}
            />
          </View>
        )}
      </View>
      <ButtonGradient linearGradientColors={["#ef538b", "#ff9707"]}>
        <Icon name="database" size={20} style={Styles.icon} />
        <TextCustom title="Load from server" style={Styles.buttonText} />
      </ButtonGradient>

      <ButtonGradient
        linearGradientColors={["#ef538b", "#ff9707"]}
        onPress={handleOpenGallery}
      >
        <Icon name="store" size={20} style={Styles.icon} />
        <TextCustom title="Load from gallery" style={Styles.buttonText} />
      </ButtonGradient>

      <ButtonGradient
        linearGradientColors={["#ef538b", "#ff9707"]}
        onPress={handleOpenCamera}
      >
        <Icon name="camera" size={20} style={Styles.icon} />
        <TextCustom title="Open camera" style={Styles.buttonText} />
      </ButtonGradient>
    </View>
  );
};

export default ImageUpload;
