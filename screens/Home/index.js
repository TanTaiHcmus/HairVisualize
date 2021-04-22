import React, { useState } from "react";
import { View, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ButtonGradient from "../../components/ButtonGradient";
import Container from "../../components/Container";
import TextCustom from "../../components/TextCustom";
import Button from "../../components/Button";
import { Styles } from "./style";

const HomeScreen = ({ navigation }) => {
  const [yourImage, setYourImage] = useState(null);
  const [desImage, setDesImage] = useState(null);

  return (
    <View style={Styles.container}>
      <Image style={Styles.imageBanner} />
      <Container>
        <ButtonGradient
          linearGradientColors={["#0d518c", "#f285c1"]}
          style={Styles.buttonGradient}
          onPress={() => {
            navigation.navigate("HairStyleBank");
          }}
        >
          <Icon name="landmark" size={22} style={Styles.icon} />
          <TextCustom title="HairStyle Bank" style={Styles.buttonText} />
        </ButtonGradient>

        <ButtonGradient
          linearGradientColors={["#9ac7d9", "#0d518c"]}
          style={Styles.buttonGradient}
        >
          <Icon name="store" size={22} style={Styles.icon} />
          <TextCustom title="Your Hair Store" style={Styles.buttonText} />
        </ButtonGradient>

        <Button
          style={Styles.startButton}
          onPress={() => {
            navigation.navigate("LoadYourHair", { name: "Load your hair" });
          }}
        >
          <TextCustom title="Start" style={Styles.buttonText} />
          <Icon name="arrow-right" size={20} style={Styles.arrowRightIcon} />
        </Button>
      </Container>
    </View>
  );
};

export default HomeScreen;
