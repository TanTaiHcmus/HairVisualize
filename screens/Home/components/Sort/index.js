import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import OptionsPopup from "../../../../components/OptionsPopup";
import TextCustom from "../../../../components/TextCustom";
import { SortOptions, SortOrderOptions } from "../../../../constants";
import withTranslate from "../../../../HOC/withTranslate";
import Styles from "./style";

const Sort = ({
  translate,
  type = SortOptions.Time,
  order = SortOrderOptions.DESC,
  onTypeChange,
  onOrderChange,
}) => {
  const sortOptions = Object.values(SortOptions).map((item) => ({
    title: translate(item),
    onPress: () => {
      onTypeChange(item);
    },
  }));

  const sortOrderOptions = Object.values(SortOrderOptions).map((item) => ({
    title: translate(item),
    onPress: () => {
      onOrderChange(item);
    },
  }));

  const [status, setStatus] = useState(0);

  return (
    <View>
      <View style={Styles.container}>
        <View style={Styles.sortItem}>
          <TextCustom title={translate("sort")} />
          <TouchableOpacity
            style={Styles.sortItem}
            onPress={() => {
              setStatus(1);
            }}
            activeOpacity={1}
          >
            <TextCustom title={translate(type)} style={Styles.sortType} />
            <Icon
              name={status === 1 ? "chevron-up" : "chevron-down"}
              size={22}
              style={Styles.dropdownIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={Styles.sortItem}>
          <TextCustom title={translate("order")} />
          <TouchableOpacity
            style={Styles.sortItem}
            onPress={() => {
              setStatus(2);
            }}
            activeOpacity={1}
          >
            <TextCustom title={translate(order)} style={Styles.sortType} />
            <Icon
              name={status === 2 ? "chevron-up" : "chevron-down"}
              size={22}
              style={Styles.dropdownIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {status !== 0 && (
        <OptionsPopup
          title={translate("sort")}
          options={status === 1 ? sortOptions : sortOrderOptions}
          onExit={() => {
            setStatus(0);
          }}
        />
      )}
    </View>
  );
};

export default withTranslate(Sort);
