import React from "react";
import ModalCustom from "../ModalCustom";
import { View } from "react-native";
import Styles from "./style";
import TextCustom from "../TextCustom";
import { LinearGradient } from "expo-linear-gradient";
import { gradientBackground } from "../../constants";
import withTranslate from "../../HOC/withTranslate";

const OptionsPopup = ({ translate, title, options, onExit }) => {
  return (
    <ModalCustom onExit={onExit}>
      <View style={Styles.container}>
        <LinearGradient colors={gradientBackground}>
          <TextCustom title={title} style={Styles.title} />
        </LinearGradient>

        <View style={Styles.optionsContainer}>
          {options.map((option, index) => (
            <TextCustom
              title={option.title}
              onPress={() => {
                option.onPress();
                onExit();
              }}
              style={Styles.option}
              key={index}
            />
          ))}
          <TextCustom
            title={translate("cancel")}
            style={Styles.cancelButton}
            onPress={onExit}
          />
        </View>
      </View>
    </ModalCustom>
  );
};

export default withTranslate(OptionsPopup);
