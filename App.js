import React, { useState } from "react";
import LoginNavigator from "./navigation/LoginNavigator";
import MainNavigator from "./navigation/MainNavigator";
import AppContext from "./context";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AppContext.Provider value={{ isLogin, setIsLogin }}>
      {isLogin ? <MainNavigator /> : <LoginNavigator />}
    </AppContext.Provider>
  );
}
