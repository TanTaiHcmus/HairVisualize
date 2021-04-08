import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#707070",
    overflow: "hidden",
  },
  image: {
    width: "100%",
  },
  iconClose: {
    alignSelf: "flex-end",
    color: "#fff",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0, 0.7)",
  },
  imageShowContainer: {
    position: "absolute",
    paddingHorizontal: 20,
  },
  outsideImage: {
    flex: 1,
  },
});
