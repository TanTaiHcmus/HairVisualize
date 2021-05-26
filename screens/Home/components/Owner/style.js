import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarContainer: {
    width: 20,
    borderRadius: 10,
    marginRight: 5,
    overflow: "hidden",
  },
  ownerAvatar: {
    aspectRatio: 1,
  },
  ownerName: {
    flex: 1,
  },
});
