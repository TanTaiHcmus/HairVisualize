import React, { useEffect } from "react";
import { connect } from "react-redux";
import WhiteScreen from "../WhiteScreen";
import { handleValidToken } from "./action";
import MainNavigator from "../../navigation/MainNavigator";
import LoginNavigator from "../../navigation/LoginNavigator";

const AppScreen = ({ isLogin, handleValidTokenConnect }) => {
  useEffect(() => {
    handleValidTokenConnect();
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
  handleValidTokenConnect: handleValidToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppScreen);
