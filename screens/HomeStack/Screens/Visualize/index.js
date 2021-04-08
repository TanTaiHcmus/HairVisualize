import React from "react";
import { View } from "react-native";
import Button from "../../../../components/Button";
import Container from "../../../../components/Container";
import ImageDisplay from "../../../../components/ImageDisplay";
import TextCustom from "../../../../components/TextCustom";
import Styles from "./style";

const VisualizeScreen = ({ route }) => {
  return (
    <Container>
      <View style={Styles.imageContainer}>
        <ImageDisplay image={route.params.prevImage} style={Styles.image} />
      </View>

      <View style={Styles.imageContainer}>
        <ImageDisplay image={route.params.nextImage} style={Styles.image} />
      </View>

      <Button style={Styles.button}>
        <TextCustom title="Visualize" style={Styles.buttonText} />
      </Button>
    </Container>
  );
};

export default VisualizeScreen;
