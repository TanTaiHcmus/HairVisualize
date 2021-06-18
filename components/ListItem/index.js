import React from "react";
import { ActivityIndicator, VirtualizedList, View } from "react-native";
import withTranslate from "../../HOC/withTranslate";
import TextCustom from "../TextCustom";
import Styles from "./style";

const ListItem = ({
  title,
  onViewAll,
  translate,
  data,
  isHorizontal = false,
  isShowIndicator = false,
  onScrollEnd,
  isLoading,
  ItemComponent,
  handleItemToggleLike,
  handleToggleMarkPublic,
  handleDeleteItem,
  toggleSelect,
  itemsSelected,
  navigation,
}) => {
  const Loading = () => {
    return (
      <View
        style={[
          Styles.loadingContainer,
          isHorizontal ? { marginHorizontal: 15 } : { marginVertical: 15 },
        ]}
      >
        {isLoading ? <ActivityIndicator color="#0d518c" size="large" /> : null}
      </View>
    );
  };

  const itemLength = isHorizontal ? 1 : 2;

  const getItem = (data, index) => {
    const items = [];

    for (let i = 0; i < itemLength; i++) {
      if (index * itemLength + i < data.length)
        items.push(data[index * itemLength + i]);
    }
    return items;
  };

  return (
    <View>
      {isHorizontal && (
        <View style={Styles.headerContainer}>
          <TextCustom title={title} style={Styles.title} />
          <TextCustom
            title={translate("view_all")}
            style={Styles.buttonViewAll}
            onPress={onViewAll}
          />
        </View>
      )}
      <VirtualizedList
        horizontal={isHorizontal}
        data={data}
        getItemCount={(data) => Math.floor((data.length + 1) / itemLength)}
        getItem={getItem}
        showsHorizontalScrollIndicator={isHorizontal && isShowIndicator}
        showsVerticalScrollIndicator={!isHorizontal && isShowIndicator}
        renderItem={({ item: itemColumn }) => (
          <View style={{ flexDirection: "row" }}>
            {itemColumn.map((item) => (
              <ItemComponent
                key={`${item.id}`}
                item={item}
                handleItemToggleLike={handleItemToggleLike}
                handleToggleMarkPublic={handleToggleMarkPublic}
                handleDeleteItem={handleDeleteItem}
                toggleSelect={toggleSelect}
                isSelected={
                  itemsSelected &&
                  itemsSelected.find((itemId) => item.id === itemId)
                }
                canSelect={!isHorizontal}
                haveItemSelected={itemsSelected && itemsSelected.length > 0}
                style={
                  !isHorizontal ? Styles.itemVertical : Styles.itemHorizontal
                }
                navigation={navigation}
              />
            ))}
          </View>
        )}
        removeClippedSubviews
        keyExtractor={(item, index) => `${index}`}
        onEndReachedThreshold={0.5}
        onEndReached={onScrollEnd}
        contentContainerStyle={
          isHorizontal ? Styles.containerHorizontal : Styles.containerVertical
        }
        ListFooterComponent={Loading}
      />
    </View>
  );
};

export default React.memo(withTranslate(ListItem));
