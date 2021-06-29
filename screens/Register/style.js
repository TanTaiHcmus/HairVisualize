import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  logoContainer: {
    height: 250,
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
  },
  input: {
    width: 350,
    maxWidth: "100%",
  },
  controlContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  registerButton: {
    width: 200,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    elevation: 12,
    marginBottom: 25,
  },
  registerText: {
    color: "#fff",
  },
  backLogin: {
    color: "#fff",
  },
});
