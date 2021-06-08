import JobApi from "../../../../Api/jobApi";
import { JobStatus, STATUS_MESSAGE } from "../../../../constants";
import { SET_HISTORY } from "../../../../redux/actions/History";
import { addPrefixUrl } from "../../../../utils";

export const getHistoryFromServer =
  (params, onEnd) => async (dispatch, getState) => {
    const response = await JobApi.readJobs(params);
    if (response.message === STATUS_MESSAGE.SUCCESS) {
      const { items } = response.data;
      if (items.length < params.limit) onEnd();

      const prevData = getState().history.data.slice(
        0,
        (params.page - 1) * params.limit
      );

      dispatch({
        type: SET_HISTORY,
        data: [
          ...prevData,
          ...items.map((item) => {
            return {
              id: item.id,
              created_at: item.created_at,
              status: item.status,
              image: item.file_result
                ? addPrefixUrl(item.file_result.uri)
                : null,
            };
          }),
        ],
      });
    }
  };

export const changeItemStatus = (id, status) => async (dispatch, getState) => {
  const { data } = getState().history;
  const item = data.find((item) => item.id === id);
  if (item) {
    item.status = status;
    if (status === JobStatus.FINISHED.id) {
      const response = await JobApi.readJob(id);
      if (response.message === STATUS_MESSAGE.SUCCESS) {
        item.image = addPrefixUrl(response.data.file_result.uri);
      }
    }
    dispatch({
      type: SET_HISTORY,
      data,
    });
  }
};

export const handleGetStatusTextFromId = (status) => {
  return Object.values(JobStatus).find((item) => item.id === status).text;
};

export const deleteJob = (id) => async (dispatch, getState) => {
  const response = await JobApi.deleteJob(id);
  if (response.message === STATUS_MESSAGE.SUCCESS) {
    const { data } = getState().history;
    dispatch({
      type: SET_HISTORY,
      data: data.filter((item) => item.id !== id),
    });
  }
};

export const getJobInfo = async (id) => {
  const response = await JobApi.readJob(id);
  if (response.message === STATUS_MESSAGE.SUCCESS) {
    console.log(response.data);
    return {
      // oriImage: addPrefixUrl(response.data.file_origin.uri),
      // desImage: addPrefixUrl(response.data.file_example.uri),
    };
  }
  return null;
};
