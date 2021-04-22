import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 350,
    alignSelf: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    color: "#fff",
    paddingVertical: 10,
    textAlign: "center",
  },
  optionsContainer: {
    backgroundColor: "#fff",
  },
  option: {
    borderBottomWidth: 1,
    borderBottomColor: "#d9c2ba",
    textAlign: "center",
    paddingVertical: 10,
  },
  cancelButton: {
    textAlign: "center",
    paddingVertical: 10,
    color: "#f6998e",
    fontWeight: "bold",
  },
});
