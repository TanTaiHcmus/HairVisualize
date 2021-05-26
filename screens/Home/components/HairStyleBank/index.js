import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import ListItem from "../../../../components/ListItem";
import {
  LIMIT_HORIZONTAL_ITEMS,
  LIMIT_VERTICAL_ITEMS,
  Screens,
  SortOptions,
  SortOrderOptions,
} from "../../../../constants";
import withTranslate from "../../../../HOC/withTranslate";
import { generateToSortString } from "../../../../utils";
import { getHairStyleBankFromServer, getUserId } from "../../action";
import Sort from "../Sort";
import Item from "./Item";
import Styles from "./style";

const HairStyleBank = ({
  data,
  getDataFromServerConnect,
  translate,
  navigation,
  isHorizontal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef({
    page: 0,
    limit: isHorizontal ? LIMIT_HORIZONTAL_ITEMS : LIMIT_VERTICAL_ITEMS,
    isEnd: false,
    sortType: SortOptions.Time,
    sortOrder: SortOrderOptions.ASC,
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

  useEffect(() => {
    const init = async () => {
      const response = await getUserId();
      if (response) {
        ref.current.userId = response.id;
      }
      getDataFromServer();
      navigation.addListener("focus", () => {
        reload();
      });
    };

    init();
  }, []);

  return (
    <View style={Styles.container}>
      {!isHorizontal && (
        <Sort
          type={ref.current.sortType}
          onTypeChange={(type) => {
            ref.current.sortType = type;
            reload();
          }}
          order={ref.current.sortOrder}
          onOrderChange={(order) => {
            ref.current.sortOrder = order;
            reload();
          }}
        />
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslate(HairStyleBank));
