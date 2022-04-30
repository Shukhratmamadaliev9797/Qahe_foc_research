import axios from "../../node_modules/axios/index";
import {
  TRAINING_SCHEDULE_CREATE_FAIL,
  TRAINING_SCHEDULE_CREATE_REQUEST,
  TRAINING_SCHEDULE_CREATE_SUCCESS,
  TRAINING_SCHEDULE_LIST_FAIL,
  TRAINING_SCHEDULE_LIST_REQUEST,
  TRAINING_SCHEDULE_LIST_SUCCESS,
} from "../constants/trainingScheduleConstant";

export const createTrainingSchedule = (title, startDate, endDate) => {
  return async (dispatch) => {
    dispatch({
      type: TRAINING_SCHEDULE_CREATE_REQUEST,
      payload: { title, startDate, endDate },
    });
    try {
      const { data } = await axios.post(
        "/api/trainingSchedule/createTrainingSchedule",
        {
          title,
          startDate,
          endDate,
        }
      );
      dispatch({ type: TRAINING_SCHEDULE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: TRAINING_SCHEDULE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listTrainingSchedule = () => {
  return async (dispatch) => {
    dispatch({ type: TRAINING_SCHEDULE_LIST_REQUEST });
    try {
      const { data } = await axios.get(`/api/trainingSchedule`);
      dispatch({ type: TRAINING_SCHEDULE_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: TRAINING_SCHEDULE_LIST_FAIL, payload: error.message });
    }
  };
};
