import UserApi from "../../Api/userApi";

export const registerToServer = async (info) => {
  const response = await UserApi.register(info);
  return response;
};
