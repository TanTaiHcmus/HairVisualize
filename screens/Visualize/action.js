import JobApi from "../../Api/jobApi";
import { STATUS_MESSAGE } from "../../constants";

export const handleVisualize = async (params) => {
  const response = await JobApi.createJob(params);

  if (response.message === STATUS_MESSAGE.SUCCESS) {
    return response.data;
  }

  return null;
};
