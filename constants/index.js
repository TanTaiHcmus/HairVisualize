import { Dimensions } from "react-native";

export const AppName = "Hair Visualize";

export const screenWidth = Math.round(Dimensions.get("window").width);
export const screenHeight = Math.round(Dimensions.get("window").height);

export const STATUS_MESSAGE = {
  SUCCESS: "success",
  ERROR: "error",
};

export const LanguageOptions = {
  Vietnamese: "vi",
  English: "en",
};

export const URL_SERVER = "http://157.230.43.147/api/v1";

export const ACCESS_TOKEN = "ACCESS_TOKEN";

export const headerNavigationStyle = {
  headerTintColor: "#fff",
  headerTitleAlign: "center",
};

export const gradientHeader = ["#f6998e", "#ed7a96"];

export const gradientBackground = ["#f59490", "#e253a0"];

export const Screens = {
  Login: "login",
  Register: "register",
  Home: "home",
  Start: "start",
  YourHairStyle: "your_hair_style",
  HairStyleBank: "hair_style_bank",
  HairVisualize: "hair_visualize",
  AccountManager: "account_manager",
  UserInfo: "user_info",
  EditUserInfo: "edit_user_info",
  History: "history",
  Help: "help",
  AppInfo: "app_info",
};

export const EditUserInfoOptions = {
  Introduce: "introduce",
  Contact: "contact",
};

export const UsernameIsEmpty = "Username is empty!";
export const DisplayNameIsEmpty = "Display name is empty!";
export const EmailIsEmpty = "Email is empty!";
export const PasswordIsEmpty = "Password is empty!";
export const ConfirmPasswordIsEmpty = "Confirm password is empty!";
export const ConfirmPasswordIsNotMatch = "Confirm password is not match!";
export const INVALID_TOKEN_STATUS = 401;
