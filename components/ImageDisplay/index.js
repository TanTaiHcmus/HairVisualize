import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import withTranslate from "../../HOC/withTranslate";
import { isEmpty } from "../../utils";
import LoadingWrapper from "../LoadingWrapper";
import OptionsPopup from "../OptionsPopup";
import Styles from "./style";

const ImageDisplay = ({
  translate,
  image,
  defaultImage = "https://raw.githubusercontent.com/TanTaiHcmus/HairVisualize/master/Images/image.png",
  onPressOptions = [],
  style,
}) => {
  const [isShowImageOptions, setIsShowImageOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImagePress = async () => {
    setIsShowImageOptions(true);
  };

  const handleImageOptionsExit = () => {
    setIsShowImageOptions(false);
  };

  return (
    <View>
      <LoadingWrapper isLoading={isLoading}>
        <TouchableOpacity
          onPress={onPressOptions.length > 0 ? handleImagePress : undefined}
          activeOpacity={onPressOptions.length > 0 ? 0.2 : 1}
        >
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
        </TouchableOpacity>
      </LoadingWrapper>
      {isShowImageOptions && (
        <OptionsPopup
          title={translate("select_image_options")}
          options={onPressOptions}
          onExit={handleImageOptionsExit}
        />
      )}
    </View>
  );
};

export default React.memo(withTranslate(ImageDisplay));
