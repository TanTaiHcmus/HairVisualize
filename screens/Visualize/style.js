import { StyleSheet } from "react-native";
import { screenWidth } from "../../constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  button: {
    width: 200,
    alignSelf: "center",
    marginBottom: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.8,
  },
  textButton: {
    color: "#fff",
  },
  itemContainer: {
    width: screenWidth,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 30,
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  titleImage: {
    fontSize: 18,
  },
  imageContainer: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.8,
  },
  imageBackground: {
    backgroundColor: "#fff",
  },
  image: {
    aspectRatio: 3 / 4,
  },
  icon: {
    textAlign: "center",
    position: "absolute",
    width: 30,
    color: "#e253a0",
  },
  leftIcon: {
    left: 0,
  },
  rightIcon: {
    right: 0,
  },
});
