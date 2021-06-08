import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../constants";

export default StyleSheet.create({
  outside: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    zIndex: 5,
  },
});
