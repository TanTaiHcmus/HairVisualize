import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import ImageDisplay from "../../components/ImageDisplay";
import Styles from "./style";

const HairStyleBankScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const a = new Array(20).fill().map((item, index) => ({
      id: index,
      image: "",
    }));

    setImages(a);
  }, []);

  return (
    <ScrollView
      style={Styles.scrollView}
      contentContainerStyle={Styles.container}
    >
      {images &&
        images.map((item) => (
          <View style={Styles.imageContainer} key={item.id}>
            <ImageDisplay image={item.image} style={Styles.image} />
          </View>
        ))}
    </ScrollView>
  );
};

export default HairStyleBankScreen;
