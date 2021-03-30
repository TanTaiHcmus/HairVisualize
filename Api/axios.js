import axios from "axios";
import FormData from "form-data";
import { STATUS_MESSAGE, URL_SERVER } from "../constants";
import { getTokenFromStorage } from "../utils";

const Axios = axios.create({
  baseURL: URL_SERVER,
  headers: {
    "content-type": "multipart/form-data",
  },
});

Axios.interceptors.request.use(async (config) => {
  const token = await getTokenFromStorage();
  config.headers["Authorization"] = token ? "bearer " + token : undefined;
  return config;
});

Axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
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
      data: error.response.data,
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
      data: data || undefined,
    });
  };

  static get = (url, params) => {
    return Axios({
      method: "get",
      url,
      params,
    });
  };
}

export default Request;
