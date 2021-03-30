import UserApi from "../../Api/userApi";

export const handleRegisterConnect = async (account) => {
  const response = await UserApi.register(account);
  return response;
};
