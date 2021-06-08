import JobApi from "../../Api/jobApi";
import { STATUS_MESSAGE } from "../../constants";
import { addPrefixUrl } from "../../utils";

export const getJobInfoFromServer = async (id) => {
  const response = await JobApi.readJob(id);
  if (response.message === STATUS_MESSAGE.SUCCESS) {
    return {
      oriImage: addPrefixUrl(response.data.file_origin.uri),
      desImage: addPrefixUrl(response.data.file_example.uri),
      resultImage: addPrefixUrl(response.data.file_result.uri),
    };
  }
  return null;
};
