import React, { useState, useEffect } from "react";
import LoginNavigator from "./navigation/LoginNavigator";
import MainNavigator from "./navigation/MainNavigator";
import AppContext from "./context";
import { getTokenFromStorage } from "./utils";
import WhiteScreen from "./screens/WhiteScreen";
import UserApi from "./Api/userApi";
import { STATUS_MESSAGE } from "./constants";

export default function App() {
  const [isLogin, setIsLogin] = useState(null);
  const [userId, setUserId] = useState(null);

  const getUserID = async () => {
    const response = await UserApi.getUserId();

    if (response.message === STATUS_MESSAGE.SUCCESS) {
      setUserId(response.data.id);
    }
  };

  const getToken = async () => {
    const token = await getTokenFromStorage();

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (isLogin) {
      getUserID();
    }
  }, [isLogin]);

  return (
    <AppContext.Provider value={{ setIsLogin, userId }}>
      {isLogin === null ? (
        <WhiteScreen />
      ) : isLogin === true ? (
        <MainNavigator />
      ) : (
        <LoginNavigator />
      )}
    </AppContext.Provider>
  );
}
