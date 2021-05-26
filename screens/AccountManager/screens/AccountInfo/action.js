import UserApi from "../../../../Api/userApi";

export const handleLogoutToServer = () => {
  UserApi.logout();
};
