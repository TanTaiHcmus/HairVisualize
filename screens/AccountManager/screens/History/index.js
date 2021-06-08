import React, { memo, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import Request from "../../../../Api/axios";
import ControlPopup from "../../../../components/ControlPopup";
import ImageDisplay from "../../../../components/ImageDisplay";
import ListItem from "../../../../components/ListItem";
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
  deleteJob,
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
  handleDeleteItemConnect,
  navigation,
  translate,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [popupStatus, setPopupStatus] = useState(null);

  const ref = useRef({
    page: 0,
    limit: LIMIT_VERTICAL_ITEMS,
    isEnd: false,
    sortType: SortOptions.Time.id,
    sortOrder: SortOrderOptions.ASC.id,
    status: JobStatus.ALL.id,
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
        sort: generateToSortString(ref.current.sortType, ref.current.sortOrder),
        filter:
          ref.current.status !== JobStatus.ALL.id
            ? {
                status: { $eq: ref.current.status },
              }
            : undefined,
      },
      handleReadDataEnd
    );
    setIsLoading(false);
  };

  const reload = () => {
    ref.current.page = 0;
    ref.current.isEnd = false;
    getDataFromServer();
  };

  useEffect(() => {
    const connectWebSocket = async () => {
      ref.current.ws = await Request.createWebSocket();
      ref.current.ws.onmessage = (event) => {
        const { signal_type, job_id, status } = JSON.parse(event.data);
        if (signal_type === Signal_Type.SERVER_UPDATE) {
          changeItemStatusConnect(job_id, status);
        }
      };
    };
    reload();
    connectWebSocket();
  }, []);

  const Item = memo(({ item, style }) => {
    return (
      <TouchableOpacity
        style={[Styles.item, style]}
        activeOpacity={isEmpty(item.image) ? 1 : 0.2}
        onPress={() => {
          if (!isEmpty(item.image)) {
            navigation.navigate(Screens.ResultInfo, { id: item.id });
          }
        }}
      >
        <ImageDisplay image={item.image} style={Styles.image} />
        <View style={Styles.infoContainer}>
          <TextCustom
            title={new Date(item.created_at).toLocaleString().trim()}
            numberOfLines={1}
            ellipsizeMode="tail"
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
        {item.status < JobStatus.FINISHED.id ? (
          <TouchableOpacity
            onPress={() => {
              if (ref.current.ws) {
                ref.current.ws.send(
                  JSON.stringify({
                    job_id: item.id,
                    status: JobStatus.CANCEL.id,
                  })
                );
                changeItemStatusConnect(item.id, JobStatus.CANCEL.id);
              }
            }}
            style={[Styles.itemControl, Styles.cancelButton, Styles.button]}
          >
            <TextCustom title={translate("cancel")} style={Styles.text} />
          </TouchableOpacity>
        ) : (
          <View style={Styles.itemControl}>
            <TouchableOpacity
              onPress={() => {
                handleDeleteItemConnect(item.id);
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
            options={SortOrderOptions}
            isShowOptionsPopup={popupStatus === PopupStatus.SortOrder}
            setShowOptionsPopup={(value) => {
              setPopupStatus(value ? PopupStatus.SortOrder : null);
            }}
            onChange={(value) => {
              ref.current.sortOrder = value;
              reload();
            }}
          />
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
              reload();
            }}
          />
        </View>
      </ControlPopup>

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
  handleDeleteItemConnect: deleteJob,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(HistoryScreen));
