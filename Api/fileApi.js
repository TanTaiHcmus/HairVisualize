import Axios from "./axios";
class FileApi {
  static getHairStyleBank = (params) => {
    return Axios.get({
      url: "/files/public/",
      params,
    });
  };
  static getYourHairStyles = (params) => {
    return Axios.get({
      url: "/files/",
      params,
    });
  };
  static markPublicFile = (id, status) => {
    return Axios.get({
      url: `/files/mark_public/${id}`,
      params: { status },
    });
  };
  static markFileLiked = (id, is_liked) => {
    return Axios.get({
      url: `/files/like/${id}`,
      params: { is_liked },
    });
  };
  static deleteFile = (id) => {
    return Axios.delete({
      url: `/files/${id}`,
    });
  };
  static getHairLikes = (params) => {
    return Axios.get({
      url: "/files/like/",
      params,
    });
  };
}

export default FileApi;
