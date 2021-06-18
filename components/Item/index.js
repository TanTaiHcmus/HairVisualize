import React, { useMemo, useState, useRef } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { GenderOptions, Screens, StyleOptions } from "../../constants";
import withTranslate from "../../HOC/withTranslate";
import {
  handleMarkFileLiked,
  handleMarkPublic,
} from "../../screens/Home/action";
import ImageDisplay from "../ImageDisplay";
import Interact from "../Interact";
import ModalCustom from "../ModalCustom";
import OptionsPopup from "../OptionsPopup";
import Owner from "../Owner";
import TextCustom from "../TextCustom";
import Styles from "./style";

const showImageOptionsStatus = {
  ItemOptions: 1,
  VisualizeOptions: 2,
  GenderOptions: 3,
  StyleOptions: 4,
};

const Item = ({
  style,
  item,
  handleItemToggleLike,
  handleToggleMarkPublic,
  handleDeleteItem,
  toggleSelect,
  isSelected,
  canSelect,
  haveItemSelected,
  translate,
  navigation,
}) => {
  const [isViewImage, setIsViewImage] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(null);
  const ref = useRef({ imageLoaded: false });

  const handleToggleLike = async () => {
    const response = await handleMarkFileLiked(item.id, !item.liked);
    if (response) {
      handleItemToggleLike({
        ...item,
        liked: !item.liked,
        interact: {
          ...item.interact,
          numLikes: item.interact.numLikes + (item.liked ? -1 : 1),
        },
      });
    }
  };

  const handleMarkPublicItem = async () => {
    const response = await handleMarkPublic({
      id: item.id,
      status: !item.public,
      ...(ref.current.gender && ref.current.style
        ? {
            gender: ref.current.gender || undefined,
            style: ref.current.style || undefined,
          }
        : {}),
    });
    if (response) {
      handleToggleMarkPublic({
        ...item,
        ...(ref.current.gender && ref.current.style
          ? { gender: ref.current.gender, style: ref.current.style }
          : {}),
      });
    }
  };

  const onPressVisualizeOptions = useMemo(
    () => [
      {
        title: translate("des"),
        onPress: () => {
          navigation.navigate(Screens.HairVisualize, { desImage: item.image });
        },
      },
      {
        title: translate("ori"),
        onPress: () => {
          navigation.navigate(Screens.HairVisualize, { oriImage: item.image });
        },
      },
    ],
    [item]
  );

  const onPressGenderOptions = useMemo(
    () => [
      {
        title: translate(GenderOptions.MALE.text),
        onPress: () => {
          ref.current.gender = GenderOptions.MALE.id;
          setShowImageOptions(showImageOptionsStatus.StyleOptions);
        },
        preventExit: true,
      },
      {
        title: translate(GenderOptions.FEMALE.text),
        onPress: () => {
          ref.current.gender = GenderOptions.FEMALE.id;
          setShowImageOptions(showImageOptionsStatus.StyleOptions);
        },
        preventExit: true,
      },
    ],
    []
  );

  const onPressStyleOptions = useMemo(
    () => [
      {
        title: translate(StyleOptions.LONG.text),
        onPress: () => {
          ref.current.style = StyleOptions.LONG.id;
          handleMarkPublicItem();
        },
      },
      {
        title: translate(StyleOptions.SHORT.text),
        onPress: () => {
          ref.current.style = StyleOptions.SHORT.id;
          handleMarkPublicItem();
        },
      },
    ],
    [item]
  );

  const onPressItemOptions = useMemo(
    () => [
      {
        title: translate("view"),
        onPress: () => {
          setIsViewImage(true);
        },
      },
      ...(item.isOwn
        ? [
            {
              title: translate(item.public ? "un_share" : "share"),
              onPress: () => {
                if (!item.gender || !item.style) {
                  setShowImageOptions(showImageOptionsStatus.GenderOptions);
                } else {
                  handleMarkPublicItem();
                }
              },
              preventExit: !item.gender || !item.style,
            },
            {
              title: translate("delete"),
              onPress: () => {
                handleDeleteItem(item.id);
              },
            },
          ]
        : []),
      {
        title: translate("visualize"),
        onPress: () => {
          setShowImageOptions(showImageOptionsStatus.VisualizeOptions);
        },
        preventExit: true,
      },
    ],
    [item]
  );

  const handleImageOptionsExit = () => {
    setShowImageOptions(null);
  };

  const handleImagePress = async () => {
    if (ref.current.imageLoaded)
      setShowImageOptions(showImageOptionsStatus.ItemOptions);
  };

  const getOptionsFromStatus = () => {
    switch (showImageOptions) {
      case showImageOptionsStatus.ItemOptions: {
        return onPressItemOptions;
      }
      case showImageOptionsStatus.VisualizeOptions: {
        return onPressVisualizeOptions;
      }
      case showImageOptionsStatus.GenderOptions: {
        return onPressGenderOptions;
      }
      case showImageOptionsStatus.StyleOptions: {
        return onPressStyleOptions;
      }
      default: {
        return [];
      }
    }
  };

  const getTitleFromStatus = () => {
    switch (showImageOptions) {
      case showImageOptionsStatus.ItemOptions: {
        return "select_image_options";
      }
      case showImageOptionsStatus.VisualizeOptions: {
        return "select_file";
      }
      case showImageOptionsStatus.GenderOptions: {
        return "select_gender";
      }
      case showImageOptionsStatus.StyleOptions: {
        return "select_style";
      }
      default: {
        return [];
      }
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[Styles.item, style]}
        onPress={() => {
          if (haveItemSelected) {
            toggleSelect(item.id);
          } else handleImagePress();
        }}
        onLongPress={() => {
          if (canSelect) toggleSelect(item.id);
        }}
      >
        <ImageDisplay
          image={item.image}
          style={Styles.image}
          onImageLoaded={() => {
            ref.current.imageLoaded = true;
          }}
        />
        <View style={Styles.infoContainer}>
          <TextCustom
            title={new Date(item.created_at).toDateString().trim()}
            numberOfLines={1}
            style={Styles.createAtText}
            ellipsizeMode="tail"
          />
          <Owner own={item.own || {}} />
          <Interact
            isLike={item.liked}
            interact={item.interact || {}}
            onToggle={handleToggleLike}
          />
        </View>

        {isViewImage && (
          <ModalCustom
            onExit={() => {
              setIsViewImage(false);
            }}
          >
            <Image
              style={Styles.image}
              source={{
                uri: item.image,
              }}
              resizeMode="stretch"
            />
          </ModalCustom>
        )}
        {isSelected && (
          <Icon
            name="checkmark"
            size={25}
            color="#fff"
            style={Styles.checkIcon}
          />
        )}
      </TouchableOpacity>

      {showImageOptions && (
        <OptionsPopup
          title={translate(getTitleFromStatus())}
          options={getOptionsFromStatus()}
          onExit={handleImageOptionsExit}
        />
      )}
    </View>
  );
};

export default React.memo(withTranslate(Item));
