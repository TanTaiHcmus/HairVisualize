import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import withTranslate from "../../HOC/withTranslate";
import { generateOptionsFromObject, getTextFromIdObject } from "../../utils";
import TextCustom from "../TextCustom";
import Styles from "./style";

const Select = ({
  iconName,
  value,
  options,
  onChange,
  isShowOptionsPopup,
  setShowOptionsPopup,
  translate,
}) => {
  const optionsPopup = generateOptionsFromObject(options);

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        onPress={() => {
          setShowOptionsPopup(!isShowOptionsPopup);
        }}
        style={Styles.valueContainer}
      >
        <Icon name={iconName} size={22} style={Styles.icon} />
        <TextCustom
          title={translate(getTextFromIdObject(value, options))}
          style={Styles.text}
        />
        <Icon
          name={!isShowOptionsPopup ? "chevron-up" : "chevron-down"}
          size={22}
          style={Styles.icon}
        />
      </TouchableOpacity>
      {isShowOptionsPopup && (
        <View>
          <View style={Styles.optionsContainer}>
            {optionsPopup.map((option, index) => (
              <TouchableOpacity
                style={[
                  Styles.option,
                  index === optionsPopup.length - 1
                    ? { borderBottomWidth: 0 }
                    : null,
                ]}
                onPress={() => {
                  setShowOptionsPopup(false);
                  onChange(option.id);
                }}
                key={index}
              >
                <TextCustom title={translate(option.text)} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default withTranslate(Select);
