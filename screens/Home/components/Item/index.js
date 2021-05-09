import React, { useState } from "react";
import { View } from "react-native";
import ImageDisplay from "../../../../components/ImageDisplay";
import withTranslate from "../../../../HOC/withTranslate";
import Interact from "./Interact";
import Owner from "./Owner";
import Styles from "./style";

const Item = ({ style, translate, item }) => {
  const [isLike, setIsLike] = useState(false);

  const onPressItemOptions = [
    {
      title: translate("view"),
      onPress: () => {
        console.log("view", item);
      },
    },
    {
      title: translate("visualize"),
      onPress: () => {
        console.log("visualize", item);
      },
    },
  ];

  const handleToggleLike = () => {
    setIsLike(!isLike);
  };

  return (
    <View style={[Styles.item, style]}>
      <ImageDisplay
        image={item.image}
        onPressOptions={onPressItemOptions}
        style={Styles.image}
      />
      <View style={Styles.infoContainer}>
        <Owner />
        <Interact isLike={isLike} onToggle={handleToggleLike} />
      </View>
    </View>
  );
};

export default withTranslate(Item);
