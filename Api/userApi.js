import Axios from "./axios";

class UserApi {
  static getInfo = (id) => {
    const params = { id };
    return Axios.get("/users", { params });
  };

  static register = (info) => {
    console.log(info);
    return Axios.post("/api/v1/auth/register", info);
  };

  static login = (account) => {
    return Axios.get("/users", { params: account });
  };

  static updateInfo = (id, info) => {
    return Axios.put(`/users/${id}`, info);
  };
}

export default UserApi;
