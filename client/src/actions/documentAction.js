import axios from "../../node_modules/axios/index";
import {
  DOCUMENT_UPLOAD_FAIL,
  DOCUMENT_UPLOAD_REQUEST,
  DOCUMENT_UPLOAD_SUCCESS,
  DOCUMENT_LIST_REQUEST,
  DOCUMENT_LIST_SUCCESS,
  DOCUMENT_LIST_FAIL,
} from "../constants/documentConstant";

export const uploadDocument = (fileName, fileLink) => {
  return async (dispatch) => {
    dispatch({
      type: DOCUMENT_UPLOAD_REQUEST,
      payload: { fileName, fileLink },
    });
    try {
      const { data } = await axios.post("/api/documents/uploadDocument", {
        fileName,
        fileLink,
      });
      dispatch({ type: DOCUMENT_UPLOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DOCUMENT_UPLOAD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listDocuments = () => {
  return async (dispatch) => {
    dispatch({ type: DOCUMENT_LIST_REQUEST });
    try {
      const { data } = await axios.get(`/api/documents`);
      dispatch({ type: DOCUMENT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DOCUMENT_LIST_FAIL, payload: error.message });
    }
  };
};
