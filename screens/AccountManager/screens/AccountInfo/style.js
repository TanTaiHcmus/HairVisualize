import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  avatarContainer: {
    borderRadius: 30,
    width: 60,
    overflow: "hidden",
  },
  avatar: {
    aspectRatio: 1,
  },
  infoDetail: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    height: 55,
  },
  accountName: {
    fontSize: 20,
  },
  displayName: {
    fontSize: 16,
    color: "#0d0d0d",
  },
  icon: {
    color: "#0d0d0d",
    width: 30,
    textAlign: "center",
  },
  navbarTitle: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
