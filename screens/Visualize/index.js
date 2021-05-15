import React, { useState, useRef } from "react";
import { Alert, FlatList, View, Image } from "react-native";
import ButtonGradient from "../../components/ButtonGradient";
import ImageDisplay from "../../components/ImageDisplay";
import TextCustom from "../../components/TextCustom";
import { gradientBackground, Screens, STATUS_MESSAGE } from "../../constants";
import withTranslate from "../../HOC/withTranslate";
import Icon from "react-native-vector-icons/Ionicons";
import { openCamera } from "../../utils/camera";
import { openGallery } from "../../utils/gallery";
import Styles from "./style";
import ModalCustom from "../../components/ModalCustom";
import { handleVisualize } from "./action";

const HairVisualizeScreen = ({ navigation, translate, route }) => {
  const [oriImage, setOriImage] = useState(null);
  const [desImage, setDesImage] = useState(
    route.params ? route.params.desImage : null
  );
  const [viewImage, setViewImage] = useState(null);

  let flatListRef = useRef(null);

  const getData = () => {
    return [
      { id: "des", image: desImage },
      { id: "ori", image: oriImage },
    ];
  };

  const Item = ({ item }) => {
    const handleImageChange = (value, id) => {
      switch (id) {
        case "des": {
          setDesImage(value);
          break;
        }
        case "ori": {
          setOriImage(value);
          break;
        }
        default: {
          break;
        }
      }
    };

    const onPressOptions = [
      ...(item.image
        ? [
            {
              title: translate("view"),
              onPress: () => {
                setViewImage(item.image);
              },
            },
          ]
        : []),
      {
        title: translate("open_camera"),
        onPress: async () => {
          const result = await openCamera([3, 4]);
          if (result) {
            handleImageChange(result, item.id);
          }
        },
      },
      {
        title: translate("open_gallery"),
        onPress: async () => {
          const result = await openGallery([3, 4]);
          if (result) {
            handleImageChange(result, item.id);
          }
        },
      },
    ];

    return (
      <View style={Styles.itemContainer}>
        <View style={Styles.headerContainer}>
          <TextCustom
            title={translate(
              item.id === "des" ? "upload_des_image" : "upload_ori_image"
            )}
            style={Styles.titleImage}
          />
          <Icon
            name={item.id === "des" ? "chevron-forward" : "chevron-back"}
            size={35}
            style={[
              Styles.icon,
              item.id === "des" ? Styles.rightIcon : Styles.leftIcon,
            ]}
            onPress={() => {
              if (flatListRef) {
                flatListRef.scrollToIndex({
                  animated: true,
                  index: item.id === "des" ? 1 : 0,
                });
              }
            }}
          />
        </View>

        <View style={Styles.imageContainer}>
          <ImageDisplay
            image={item.image}
            onPressOptions={onPressOptions}
            style={Styles.image}
          />
        </View>
      </View>
    );
  };

  const handlePressButton = async () => {
    if (!desImage) {
      Alert.alert(translate("please_upload_des_image"));
      if (flatListRef) {
        flatListRef.scrollToIndex({ animated: true, index: 0 });
      }
      return;
    }

    if (!oriImage) {
      Alert.alert(translate("please_upload_ori_image"));
      if (flatListRef) {
        flatListRef.scrollToIndex({ animated: true, index: 1 });
      }
      return;
    }
    const response = await handleVisualize(desImage, oriImage);
    if (response.message === STATUS_MESSAGE.SUCCESS) {
      navigation.navigate(Screens.History);
    }
  };

  return (
    <View style={Styles.container}>
      <FlatList
        horizontal
        data={getData()}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        ref={(ref) => {
          flatListRef = ref;
        }}
        pagingEnabled
      />

      <ButtonGradient
        linearGradientColors={gradientBackground}
        style={Styles.button}
        onPress={handlePressButton}
      >
        <TextCustom title={translate("visualize")} style={Styles.textButton} />
      </ButtonGradient>

      {viewImage && (
        <ModalCustom
          onExit={() => {
            setViewImage(null);
          }}
        >
          <Image
            style={Styles.image}
            source={{
              uri: viewImage,
            }}
            resizeMode="stretch"
          />
        </ModalCustom>
      )}
    </View>
  );
};

export default withTranslate(HairVisualizeScreen);
