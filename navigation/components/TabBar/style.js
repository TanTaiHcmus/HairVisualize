import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
  },
  startButtonContainer: {
    position: "absolute",
    top: -25,
    left: 0,
    alignItems: "center",
    width: "100%",
    zIndex: 2,
  },
  startButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    paddingLeft: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
