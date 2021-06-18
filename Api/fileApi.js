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
  static markPublicFile = (data) => {
    return Axios.put({
      url: "files/mark_public",
      data,
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
  static deleteFiles = (data) => {
    return Axios.put({
      url: "files/delete/",
      data,
    });
  };
  static getHairLikes = (params) => {
    return Axios.get({
      url: "/files/like/",
      params,
    });
  };
  static downloadFiles = (params) => {
    return Axios.get({
      url: "files/batch-download/?" + params,
    });
  };
}

export default FileApi;
