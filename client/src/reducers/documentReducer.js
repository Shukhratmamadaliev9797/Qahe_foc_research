import {
  DOCUMENT_LIST_FAIL,
  DOCUMENT_LIST_REQUEST,
  DOCUMENT_LIST_SUCCESS,
  DOCUMENT_UPLOAD_FAIL,
  DOCUMENT_UPLOAD_REQUEST,
  DOCUMENT_UPLOAD_RESET,
  DOCUMENT_UPLOAD_SUCCESS,
} from "../constants/documentConstant";

export const documentUploadReducers = (state = { success: false }, action) => {
  switch (action.type) {
    case DOCUMENT_UPLOAD_REQUEST:
      return { loading: true };
    case DOCUMENT_UPLOAD_SUCCESS:
      return { loading: false, success: true };
    case DOCUMENT_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    case DOCUMENT_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
};

export const documentListReducer = (state = { documentList: [] }, action) => {
  switch (action.type) {
    case DOCUMENT_LIST_REQUEST:
      return { loading: true };
    case DOCUMENT_LIST_SUCCESS:
      return { loading: false, documentList: action.payload };
    case DOCUMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
