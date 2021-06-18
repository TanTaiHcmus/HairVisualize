import { StyleSheet } from "react-native";

export default StyleSheet.create({
  item: {
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    overflow: "hidden",
  },
  image: {
    aspectRatio: 3 / 4,
  },
  infoContainer: {
    padding: 10,
  },
  checkIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    width: 30,
    height: 30,
    backgroundColor: "#e253a0",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    textAlign: "center",
  },
  createAtText: {
    marginBottom: 8,
    fontSize: 15,
  },
});
