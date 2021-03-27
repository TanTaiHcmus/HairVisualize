import { StyleSheet, Dimensions } from "react-native";
import { imageHeight } from "../../constants";

export const Styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#707070",
    marginBottom: 50,
    overflow: "hidden",
  },
  noImage: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadFromServerText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  icon: {
    marginRight: 20,
    color: "#fff",
  },
});
