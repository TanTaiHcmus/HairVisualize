import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollView: {
    width: "100%",
    padding: 20,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: "45%",
    borderWidth: 1,
    borderColor: "#707070",
    overflow: "hidden",
    marginBottom: 10,
    borderRadius: 0,
  },
  image: {
    aspectRatio: 4 / 3,
  },
});
