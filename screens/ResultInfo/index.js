import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ImageDisplay from "../../components/ImageDisplay";
import TextCustom from "../../components/TextCustom";
import withTranslate from "../../HOC/withTranslate";
import { getJobInfoFromServer } from "./action";
import Styles from "./style";

const ResultInfoScreen = ({ navigation, translate, route }) => {
  const [job, setJob] = useState({});

  useEffect(() => {
    const getJobInfo = async () => {
      const response = await getJobInfoFromServer(route.params.id);
      if (response) {
        setJob(response);
      }
    };
    getJobInfo();
  }, []);

  let flatListRef = useRef(null);

  const getData = () => {
    return [
      { order: 0, title: "des", image: job.desImage },
      { order: 1, title: "ori", image: job.oriImage },
      { order: 2, title: "result", image: job.resultImage },
    ];
  };

  const Item = ({ item }) => {
    return (
      <View style={Styles.itemContainer}>
        <View style={Styles.headerContainer}>
          {item.order !== 0 && (
            <Icon
              name="chevron-back"
              size={35}
              style={[Styles.icon, Styles.leftIcon]}
              onPress={() => {
                if (flatListRef) {
                  flatListRef.scrollToIndex({
                    animated: true,
                    index: item.order - 1,
                  });
                }
              }}
            />
          )}
          <TextCustom title={translate(item.title)} style={Styles.titleImage} />
          {item.order !== 2 && (
            <Icon
              name="chevron-forward"
              size={35}
              style={[Styles.icon, Styles.rightIcon]}
              onPress={() => {
                if (flatListRef) {
                  flatListRef.scrollToIndex({
                    animated: true,
                    index: item.order + 1,
                  });
                }
              }}
            />
          )}
        </View>

        <View style={Styles.imageContainer}>
          <ImageDisplay image={item.image} style={Styles.image} />
        </View>
      </View>
    );
  };

  return (
    <View style={Styles.container}>
      <FlatList
        horizontal
        data={getData()}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => `${item.order}`}
        showsHorizontalScrollIndicator={false}
        ref={(ref) => {
          flatListRef = ref;
        }}
        pagingEnabled
      />
    </View>
  );
};

export default withTranslate(ResultInfoScreen);
