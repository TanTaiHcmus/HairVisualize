import React, { useState } from "react";
import { Image, View, Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome5";
import ButtonGradient from "../ButtonGradient";
import TextCustom from "../TextCustom";
import { Styles } from "./style";
import ImageDisplay from "../ImageDisplay";

const ImageUpload = ({ image, onChange }) => {
  const requestLibraryPermission = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Sorry, we need media library permissions to make this work!"
        );
        return false;
      }
      return true;
    }
  };

  const handleOpenGallery = async () => {
    const hasPermission = await requestLibraryPermission();

    if (hasPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        onChange(result.uri);
      }
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Sorry, we need camera permissions to make this work!");
        return false;
      }
      return true;
    }
  };

  const handleOpenCamera = async () => {
    const hasPermission = await requestCameraPermission();

    if (hasPermission) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        onChange(result.uri);
      }
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.imageContainer}>
        {image ? (
          <ImageDisplay image={image} />
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
