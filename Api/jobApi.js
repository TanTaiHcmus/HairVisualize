import Axios from "./axios";
class JobApi {
  static createJob = (info) => {
    return Axios.post("/jobs/", info);
  };
}

export default JobApi;
