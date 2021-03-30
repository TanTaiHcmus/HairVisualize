import { Dimensions } from "react-native";

export const screenWidth = Math.round(Dimensions.get("window").width);
export const screenHeight = Math.round(Dimensions.get("window").height);
export const imageHeight = (screenWidth * 0.8 * 3) / 4;

export const STATUS_MESSAGE = {
  SUCCESS: "success",
  ERROR: "error",
};

export const URL_SERVER = "http://157.230.43.147";

export const ACCESS_TOKEN = "ACCESS_TOKEN";

export const headerNavigationStyle = {
  headerStyle: {
    backgroundColor: "#ee2a7b",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerTitleAlign: "center",
};

export const UsernameIsEmpty = "Username is empty!";
export const DisplayNameIsEmpty = "Display name is empty!";
export const EmailIsEmpty = "Email is empty!";
export const PasswordIsEmpty = "Password is empty!";
export const ConfirmPasswordIsEmpty = "Confirm password is empty!";
export const ConfirmPasswordIsNotMatch = "Confirm password is not match!";
