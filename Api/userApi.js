import Axios from "./axios";
class UserApi {
  static getUserInfo = () => {
    return Axios.get("/auth/verify");
  };

  static register = (info) => {
    return Axios.post("/auth/register", info);
  };

  static login = (account) => {
    return Axios.post("/auth/access-token", account);
  };

  static getUserId = () => {
    return Axios.get("/auth/");
  };

  static updateInfo = (info) => {
    return Axios.patch("/users/", info);
  };
}

export default UserApi;
