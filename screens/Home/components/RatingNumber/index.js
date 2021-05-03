import React from "react";
import Styles from "./style";
import { View, Image } from "react-native";

const RatingNumber = ({ rating, style }) => {
  return (
    <View style={[Styles.container, style]}>
      {Array(5)
        .fill()
        .map((item, index) => (
          <Image
            source={
              index < rating
                ? require("./heart.png")
                : require("./heart-gray.png")
            }
            resizeMode="stretch"
            style={Styles.heart}
            key={index}
          />
        ))}
    </View>
  );
};

export default RatingNumber;
