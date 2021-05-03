import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ImageDisplay from "../../../../components/ImageDisplay";
import ListItem from "../../../../components/ListItem";
import TextCustom from "../../../../components/TextCustom";
import withTranslate from "../../../../HOC/withTranslate";
import Styles from "./style";

const HistoryScreen = ({ translate }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDataFromServer = async () => {
    setIsLoading(true);
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        const fetch =
          data.length < 15
            ? new Array(10).fill().map((item, index) => ({
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
    ];

    return (
      <View style={Styles.item}>
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
      data={data}
      onScrollEnd={getDataFromServer}
      isLoading={isLoading}
      ItemComponent={Item}
    />
  );
};

export default withTranslate(HistoryScreen);
