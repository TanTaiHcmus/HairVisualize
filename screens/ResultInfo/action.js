import JobApi from "../../Api/jobApi";
import { STATUS_MESSAGE } from "../../constants";
import { addPrefixUrl } from "../../utils";

export const getJobInfoFromServer = async (id) => {
  const response = await JobApi.readJob(id);
  if (response.message === STATUS_MESSAGE.SUCCESS) {
    return {
      oriImage: response.data.origin_file
        ? addPrefixUrl(response.data.origin_file.uri)
        : null,
      desImage: response.data.example_file
        ? addPrefixUrl(response.data.example_file.uri)
        : null,
      resultImage: response.data.result_file
        ? addPrefixUrl(response.data.result_file.uri)
        : null,
    };
  }
  return null;
};
