import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
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
      <FlatList
        horizontal={isHorizontal}
        data={data}
        showsHorizontalScrollIndicator={isHorizontal && isShowIndicator}
        showsVerticalScrollIndicator={!isHorizontal && isShowIndicator}
        renderItem={({ item }) => <ItemComponent item={item} />}
        keyExtractor={(item) => `${item.id}`}
        onEndReachedThreshold={0.5}
        onEndReached={onScrollEnd}
        numColumns={!isHorizontal ? 2 : undefined}
        contentContainerStyle={
          isHorizontal ? Styles.containerHorizontal : Styles.containerVertical
        }
        ListFooterComponent={Loading}
      />
    </View>
  );
};

export default withTranslate(ListItem);
