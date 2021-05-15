import Axios from "./axios";
class JobApi {
  static createJob = (params) => {
    return Axios.post({ url: "/jobs/", params });
  };
  static readJobs = (params) => {
    return Axios.get({ url: "/jobs/", params });
  };
  static readJob = (id) => {
    return Axios.get({ url: `/jobs/${id}` });
  };
}

export default JobApi;
