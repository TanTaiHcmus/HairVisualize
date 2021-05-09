import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ListItem from "../../../../components/ListItem";
import { Screens, SortOptions, SortOrderOptions } from "../../../../constants";
import withTranslate from "../../../../HOC/withTranslate";
import Item from "../Item";
import Sort from "../Sort";
import Styles from "./style";

const YourHairStyles = ({ translate, navigation, isHorizontal }) => {
  const [data, setData] = useState([]);
  const [viewImage, setViewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortType, setSortType] = useState(SortOptions.Time);
  const [sortOrder, setSortOrder] = useState(SortOrderOptions.DESC);

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

  return (
    <View style={Styles.container}>
      {!isHorizontal && (
        <Sort
          type={sortType}
          onTypeChange={(type) => {
            setSortType(type);
          }}
          order={sortOrder}
          onOrderChange={(order) => {
            setSortOrder(order);
          }}
        />
      )}

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
    </View>
  );
};

export default withTranslate(YourHairStyles);
