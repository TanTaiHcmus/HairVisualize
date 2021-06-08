import React, { useState } from "react";
import { Image, View } from "react-native";
import { isEmpty } from "../../utils";
import LoadingWrapper from "../LoadingWrapper";
import Styles from "./style";

const ImageDisplay = ({
  image,
  defaultImage = "https://raw.githubusercontent.com/TanTaiHcmus/HairVisualize/master/Images/noImage.png",
  onImageLoaded,
  style,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <LoadingWrapper isLoading={isLoading}>
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
            if (onImageLoaded) onImageLoaded();
          }}
        />
      </LoadingWrapper>
    </View>
  );
};

export default React.memo(ImageDisplay);
