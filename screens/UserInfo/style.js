import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  navbarContainer: {
    width: "100%",
    marginTop: 20,
  },
  navbarItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderTopWidth: 1,
  },
  avatar: {
    aspectRatio: 1,
  },
  icon: {
    color: "#000",
    width: 80,
    textAlign: "center",
  },
  navbarTitle: {
    flex: 1,
    fontSize: 22,
  },
});
