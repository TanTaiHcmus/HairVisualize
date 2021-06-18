import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginBottom: 30,
    zIndex: 10,
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
    marginHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
  },
});
