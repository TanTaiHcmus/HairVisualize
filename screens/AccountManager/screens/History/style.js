import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  headerButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    color: "#fff",
    paddingHorizontal: 8,
  },
  item: {
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    overflow: "hidden",
  },
  image: {
    aspectRatio: 3 / 4,
  },
  infoContainer: {
    padding: 10,
  },
  itemControl: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#e253a0",
  },
  deleteButton: {
    backgroundColor: "#e253a0",
  },
  tryAgainButton: {
    backgroundColor: "green",
  },
  text: {
    color: "#fff",
  },
  tabsContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 10,
  },
  tabActive: {
    borderBottomWidth: 1,
  },
  createdAtText: {
    fontSize: 15,
  },
  checkIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    width: 30,
    height: 30,
    backgroundColor: "#e253a0",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    textAlign: "center",
  },
});
