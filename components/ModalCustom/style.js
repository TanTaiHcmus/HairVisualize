import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0, 0.7)",
  },
  outside: {
    flex: 1,
  },
  content: {
    position: "absolute",
    width: "100%",
    maxWidth: 400,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
});
