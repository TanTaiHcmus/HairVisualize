import { StyleSheet } from "react-native";
import { screenHeight, screenWidth } from "../../constants";

export default StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 0,
    backgroundColor: "#fff",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterText: {
    fontSize: 18,
  },
  menuIcon: {
    padding: 10,
    zIndex: 10,
    marginRight: -15,
  },
  fullScreen: {
    position: "absolute",
    zIndex: 5,
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
  },
});
