import React, { useState, useEffect } from "react";
import LoginNavigator from "./navigation/LoginNavigator";
import MainNavigator from "./navigation/MainNavigator";
import AppContext from "./context";
import { getTokenFromStorage } from "./utils";
import WhiteScreen from "./screens/WhiteScreen";

export default function App() {
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const token = await getTokenFromStorage();

      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    };

    getToken();
  }, []);

  return (
    <AppContext.Provider value={{ isLogin, setIsLogin }}>
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
