import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ImageDisplay from "../../../../components/ImageDisplay";
import ListItem from "../../../../components/ListItem";
import TextCustom from "../../../../components/TextCustom";
import { Screens } from "../../../../constants";
import withTranslate from "../../../../HOC/withTranslate";
import Styles from "./style";

const YourHairStyles = ({ translate, navigation, isHorizontal }) => {
  const [data, setData] = useState([]);
  const [viewImage, setViewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const numberItemView = isHorizontal ? 4 : 12;

  const getDataFromServer = async () => {
    setIsLoading(true);
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        const fetch =
          data.length < 15
            ? new Array(numberItemView).fill().map((item, index) => ({
                id: index + data.length,
                name: `${index + data.length}`,
              }))
            : [];

        resolve(fetch);
      }, 1000);
    });
    if (result.length > 0) {
      setData([...data, ...result]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

  const Item = ({ item }) => {
    const onPressItemOptions = [
      {
        title: translate("view"),
        onPress: () => {
          console.log("view", item);
        },
      },
      {
        title: translate("delete"),
        onPress: () => {
          console.log("delete", item);
        },
      },
      {
        title: translate("share"),
        onPress: () => {
          console.log("share", item);
        },
      },
    ];

    return (
      <View
        style={[Styles.item, !isHorizontal ? Styles.itemVertical : undefined]}
      >
        <ImageDisplay
          image={item.image}
          onPressOptions={onPressItemOptions}
          style={Styles.image}
        />
        <TextCustom title={item.name} style={Styles.itemName} />
      </View>
    );
  };

  return (
    <ListItem
      title={translate(Screens.YourHairStyle)}
      onViewAll={() => {
        navigation.navigate(Screens.YourHairStyle);
      }}
      data={data}
      isHorizontal={isHorizontal}
      onScrollEnd={getDataFromServer}
      isLoading={isLoading}
      ItemComponent={Item}
    />
  );
};

export default withTranslate(YourHairStyles);
