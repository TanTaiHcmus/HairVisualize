import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import Item from "../../../../components/Item";
import ListItem from "../../../../components/ListItem";
import MenuFilter from "../../../../components/MenuFilter";
import Select from "../../../../components/Select";
import {
  FileTypeOptions,
  GenderOptions,
  LIMIT_HORIZONTAL_ITEMS,
  LIMIT_VERTICAL_ITEMS,
  Screens,
  SortOptions,
  SortOrderOptions,
  StyleOptions,
} from "../../../../constants";
import withTranslate from "../../../../HOC/withTranslate";
import { generateToSortString } from "../../../../utils";
import {
  changeItem,
  deleteItems,
  downloadItems,
  getHairStyleBankFromServer,
  getUserId,
  unshareItem,
} from "../../action";
import Styles from "./style";

const PopupStatus = {
  SortType: 1,
  SortOrder: 2,
  Gender: 3,
  Style: 4,
  FileType: 5,
};

const HairStyleBank = ({
  data,
  getDataFromServerConnect,
  changeItemConnect,
  unshareItemConnect,
  deleteItemsConnect,
  translate,
  navigation,
  isHorizontal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [popupStatus, setPopupStatus] = useState(null);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const ref = useRef({
    page: 0,
    limit: isHorizontal ? LIMIT_HORIZONTAL_ITEMS : LIMIT_VERTICAL_ITEMS,
    isEnd: false,
    sortType: SortOptions.Time.id,
    sortOrder: SortOrderOptions.DESC.id,
    prevSortType: SortOptions.Time.id,
    prevSortOrder: SortOrderOptions.DESC.id,
  });

  const toggleItemSelect = (id) => {
    if (itemsSelected.includes(id)) {
      setItemsSelected(itemsSelected.filter((itemId) => itemId !== id));
    } else {
      setItemsSelected([...itemsSelected, id]);
    }
  };

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
        filter: {
          style:
            ref.current.style && ref.current.style !== StyleOptions.ALL.id
              ? { $eq: ref.current.style }
              : null,
          gender:
            ref.current.gender && ref.current.gender !== GenderOptions.ALL.id
              ? { $eq: ref.current.gender }
              : null,
          file_type:
            ref.current.fileType &&
            ref.current.fileType !== FileTypeOptions.ALL.id
              ? { $eq: ref.current.fileType }
              : null,
        },
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
    if (itemsSelected.length > 0) setItemsSelected([]);
    getDataFromServer();
  };

  const handleItemToggleLike = (item) => {
    changeItemConnect(item);
  };

  const handleToggleMarkPublic = (item) => {
    unshareItemConnect(item);
  };

  const handleDeleteItem = (id) => {
    deleteItemsConnect([id]);
  };

  const checkFilterStateChange = () => {
    return (
      ref.current.prevSortOrder !== ref.current.sortOrder ||
      ref.current.prevSortType !== ref.current.sortType ||
      ref.current.prevGender !== ref.current.gender ||
      ref.current.prevStyle !== ref.current.style ||
      ref.current.prevFileType !== ref.current.fileType
    );
  };

  useEffect(() => {
    let listener;
    const init = async () => {
      const response = await getUserId();
      if (response) {
        ref.current.userId = response.id;
      }

      reload();

      listener = navigation.addListener("focus", () => {
        reload();
      });
    };

    init();
    return listener;
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
      {!isHorizontal && (
        <MenuFilter
          isShowMenu={isShowMenu}
          handleToggle={() => {
            if (isShowMenu && checkFilterStateChange()) {
              reload();
              ref.current.prevSortOrder = ref.current.sortOrder;
              ref.current.prevSortType = ref.current.sortType;
              ref.current.prevGender = ref.current.gender;
              ref.current.prevStyle = ref.current.style;
              ref.current.prevFileType = ref.current.fileType;
            }
            setIsShowMenu(!isShowMenu);
          }}
          handleHidePopup={() => {
            if (popupStatus) setPopupStatus(null);
          }}
        >
          <Select
            value={ref.current.fileType}
            iconName="funnel"
            options={FileTypeOptions}
            isShowOptionsPopup={popupStatus === PopupStatus.FileType}
            setShowOptionsPopup={(value) => {
              setPopupStatus(value ? PopupStatus.FileType : null);
            }}
            onChange={(value) => {
              ref.current.fileType = value;
            }}
            placeholder={translate("type")}
          />
          <Select
            value={ref.current.sortType}
            iconName="funnel"
            options={SortOptions}
            isShowOptionsPopup={popupStatus === PopupStatus.SortType}
            setShowOptionsPopup={(value) => {
              setPopupStatus(value ? PopupStatus.SortType : null);
            }}
            onChange={(value) => {
              ref.current.sortType = value;
            }}
            placeholder={translate("sort_type")}
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
            }}
            placeholder={translate("sort_order")}
          />
          <Select
            value={ref.current.style}
            iconName="filter"
            options={StyleOptions}
            isShowOptionsPopup={popupStatus === PopupStatus.Style}
            setShowOptionsPopup={(value) => {
              setPopupStatus(value ? PopupStatus.Style : null);
            }}
            onChange={(value) => {
              ref.current.style = value;
            }}
            placeholder={translate("select_style")}
          />
          <Select
            value={ref.current.gender}
            iconName="transgender"
            isShowOptionsPopup={popupStatus === PopupStatus.Gender}
            setShowOptionsPopup={(value) => {
              setPopupStatus(value ? PopupStatus.Gender : null);
            }}
            options={GenderOptions}
            onChange={(value) => {
              ref.current.gender = value;
            }}
            placeholder={translate("select_gender")}
          />
        </MenuFilter>
      )}

      <ListItem
        title={translate(Screens.HairStyleBank)}
        onViewAll={() => {
          navigation.navigate(Screens.HairStyleBank);
        }}
        data={data}
        itemsSelected={itemsSelected}
        isHorizontal={isHorizontal}
        onScrollEnd={getDataFromServer}
        isLoading={isLoading}
        ItemComponent={Item}
        handleItemToggleLike={handleItemToggleLike}
        handleToggleMarkPublic={handleToggleMarkPublic}
        handleDeleteItem={handleDeleteItem}
        toggleSelect={toggleItemSelect}
        navigation={navigation}
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
  deleteItemsConnect: deleteItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(HairStyleBank));
