import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 30,
    borderColor: "#707070",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 35,
  },
  invalid: {
    borderColor: "red",
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: "#707070",
    paddingHorizontal: 13,
  },
  icon: {
    width: 25,
  },
});
