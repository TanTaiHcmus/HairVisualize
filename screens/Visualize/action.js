import JobApi from "../../Api/jobApi";
import { getFileFromUri } from "../../utils";

export const handleVisualize = async (des, ori) => {
  const response = await JobApi.createJob({
    file_example: getFileFromUri(des),
    file_origin: getFileFromUri(ori),
  });

  return response;
};
