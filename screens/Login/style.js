import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  helpContainer: {
    width: "100%",
    marginBottom: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 2,
  },
  bold: {
    fontWeight: "bold",
  },
  socialLoginContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  socialLogin: {
    width: "45%",
    borderRadius: 30,
    borderWidth: 1,
    paddingVertical: 10,
    display: "flex",
    alignItems: "center",
  },
  loginQuestion: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: "#EE2A7B",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
  },
});
