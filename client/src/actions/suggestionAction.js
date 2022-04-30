import axios from "../../node_modules/axios/index";
import {
  SUGGESTIONS_LIST_FAIL,
  SUGGESTIONS_LIST_REQUEST,
  SUGGESTIONS_LIST_SUCCESS,
  SUGGESTION_UPDATE_FAIL,
  SUGGESTION_UPDATE_REQUEST,
  SUGGESTION_UPDATE_SUCCESS,
  SUGGESTION_WRITE_FAIL,
  SUGGESTION_WRITE_REQUEST,
  SUGGESTION_WRITE_SUCCESS,
} from "../constants/suggestionConstant";

export const createSuggestion = (fullName, email, message, status) => {
  return async (dispatch) => {
    dispatch({
      type: SUGGESTION_WRITE_REQUEST,
      payload: { fullName, email, message, status },
    });
    try {
      const { data } = await axios.post("/api/suggestions/createSuggestion", {
        fullName,
        email,
        message,
        status,
      });
      dispatch({ type: SUGGESTION_WRITE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SUGGESTION_WRITE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listSuggestion = () => {
  return async (dispatch) => {
    dispatch({ type: SUGGESTIONS_LIST_REQUEST });
    try {
      const { data } = await axios.get(`/api/suggestions`);
      dispatch({ type: SUGGESTIONS_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SUGGESTIONS_LIST_FAIL, payload: error.message });
    }
  };
};

export const updateSuggestion = (suggestionId, status) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SUGGESTION_UPDATE_REQUEST,
      payload: { status },
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/api/suggestions/${suggestionId}`,
        { status },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: SUGGESTION_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SUGGESTION_UPDATE_FAIL, payload: message });
    }
  };
};
