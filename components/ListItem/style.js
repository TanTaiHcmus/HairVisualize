import { StyleSheet } from "react-native";
import { screenWidth } from "../../constants";

export default StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    color: "#e253a0",
    fontWeight: "bold",
  },
  buttonViewAll: {},
  containerHorizontal: {
    paddingVertical: 15,
    paddingLeft: 20,
    alignItems: "center",
  },
  containerVertical: {
    paddingBottom: 200,
  },
  loadingContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  itemVertical: {
    margin: 15,
    width: screenWidth * 0.5 - 30,
  },
  itemHorizontal: {
    marginRight: 20,
    width: 150,
  },
});
