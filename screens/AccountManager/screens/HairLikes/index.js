import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import Item from "../../../../components/Item";
import ListItem from "../../../../components/ListItem";
import { LIMIT_VERTICAL_ITEMS } from "../../../../constants";
import { changeItem, deleteItem, getHairLikesFromServer } from "./action";
import Styles from "./style";

const HairLikesScreen = ({
  data,
  getDataFromServerConnect,
  changeItemConnect,
  deleteItemConnect,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef({
    page: 0,
    limit: LIMIT_VERTICAL_ITEMS,
    isEnd: false,
  });

  const handleReadDataEnd = () => {
    ref.current.isEnd = true;
  };

  const getDataFromServer = async () => {
    if (ref.current.isEnd) return;
    ref.current.page++;
    setIsLoading(true);
    await getDataFromServerConnect(
      {
        page: ref.current.page,
        limit: ref.current.limit,
      },
      handleReadDataEnd
    );
    setIsLoading(false);
  };

  const handleItemToggleLike = (item) => {
    changeItemConnect(item);
  };

  const handleToggleMarkPublic = (item) => {
    changeItemConnect({
      ...item,
      public: !item.public,
    });
  };

  const handleDeleteItem = (id) => {
    deleteItemConnect(id);
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

  return (
    <View style={Styles.container}>
      <ListItem
        data={data}
        onScrollEnd={getDataFromServer}
        isLoading={isLoading}
        ItemComponent={Item}
        handleItemToggleLike={handleItemToggleLike}
        handleToggleMarkPublic={handleToggleMarkPublic}
        handleDeleteItem={handleDeleteItem}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.hairStyles.hairLikes,
  };
};

const mapDispatchToProps = {
  getDataFromServerConnect: getHairLikesFromServer,
  changeItemConnect: changeItem,
  deleteItemConnect: deleteItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(HairLikesScreen);
