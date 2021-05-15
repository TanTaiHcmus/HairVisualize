import JobApi from "../../../../Api/jobApi";
import { INVALID_TOKEN_STATUS } from "../../../../constants";
import { handleLogout } from "../../../../utils";

export const getJobsFromServer = async () => {
  const response = await JobApi.readJobs();
  return response;
};
