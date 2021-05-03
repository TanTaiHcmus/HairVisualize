import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    paddingVertical: 10,
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  rating: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  heart: {
    width: 40,
    height: 40,
  },
  ratingButton: {
    width: 150,
    marginBottom: 30,
    alignSelf: "center",
  },
  ratingText: {
    color: "#fff",
  },
});
