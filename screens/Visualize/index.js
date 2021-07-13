import React, { memo, useRef, useState } from "react";
import { Alert, FlatList, Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ButtonGradient from "../../components/ButtonGradient";
import ImageDisplay from "../../components/ImageDisplay";
import ModalCustom from "../../components/ModalCustom";
import OptionsPopup from "../../components/OptionsPopup";
import TextCustom from "../../components/TextCustom";
import { gradientBackground, Screens } from "../../constants";
import withTranslate from "../../HOC/withTranslate";
import { getFileFromUri } from "../../utils";
import { openCamera } from "../../utils/camera";
import { openGallery } from "../../utils/gallery";
import { handleVisualize } from "./action";
import Styles from "./style";

const HairVisualizeScreen = ({ navigation, translate, route }) => {
  const [oriImage, setOriImage] = useState(
    route.params && route.params.oriImage ? route.params.oriImage.image : null
  );
  const [desImage, setDesImage] = useState(
    route.params && route.params.desImage ? route.params.desImage.image : null
  );
  const [viewImage, setViewImage] = useState(null);

  let flatListRef = useRef(null);

  const getData = () => {
    return [
      { id: "des", image: desImage },
      { id: "ori", image: oriImage },
    ];
  };

  const Item = memo(({ item }) => {
    const [isShowImageOptions, setIsShowImageOptions] = useState(false);
    const ref = useRef({ imageLoaded: false });

    const handleImageOptionsExit = () => {
      setIsShowImageOptions(false);
    };

    const handleImagePress = async () => {
      if (ref.current.imageLoaded) setIsShowImageOptions(true);
    };

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
      <View>
        <TouchableOpacity
          style={Styles.itemContainer}
          onPress={handleImagePress}
        >
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
              onImageLoaded={() => {
                ref.current.imageLoaded = true;
              }}
              style={Styles.image}
            />
          </View>
        </TouchableOpacity>
        {isShowImageOptions && (
          <OptionsPopup
            title={translate("select_image_options")}
            options={onPressOptions}
            onExit={handleImageOptionsExit}
          />
        )}
      </View>
    );
  });

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

    const response = await handleVisualize({
      ...(route.params &&
      route.params.desImage &&
      desImage === route.params.desImage.image
        ? { example_file_id: route.params.desImage.id }
        : { example_file: getFileFromUri(desImage) }),
      ...(route.params &&
      route.params.oriImage &&
      oriImage === route.params.oriImage.image
        ? { origin_file_id: route.params.oriImage.id }
        : { origin_file: getFileFromUri(oriImage) }),
    });
    if (response) {
      navigation.replace(Screens.History);
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
          <View style={Styles.imageBackground}>
            <Image
              style={Styles.image}
              source={{
                uri: viewImage,
              }}
              resizeMode="stretch"
            />
          </View>
        </ModalCustom>
      )}
    </View>
  );
};

export default withTranslate(HairVisualizeScreen);
