import axios from "axios";
import queryString from "query-string";
import { STATUS_MESSAGE, URL_SERVER } from "../constants";

const Axios = axios.create({
  baseURL: URL_SERVER,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => {
    return queryString.stringify(params);
  },
});

Axios.interceptors.request.use(async (config) => {
  //handle token here
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
      error,
    };
  }
);

export default Axios;
