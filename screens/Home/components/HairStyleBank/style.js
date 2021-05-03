import { StyleSheet } from "react-native";

export default StyleSheet.create({
  item: {
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    overflow: "hidden",
    paddingBottom: 10,
  },
  image: {
    width: 140,
    aspectRatio: 3 / 4,
  },
  itemName: {
    paddingLeft: 10,
  },
  itemVertical: {
    margin: 15,
  },
  itemHorizontal: {
    marginRight: 20,
  },
  ratingNumber: {
    marginTop: 5,
    marginLeft: 10,
  },
});
