import Axios from "./axios";
class UserApi {
  static getUserInfo = () => {
    return Axios.get({ url: "/auth/verify" });
  };

  static register = (params) => {
    return Axios.post({ url: "/auth/register", params, checkToken: false });
  };

  static login = (params) => {
    return Axios.post({ url: "/auth/access-token", params, checkToken: false });
  };

  static getUserId = () => {
    return Axios.get({ url: "/auth/" });
  };

  static updateInfo = (params) => {
    return Axios.patch({ url: "/users/", params });
  };

  static logout = () => {
    Axios.logout();
  };
}

export default UserApi;
