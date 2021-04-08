import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTokenFromStorage } from "../../utils";
import WhiteScreen from "../WhiteScreen";
import { setIsLogin } from "./action";
import MainNavigator from "../../navigation/MainNavigator";
import LoginNavigator from "../../navigation/LoginNavigator";

const AppScreen = ({ isLogin, setIsLoginConnect }) => {
  const getToken = async () => {
    const token = await getTokenFromStorage();

    if (token) {
      setIsLoginConnect(true);
    } else {
      setIsLoginConnect(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return isLogin === null ? (
    <WhiteScreen />
  ) : isLogin === true ? (
    <MainNavigator />
  ) : (
    <LoginNavigator />
  );
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.login.isLogin,
  };
};

const mapDispatchToProps = {
  setIsLoginConnect: setIsLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppScreen);
