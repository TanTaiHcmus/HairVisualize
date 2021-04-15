import React, { useState } from "react";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Button from "../../components/Button";
import Container from "../../components/Container";
import ImageUpload from "../../components/ImageUpload";
import TextCustom from "../../components/TextCustom";
import Styles from "./style";

const LoadYOurHairScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);

  return (
    <Container>
      <ImageUpload image={image} onChange={setImage} />
      <Button
        style={Styles.nextButton}
        onPress={() => {
          if (!image) {
            Alert.alert("Please pick an image");
            return;
          }
          if (route.params.name !== "Load des hair") {
            navigation.push("LoadYourHair", {
              name: "Load des hair",
              prevImage: image,
            });
          } else {
            navigation.push("Visualize", {
              prevImage: route.params.prevImage,
              nextImage: image,
            });
          }
        }}
      >
        <TextCustom title="Next" style={Styles.buttonText} />
        <Icon name="arrow-right" size={20} style={Styles.arrowRightIcon} />
      </Button>
    </Container>
  );
};

export default React.memo(LoadYOurHairScreen);
