import React, { memo, useEffect, useRef, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import Request from "../../../../Api/axios";
import ImageDisplay from "../../../../components/ImageDisplay";
import ListItem from "../../../../components/ListItem";
import MenuFilter from "../../../../components/MenuFilter";
import Select from "../../../../components/Select";
import TextCustom from "../../../../components/TextCustom";
import {
  JobStatus,
  LIMIT_VERTICAL_ITEMS,
  Screens,
  Signal_Type,
  SortOptions,
  SortOrderOptions,
} from "../../../../constants";
import withTranslate from "../../../../HOC/withTranslate";
import { generateToSortString, isEmpty } from "../../../../utils";
import {
  changeItemStatus,
  deleteJobs,
  getHistoryFromServer,
  getJobInfo,
  handleGetStatusTextFromId,
} from "./action";
import Styles from "./style";

const PopupStatus = {
  SortType: 1,
  SortOrder: 2,
  Status: 3,
};

const HistoryScreen = ({
  data,
  getDataFromServerConnect,
  changeItemStatusConnect,
  deleteItemsConnect,
  navigation,
  translate,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [popupStatus, setPopupStatus] = useState(null);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const ref = useRef({
    page: 0,
    limit: LIMIT_VERTICAL_ITEMS,
    isEnd: false,
    sortType: SortOptions.Time.id,
    sortOrder: SortOrderOptions.DESC.id,
    prevSortOrder: SortOrderOptions.DESC.id,
    prevSortType: SortOptions.Time.id,
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

  const getDataFromServer = async () => {
    if (ref.current.isEnd) return;
    ref.current.page++;
    setIsLoading(true);
    await getDataFromServerConnect(
      {
        page: ref.current.page,
        limit: ref.current.limit,
        sort: generateToSortString(ref.current.sortType, ref.current.sortOrder),
        filter:
          ref.current.status && ref.current.status !== JobStatus.ALL.id
            ? {
                status: { $eq: ref.current.status },
              }
            : undefined,
      },
      handleReadDataEnd
    );
    setIsLoading(false);
  };

  const handleDeleteItem = (id) => {
    deleteItemsConnect([id]);
  };

  const reload = () => {
    ref.current.page = 0;
    ref.current.isEnd = false;
    if (itemsSelected.length > 0) setItemsSelected([]);
    getDataFromServer();
  };

  const checkFilterStateChange = () => {
    return (
      ref.current.prevSortOrder !== ref.current.sortOrder ||
      ref.current.prevSortType !== ref.current.sortType ||
      ref.current.prevStatus !== ref.current.status
    );
  };

  useEffect(() => {
    const connectWebSocket = async () => {
      ref.current.ws = await Request.createWebSocket();
      ref.current.ws.onmessage = (event) => {
        const { signal_type, job_id, status, error_code } = JSON.parse(
          event.data
        );
        if (signal_type === Signal_Type.SERVER_UPDATE) {
          changeItemStatusConnect(job_id, status, error_code);
        }
      };
    };
    reload();
    connectWebSocket();
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

  const Item = memo(({ item, style }) => {
    const handleItemPress = () => {
      if (!isEmpty(item.image)) {
        navigation.navigate(Screens.ResultInfo, { id: item.id });
      } else {
        Alert.alert(translate(item.error_log || "result_file_not_found"));
      }
    };
    return (
      <TouchableOpacity
        style={[Styles.item, style]}
        onPress={() => {
          if (itemsSelected.length > 0) {
            toggleItemSelect(item.id);
          } else handleItemPress();
        }}
        onLongPress={() => {
          toggleItemSelect(item.id);
        }}
      >
        <ImageDisplay image={item.image} style={Styles.image} />
        <View style={Styles.infoContainer}>
          <TextCustom
            title={new Date(item.created_at).toDateString().trim()}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={Styles.createdAtText}
          />
          <TextCustom
            title={translate(handleGetStatusTextFromId(item.status))}
            style={{
              color: item.status !== JobStatus.FINISHED.id ? "red" : "green",
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
        </View>
        {itemsSelected.find((itemId) => item.id === itemId) && (
          <Icon
            name="checkmark"
            size={25}
            color="#fff"
            style={Styles.checkIcon}
          />
        )}
        {item.status < JobStatus.FINISHED.id ? (
          <TouchableOpacity
            onPress={() => {
              if (ref.current.ws && item.status === JobStatus.PENDING.id) {
                ref.current.ws.send(
                  JSON.stringify({
                    job_id: item.id,
                    status: JobStatus.CANCEL.id,
                  })
                );
                changeItemStatusConnect(item.id, JobStatus.CANCEL.id);
              }
            }}
            style={[
              Styles.itemControl,
              Styles.cancelButton,
              Styles.button,
              item.status > JobStatus.PENDING.id ? { opacity: 0.5 } : undefined,
            ]}
          >
            <TextCustom title={translate("cancel")} style={Styles.text} />
          </TouchableOpacity>
        ) : (
          <View style={Styles.itemControl}>
            <TouchableOpacity
              onPress={() => {
                handleDeleteItem(item.id);
              }}
              style={[Styles.button, Styles.deleteButton]}
            >
              <TextCustom title={translate("delete")} style={Styles.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                const response = await getJobInfo(item.id);
                if (response) {
                  navigation.replace(Screens.HairVisualize, response);
                }
              }}
              style={[Styles.button, Styles.tryAgainButton]}
            >
              <TextCustom title={translate("try_again")} style={Styles.text} />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  });

  return (
    <View style={Styles.container}>
      <MenuFilter
        isShowMenu={isShowMenu}
        handleToggle={() => {
          if (isShowMenu && checkFilterStateChange()) {
            reload();
            ref.current.prevSortOrder = ref.current.sortOrder;
            ref.current.prevSortType = ref.current.sortType;
            ref.current.prevStatus = ref.current.status;
          }
          setIsShowMenu(!isShowMenu);
        }}
        handleHidePopup={() => {
          if (popupStatus) setPopupStatus(null);
        }}
      >
        <Select
          value={ref.current.status}
          iconName="funnel"
          options={JobStatus}
          isShowOptionsPopup={popupStatus === PopupStatus.Status}
          setShowOptionsPopup={(value) => {
            setPopupStatus(value ? PopupStatus.Status : null);
          }}
          onChange={(value) => {
            ref.current.status = value;
          }}
          placeholder={translate("status")}
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
          options={SortOrderOptions}
          isShowOptionsPopup={popupStatus === PopupStatus.SortOrder}
          setShowOptionsPopup={(value) => {
            setPopupStatus(value ? PopupStatus.SortOrder : null);
          }}
          placeholder={translate("sort_order")}
          onChange={(value) => {
            ref.current.sortOrder = value;
          }}
        />
      </MenuFilter>

      <ListItem
        data={data}
        onScrollEnd={getDataFromServer}
        isLoading={isLoading}
        ItemComponent={Item}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.history.data,
  };
};

const mapDispatchToProps = {
  getDataFromServerConnect: getHistoryFromServer,
  changeItemStatusConnect: changeItemStatus,
  deleteItemsConnect: deleteJobs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(HistoryScreen));
