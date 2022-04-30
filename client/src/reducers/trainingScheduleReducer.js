import {
  TRAINING_SCHEDULE_CREATE_FAIL,
  TRAINING_SCHEDULE_CREATE_REQUEST,
  TRAINING_SCHEDULE_CREATE_RESET,
  TRAINING_SCHEDULE_CREATE_SUCCESS,
  TRAINING_SCHEDULE_LIST_FAIL,
  TRAINING_SCHEDULE_LIST_REQUEST,
  TRAINING_SCHEDULE_LIST_SUCCESS,
} from "../constants/trainingScheduleConstant";

export const trainingScheduleReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case TRAINING_SCHEDULE_CREATE_REQUEST:
      return { loading: true };
    case TRAINING_SCHEDULE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case TRAINING_SCHEDULE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRAINING_SCHEDULE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const trainingScheduleListReducer = (
  state = { trainingScheduleList: [] },
  action
) => {
  switch (action.type) {
    case TRAINING_SCHEDULE_LIST_REQUEST:
      return { loading: true };
    case TRAINING_SCHEDULE_LIST_SUCCESS:
      return { loading: false, trainingScheduleList: action.payload };
    case TRAINING_SCHEDULE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
