import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import { Image, View } from "react-native";
import ImageDisplay from "../../../../../components/ImageDisplay";
import ModalCustom from "../../../../../components/ModalCustom";
import withTranslate from "../../../../../HOC/withTranslate";
import {
  changeItem,
  deleteItemInHairStyleBank,
  handleMarkFileLiked,
  handleMarkPublic,
} from "../../../action";
import Interact from "../../Interact";
import Owner from "../../Owner";
import Styles from "./style";

const Item = ({
  style,
  item,
  translate,
  deleteItemConnect,
  changeItemConnect,
}) => {
  const [isViewImage, setIsViewImage] = useState(false);

  const handleToggleLike = async () => {
    const response = await handleMarkFileLiked(item.id, !item.liked);
    if (response) {
      changeItemConnect({
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
              title: translate("un_share"),
              onPress: async () => {
                const response = await handleMarkPublic(item.id, false);
                if (response) {
                  deleteItemConnect(item);
                }
              },
            },
          ]
        : []),
    ],
    [item]
  );

  return (
    <View style={[Styles.item, style]}>
      <ImageDisplay
        image={item.image}
        onPressOptions={onPressItemOptions}
        style={Styles.image}
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
    </View>
  );
};

const mapDispatchToProps = {
  deleteItemConnect: deleteItemInHairStyleBank,
  changeItemConnect: changeItem,
};

export default React.memo(
  connect(null, mapDispatchToProps)(withTranslate(Item))
);
