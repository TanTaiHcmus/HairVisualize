import React, { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import { connect } from "react-redux";
import Item from "../../../../components/Item";
import ListItem from "../../../../components/ListItem";
import { LIMIT_VERTICAL_ITEMS } from "../../../../constants";
import { changeItem, deleteItems, getHairLikesFromServer } from "./action";
import Styles from "./style";
import { downloadItems } from "../../../Home/action";

const HairLikesScreen = ({
  data,
  getDataFromServerConnect,
  changeItemConnect,
  deleteItemsConnect,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemsSelected, setItemsSelected] = useState([]);
  const ref = useRef({
    page: 0,
    limit: LIMIT_VERTICAL_ITEMS,
    isEnd: false,
  });

  const handleReadDataEnd = () => {
    ref.current.isEnd = true;
  };

  const toggleItemSelect = (id) => {
    if (itemsSelected.includes(id)) {
      setItemsSelected(itemsSelected.filter((itemId) => itemId !== id));
    } else {
      setItemsSelected([...itemsSelected, id]);
    }
  };

  const handleDeleteItem = (id) => {
    deleteItemsConnect([id]);
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

  useEffect(() => {
    getDataFromServer();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        itemsSelected.length > 0 ? (
          <View style={Styles.headerButtonContainer}>
            <Icon
              onPress={async () => {
                const response = await deleteItemsConnect(itemsSelected);
                if (response) {
                  setItemsSelected([]);
                }
              }}
              name="trash"
              size={18}
              style={Styles.headerButton}
            />
            <Icon
              onPress={async () => {
                const response = await downloadItems(itemsSelected);
                if (response) {
                  setItemsSelected([]);
                }
              }}
              name="download"
              size={20}
              style={Styles.headerButton}
            />
            <Icon
              onPress={() => {
                setItemsSelected([]);
              }}
              name="arrow-undo"
              size={20}
              style={Styles.headerButton}
            />
          </View>
        ) : undefined,
    });
  }, [itemsSelected.length]);

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
        navigation={navigation}
        itemsSelected={itemsSelected}
        toggleSelect={toggleItemSelect}
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
  deleteItemsConnect: deleteItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(HairLikesScreen);
