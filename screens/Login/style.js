import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  logoContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoName: {
    color: "#fff",
    fontSize: 21,
    marginTop: 10,
  },
  inputContainer: {
    paddingHorizontal: 30,
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    width: 350,
    maxWidth: "100%",
  },
  controlContainer: {
    alignItems: "center",
    paddingBottom: 30,
  },
  loginButton: {
    width: 200,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    elevation: 12,
    marginBottom: 50,
  },
  loginText: {
    color: "#fff",
  },
  forgetPassword: {
    color: "#fff",
    marginBottom: 15,
  },
  createAccount: {
    color: "#fff",
  },
});
