import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
  valueContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
  icon: {
    width: 40,
  },
  text: {
    flex: 1,
  },
  optionsContainer: {
    position: "absolute",
    width: "100%",
    left: 0,
    top: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    zIndex: 10,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
  },
});
