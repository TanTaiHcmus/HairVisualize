import JobApi from "../../Api/jobApi";
import { STATUS_MESSAGE } from "../../constants";
import { getFileFromUri } from "../../utils";

export const handleVisualize = async (des, ori) => {
  const response = await JobApi.createJob({
    file_example: getFileFromUri(des),
    file_origin: getFileFromUri(ori),
  });

  if (response.message === STATUS_MESSAGE.SUCCESS) {
    return response.data;
  }

  return null;
};
