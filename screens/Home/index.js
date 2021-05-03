import React from "react";
import { View } from "react-native";
import ScrollContainer from "../../components/ScrollContainer";
import HairStyleBank from "./components/HairStyleBank";
import YourHairStyles from "./components/YourHairStyles";
import { Styles } from "./style";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={Styles.container}>
      <ScrollContainer>
        <YourHairStyles isHorizontal navigation={navigation} />
        <HairStyleBank isHorizontal navigation={navigation} />
      </ScrollContainer>
    </View>
  );
};

export default HomeScreen;
