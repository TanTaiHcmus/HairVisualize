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

  static forgetPassword = () => {
    return Axios.put(`/users/${id}`, info);
  };

  static getAvatar = (id) => {
    return Axios.get("/api/v1/static/", { user_id: 2 });
  };
}

export default UserApi;
