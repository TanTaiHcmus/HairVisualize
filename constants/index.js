import { Dimensions } from "react-native";

export const AppName = "HaSi";

export const AppVersion = 1;

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

export const URL_SERVER = "http://175.41.151.101/api/v1";

export const WebSocketUrl = "ws://175.41.151.101/api/v1/websocket/?token=";

export const TOKEN = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
};

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
  HairLikes: "hair_likes",
  ResultInfo: "result_info",
};

export const EditUserInfoOptions = {
  Introduce: "introduce",
  Contact: "contact",
};

export const INVALID_TOKEN_STATUS = 401;

export const SortOptions = {
  Time: {
    id: 1,
    text: "time",
  },
  LikeAmount: {
    id: 2,
    text: "like_amount",
  },
  VisualizeAmount: {
    id: 3,
    text: "visualize_amount",
  },
};

export const SortOrderOptions = {
  ASC: {
    id: 1,
    text: "asc",
  },
  DESC: {
    id: 2,
    text: "desc",
  },
};

export const LIMIT_HORIZONTAL_ITEMS = 5;

export const LIMIT_VERTICAL_ITEMS = 10;

export const JobStatus = {
  ALL: {
    id: 0,
    text: "all",
  },
  PENDING: {
    id: 1,
    text: "pending",
  },
  RUNNING: {
    id: 2,
    text: "running",
  },
  FINISHED: {
    id: 3,
    text: "finished",
  },
  TIMEOUT: {
    id: 4,
    text: "timeout",
  },
  ERROR: {
    id: 5,
    text: "error",
  },
  CANCEL: {
    id: 6,
    text: "canceled",
  },
};

export const FileTypeOptions = {
  ALL: {
    id: 0,
    text: "all",
  },
  ORIGIN: {
    id: 1,
    text: "ori",
  },
  EXAMPLE: {
    id: 2,
    text: "des",
  },
  RESULT: {
    id: 3,
    text: "result",
  },
  EXTRACTING: {
    id: 4,
    text: "extracting",
  },
};

export const Signal_Type = {
  SERVER_UPDATE: 1,
  CLIENT_UPDATE: 2,
};

export const GenderOptions = {
  ALL: {
    id: 0,
    text: "all",
  },
  MALE: {
    id: 1,
    text: "male",
  },
  FEMALE: {
    id: 2,
    text: "female",
  },
};

export const StyleOptions = {
  ALL: {
    id: 0,
    text: "all",
  },
  SHORT: {
    id: 1,
    text: "short",
  },
  LONG: {
    id: 2,
    text: "long",
  },
};
