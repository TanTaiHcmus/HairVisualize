import axios from "axios";
import FormData from "form-data";
import { STATUS_MESSAGE, URL_SERVER } from "../constants";
import store from "../redux/store";
import { isEmpty } from "../utils";

const Axios = axios.create({
  baseURL: URL_SERVER,
  headers: {
    "content-type": "multipart/form-data",
  },
});

Axios.interceptors.request.use((config) => {
  const { token } = store.getState().login;
  config.headers["Authorization"] = !isEmpty(token)
    ? "bearer " + token
    : undefined;
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

const convertObjectToFormData = (params) => {
  const data = new FormData();
  Object.keys(params).forEach((key) => {
    data.append(key, params[key]);
  });
  return data;
};

class Request {
  static post = (url, params = {}) => {
    const data = convertObjectToFormData(params);
    return Axios({
      method: "post",
      url,
      data: data,
    });
  };

  static get = (url, params) => {
    return Axios({
      method: "get",
      url,
      params,
    });
  };

  static patch = (url, params) => {
    const data = convertObjectToFormData(params);

    return Axios({
      method: "patch",
      url,
      data: data,
    });
  };
}

export default Request;
