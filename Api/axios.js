import axios from "axios";
import { STATUS_MESSAGE, TOKEN, URL_SERVER, WebSocketUrl } from "../constants";
import {
  checkExpiredToken,
  convertObjectToFormData,
  getTokenFromStorage,
  handleLogout,
  isEmpty,
  setTokenFromStorage,
} from "../utils";

const Axios = axios.create({
  baseURL: URL_SERVER,
  headers: {
    "content-type": "multipart/form-data",
  },
});

Axios.interceptors.request.use(async (config) => {
  const { value: token } = await getTokenFromStorage(TOKEN.ACCESS_TOKEN);
  if (!isEmpty(token)) config.headers["Authorization"] = "bearer " + token;
  return config;
});

Axios.interceptors.response.use(
  (response) => {
    if (response) {
      return {
        data: response.data,
        message: STATUS_MESSAGE.SUCCESS,
      };
    }
    return response;
  },
  (error) => {
    return {
      message: STATUS_MESSAGE.ERROR,
      data: error.response,
    };
  }
);
class Request {
  static refreshToken = null;
  static webSocket = null;
  static isRefreshToken = true;

  static callApiWithCheckToken = async (callApi, checkToken) => {
    const { expiry: expiry_access_token } = await getTokenFromStorage(
      TOKEN.ACCESS_TOKEN
    );
    if (!checkToken || checkExpiredToken(expiry_access_token)) {
      return callApi();
    } else {
      this.isRefreshToken = true;
      const { value: refresh_token, expiry: expiry_refresh_token } =
        await getTokenFromStorage(TOKEN.REFRESH_TOKEN);
      if (checkExpiredToken(expiry_refresh_token)) {
        if (!this.refreshToken) {
          await setTokenFromStorage(
            TOKEN.ACCESS_TOKEN,
            JSON.stringify({
              value: refresh_token,
              expiry: expiry_refresh_token,
            })
          );
          this.refreshToken = this.get({ url: "/auth/refresh" });
        }

        const response = await this.refreshToken;
        this.refreshToken = null;
        if (response.message === STATUS_MESSAGE.SUCCESS) {
          await setTokenFromStorage(
            TOKEN.ACCESS_TOKEN,
            JSON.stringify(response.data.access_token)
          );
          return callApi();
        }
      } else {
        this.logout();
        return new Promise((resolve) => {
          resolve({ message: STATUS_MESSAGE.ERROR });
        });
      }
    }
  };

  static post = ({ url, params = {}, checkToken = true }) => {
    const data = convertObjectToFormData(params);
    return this.callApiWithCheckToken(
      () =>
        Axios({
          method: "post",
          url,
          data: data,
        }),
      checkToken
    );
  };

  static get = ({ url, params = {}, checkToken = true }) => {
    return this.callApiWithCheckToken(
      () =>
        Axios({
          method: "get",
          url,
          params,
        }),
      checkToken
    );
  };

  static patch = ({ url, params = {}, checkToken = true }) => {
    const data = convertObjectToFormData(params);

    return this.callApiWithCheckToken(
      () =>
        Axios({
          method: "patch",
          url,
          data: data,
        }),
      checkToken
    );
  };

  static put = ({ url, params = {}, checkToken = true, data = {} }) => {
    return this.callApiWithCheckToken(
      () =>
        Axios({
          method: "put",
          url,
          params,
          data,
        }),
      checkToken
    );
  };

  static delete = ({ url, params = {}, checkToken = true }) => {
    return this.callApiWithCheckToken(
      () =>
        Axios({
          method: "delete",
          url,
          params,
        }),
      checkToken
    );
  };

  static logout = () => {
    this.isRefreshToken = true;
    this.get({ url: "/auth/revoke" });
    handleLogout();
  };

  static createWebSocket = () => {
    return this.callApiWithCheckToken(async () => {
      if (this.isRefreshToken) {
        const { value: token } = await getTokenFromStorage(TOKEN.ACCESS_TOKEN);
        this.webSocket = new WebSocket(WebSocketUrl + token);
        this.isRefreshToken = false;
      }
      return this.webSocket;
    }, true);
  };
}

export default Request;
