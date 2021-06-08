import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import ControlPopup from "../../../../components/ControlPopup";
import Item from "../../../../components/Item";
import ListItem from "../../../../components/ListItem";
import Select from "../../../../components/Select";
import {
  LIMIT_HORIZONTAL_ITEMS,
  LIMIT_VERTICAL_ITEMS,
  Screens,
  SortOptions,
  SortOrderOptions,
} from "../../../../constants";
import withTranslate from "../../../../HOC/withTranslate";
import { generateToSortString } from "../../../../utils";
import {
  changeItem,
  deleteItem,
  getHairStyleBankFromServer,
  getUserId,
  unshareItem,
} from "../../action";
import Styles from "./style";

const PopupStatus = {
  SortType: 1,
  SortOrder: 2,
};

const HairStyleBank = ({
  data,
  getDataFromServerConnect,
  changeItemConnect,
  unshareItemConnect,
  deleteItemConnect,
  translate,
  navigation,
  isHorizontal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [popupStatus, setPopupStatus] = useState(null);
  const ref = useRef({
    page: 0,
    limit: isHorizontal ? LIMIT_HORIZONTAL_ITEMS : LIMIT_VERTICAL_ITEMS,
    isEnd: false,
    sortType: SortOptions.Time.id,
    sortOrder: SortOrderOptions.ASC.id,
  });

  const handleReadDataEnd = () => {
    ref.current.isEnd = true;
  };

  const handleSessionChange = (session) => {
    ref.current.session = session;
  };

  const getDataFromServer = async () => {
    if (ref.current.isEnd) return;
    ref.current.page++;
    setIsLoading(true);
    await getDataFromServerConnect(
      {
        page: ref.current.page,
        limit: ref.current.limit,
        sort: generateToSortString(ref.current.sortType, ref.current.sortOrder),
      },
      ref.current.userId,
      handleReadDataEnd,
      handleSessionChange
    );
    setIsLoading(false);
  };

  const reload = () => {
    ref.current.page = 0;
    ref.current.isEnd = false;
    ref.current.session = undefined;
    getDataFromServer();
  };

  const handleItemToggleLike = (item) => {
    changeItemConnect(item);
  };

  const handleToggleMarkPublic = (item) => {
    unshareItemConnect(item);
  };

  const handleDeleteItem = (id) => {
    deleteItemConnect(id);
  };

  useEffect(() => {
    const init = async () => {
      const response = await getUserId();
      if (response) {
        ref.current.userId = response.id;
      }

      reload();

      navigation.addListener("focus", () => {
        reload();
      });
    };

    init();
  }, []);

  return (
    <View style={Styles.container}>
      {!isHorizontal && (
        <ControlPopup
          haveOptionsPopup={popupStatus}
          closeOptionsPopup={() => {
            setPopupStatus(null);
          }}
        >
          <View style={Styles.filterContainer}>
            <Select
              value={ref.current.sortType}
              iconName="filter"
              options={SortOptions}
              isShowOptionsPopup={popupStatus === PopupStatus.SortType}
              setShowOptionsPopup={(value) => {
                setPopupStatus(value ? PopupStatus.SortType : null);
              }}
              onChange={(value) => {
                ref.current.sortType = value;
                reload();
              }}
            />
            <Select
              value={ref.current.sortOrder}
              iconName={
                ref.current.sortOrder === SortOrderOptions.ASC.id
                  ? "caret-up"
                  : "caret-down"
              }
              isShowOptionsPopup={popupStatus === PopupStatus.SortOrder}
              setShowOptionsPopup={(value) => {
                setPopupStatus(value ? PopupStatus.SortOrder : null);
              }}
              options={SortOrderOptions}
              onChange={(value) => {
                ref.current.sortOrder = value;
                reload();
              }}
            />
          </View>
        </ControlPopup>
      )}

      <ListItem
        title={translate(Screens.HairStyleBank)}
        onViewAll={() => {
          navigation.navigate(Screens.HairStyleBank);
        }}
        data={data}
        isHorizontal={isHorizontal}
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
    data: state.hairStyles.hairStyleBank,
  };
};

const mapDispatchToProps = {
  getDataFromServerConnect: getHairStyleBankFromServer,
  changeItemConnect: changeItem,
  unshareItemConnect: unshareItem,
  deleteItemConnect: deleteItem,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(HairStyleBank));
