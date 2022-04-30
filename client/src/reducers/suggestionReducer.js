import {
  SUGGESTIONS_LIST_FAIL,
  SUGGESTIONS_LIST_REQUEST,
  SUGGESTIONS_LIST_SUCCESS,
  SUGGESTION_UPDATE_FAIL,
  SUGGESTION_UPDATE_REQUEST,
  SUGGESTION_UPDATE_RESET,
  SUGGESTION_UPDATE_SUCCESS,
  SUGGESTION_WRITE_FAIL,
  SUGGESTION_WRITE_REQUEST,
  SUGGESTION_WRITE_RESET,
  SUGGESTION_WRITE_SUCCESS,
} from "../constants/suggestionConstant";

export const suggestionCreateReducers = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case SUGGESTION_WRITE_REQUEST:
      return { loading: true };
    case SUGGESTION_WRITE_SUCCESS:
      return { loading: false, success: true };
    case SUGGESTION_WRITE_FAIL:
      return { loading: false, error: action.payload };
    case SUGGESTION_WRITE_RESET:
      return {};
    default:
      return state;
  }
};

export const suggestionListReducer = (
  state = { suggestionList: [] },
  action
) => {
  switch (action.type) {
    case SUGGESTIONS_LIST_REQUEST:
      return { loading: true };
    case SUGGESTIONS_LIST_SUCCESS:
      return { loading: false, suggestionList: action.payload };
    case SUGGESTIONS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const suggestionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SUGGESTION_UPDATE_REQUEST:
      return { loading: true };
    case SUGGESTION_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case SUGGESTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SUGGESTION_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
