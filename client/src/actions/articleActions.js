import axios from "../../node_modules/axios/index";
import {
  ARTICLE_DELETE_FAIL,
  ARTICLE_DELETE_SUCCESS,
  ARTICLE_DETAILS_FAIL,
  ARTICLE_DETAILS_REQUEST,
  ARTICLE_DETAILS_SUCCESS,
  ARTICLE_LATEST_FAIL,
  ARTICLE_LATEST_REQUEST,
  ARTICLE_LATEST_SUCCESS,
  ARTICLE_LIST_FAIL,
  ARTICLE_LIST_REQUEST,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_NOT_RELATED_FAIL,
  ARTICLE_NOT_RELATED_REQUEST,
  ARTICLE_NOT_RELATED_SUCCESS,
  ARTICLE_RELATED_FAIL,
  ARTICLE_RELATED_REQUEST,
  ARTICLE_RELATED_SUCCESS,
  ARTICLE_UPDATE_FAIL,
  ARTICLE_UPDATE_REQUEST,
  ARTICLE_UPDATE_SUCCESS,
  ARTICLE_WRITE_FAIL,
  ARTICLE_WRITE_REQUEST,
  ARTICLE_WRITE_SUCCESS,
} from "../constants/articleConstants";

export const writeArticle = () => {
  return async (dispatch, getState) => {
    dispatch({ type: ARTICLE_WRITE_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        "/api/articles",
        {},
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: ARTICLE_WRITE_SUCCESS, payload: data.article });
    } catch (error) {
      dispatch({
        type: ARTICLE_WRITE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const detailsArticle = (articleId) => {
  return async (dispatch) => {
    dispatch({ type: ARTICLE_DETAILS_REQUEST, payload: articleId });
    try {
      const { data } = await axios.get(`/api/articles/${articleId}`);
      dispatch({ type: ARTICLE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ARTICLE_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateArticle = (article) => {
  return async (dispatch, getState) => {
    dispatch({ type: ARTICLE_UPDATE_REQUEST, payload: article });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/api/articles/${article._id}`,
        article,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: ARTICLE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ARTICLE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listArticles = ({ writer = "", title = "", category = "" }) => {
  return async (dispatch) => {
    dispatch({ type: ARTICLE_LIST_REQUEST });
    try {
      const { data } = await axios.get(
        `/api/articles?writer=${writer}&title=${title}&category=${category}`
      );
      dispatch({ type: ARTICLE_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ARTICLE_LIST_FAIL, payload: error.message });
    }
  };
};

export const deleteArticle = (articleId) => {
  return async (dispatch, getState) => {
    dispatch({ type: ARTICLE_DELETE_SUCCESS, payload: articleId });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.delete(`/api/articles/${articleId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: ARTICLE_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: ARTICLE_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const latestArticles = () => {
  return async (dispatch) => {
    dispatch({ type: ARTICLE_LATEST_REQUEST });
    try {
      const { data } = await axios.get(`/api/articles/latest`);
      dispatch({ type: ARTICLE_LATEST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ARTICLE_LATEST_FAIL, payload: error.message });
    }
  };
};

export const relatedArticles = (articleId) => {
  return async (dispatch) => {
    dispatch({ type: ARTICLE_RELATED_REQUEST, payload: articleId });
    try {
      const { data } = await axios.get(`/api/articles/related/${articleId}`);
      dispatch({ type: ARTICLE_RELATED_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ARTICLE_RELATED_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const notRelatedArticles = (articleId) => {
  return async (dispatch) => {
    dispatch({ type: ARTICLE_NOT_RELATED_REQUEST, payload: articleId });
    try {
      const { data } = await axios.get(`/api/articles/notrelated/${articleId}`);
      dispatch({ type: ARTICLE_NOT_RELATED_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ARTICLE_NOT_RELATED_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
