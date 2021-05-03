import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  image: {
    width: 200,
    borderRadius: 10,
    aspectRatio: 3 / 4,
  },
  title: {
    width: 150,
    textAlign: "center",
  },
});
