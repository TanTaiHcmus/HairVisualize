import Axios from "./axios";
class UserApi {
  static verifyToken = () => {
    return Axios.post("/api/v1/auth/verify");
  };

  static register = (info) => {
    return Axios.post("/api/v1/auth/register", info);
  };

  static login = (account) => {
    return Axios.post("/api/v1/auth/access-token", account);
  };

  static getAvatar = (id) => {
    return Axios.get(`/api/v1/static/${id}`);
  };

  static getUserId = () => {
    return Axios.get("/api/v1/auth");
  };

  static updateInfo = (id, info) => {
    return Axios.patch(`/api/v1/users/${id}`, info);
  };
}

export default UserApi;
