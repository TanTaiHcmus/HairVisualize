import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  infoHeader: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    marginBottom: 10,
  },
  avatarContainer: {
    width: 120,
    borderRadius: 60,
    overflow: "hidden",
  },
  avatar: {
    aspectRatio: 1,
  },
  account: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonChangeAvatar: {
    position: "absolute",
    top: 40,
    right: -55,
  },
});
