import { StyleSheet } from "react-native";
import { screenWidth } from "../../../constants";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
  },
  startButtonContainer: {
    position: "absolute",
    top: -50,
    left: screenWidth / 2 - 40,
    width: 80,
    height: 80,
    zIndex: 2,
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 10,
  },
  startButton: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    paddingLeft: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
