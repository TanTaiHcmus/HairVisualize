import React, { useMemo, useState, useRef } from "react";
import { Image, TouchableOpacity, View } from "react-native";
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
import Styles from "./style";

const Item = ({
  style,
  item,
  handleItemToggleLike,
  handleToggleMarkPublic,
  handleDeleteItem,
  translate,
}) => {
  const [isViewImage, setIsViewImage] = useState(false);
  const [isShowImageOptions, setIsShowImageOptions] = useState(false);
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
              onPress: async () => {
                const response = await handleMarkPublic(item.id, !item.public);
                if (response) {
                  handleToggleMarkPublic(item);
                }
              },
            },
            {
              title: translate("delete"),
              onPress: () => {
                handleDeleteItem(item.id);
              },
            },
          ]
        : []),
    ],
    [item]
  );

  const handleImageOptionsExit = () => {
    setIsShowImageOptions(false);
  };

  const handleImagePress = async () => {
    if (ref.current.imageLoaded) setIsShowImageOptions(true);
  };

  return (
    <View>
      <TouchableOpacity style={[Styles.item, style]} onPress={handleImagePress}>
        <ImageDisplay
          image={item.image}
          style={Styles.image}
          onImageLoaded={() => {
            ref.current.imageLoaded = true;
          }}
        />
        <View style={Styles.infoContainer}>
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
      </TouchableOpacity>
      {isShowImageOptions && (
        <OptionsPopup
          title={translate("select_image_options")}
          options={onPressItemOptions}
          onExit={handleImageOptionsExit}
        />
      )}
    </View>
  );
};

export default React.memo(withTranslate(Item));
