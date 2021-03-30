import UserApi from "../../Api/userApi";

export const handleLoginConnect = async (data) => {
  const response = await UserApi.login(data);
  return response;
};

// export const handleForgetPasswordConnect = async () => {
//   const response = await UserApi.
// }
