import React from "react";
import { View } from "react-native";
import withTranslate from "../../HOC/withTranslate";
import { openCamera } from "../../utils/camera";
import { openGallery } from "../../utils/gallery";
import ImageDisplay from "../ImageDisplay";
import TextCustom from "../TextCustom";
import Styles from "./style";

const ImageUpload = ({ translate, title, image, onChange }) => {
  const onPressOptions = [
    {
      title: translate("open_camera"),
      onPress: async () => {
        const result = await openCamera([3, 4]);
        if (result) {
          onChange(result);
        }
      },
    },
    {
      title: translate("open_gallery"),
      onPress: async () => {
        const result = await openGallery([3, 4]);
        if (result) {
          onChange(result);
        }
      },
    },
  ];

  return (
    <View style={Styles.container}>
      <TextCustom title={title} style={Styles.title} />
      <ImageDisplay
        image={image}
        onPressOptions={onPressOptions}
        style={Styles.image}
      />
    </View>
  );
};

export default withTranslate(ImageUpload);
