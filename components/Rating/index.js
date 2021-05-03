import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { gradientBackground } from "../../constants";
import withTranslate from "../../HOC/withTranslate";
import ButtonGradient from "../ButtonGradient";
import ModalCustom from "../ModalCustom";
import TextCustom from "../TextCustom";
import Styles from "./style";

const Rating = ({ translate, onExit }) => {
  const [rating, setRating] = useState(-1);

  const handleRating = async () => {
    onExit();
  };

  return (
    <ModalCustom onExit={onExit}>
      <View style={Styles.container}>
        <LinearGradient colors={gradientBackground}>
          <TextCustom title={translate("rating")} style={Styles.title} />
        </LinearGradient>

        <View style={Styles.rating}>
          {Array(5)
            .fill(0)
            .map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setRating(index);
                }}
                key={index}
              >
                <Image
                  style={Styles.heart}
                  source={
                    index <= rating
                      ? require("./heart.png")
                      : require("./heart-gray.png")
                  }
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            ))}
        </View>

        <ButtonGradient
          linearGradientColors={gradientBackground}
          onPress={handleRating}
          style={Styles.ratingButton}
        >
          <TextCustom title={translate("rating")} style={Styles.ratingText} />
        </ButtonGradient>
      </View>
    </ModalCustom>
  );
};

export default withTranslate(Rating);
