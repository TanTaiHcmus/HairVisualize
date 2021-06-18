import JobApi from "../../Api/jobApi";
import { STATUS_MESSAGE } from "../../constants";
import { addPrefixUrl } from "../../utils";

export const getJobInfoFromServer = async (id) => {
  const response = await JobApi.readJob(id);
  if (response.message === STATUS_MESSAGE.SUCCESS) {
    return {
      oriImage: response.data.file_origin
        ? addPrefixUrl(response.data.file_origin.uri)
        : null,
      desImage: response.data.file_example
        ? addPrefixUrl(response.data.file_example.uri)
        : null,
      resultImage: response.data.file_result
        ? addPrefixUrl(response.data.file_result.uri)
        : null,
    };
  }
  return null;
};
