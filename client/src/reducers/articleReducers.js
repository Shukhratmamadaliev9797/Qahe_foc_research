import {
  ARTICLE_DETAILS_FAIL,
  ARTICLE_DETAILS_REQUEST,
  ARTICLE_DETAILS_SUCCESS,
  ARTICLE_LIST_REQUEST,
  ARTICLE_LIST_FAIL,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_UPDATE_FAIL,
  ARTICLE_UPDATE_REQUEST,
  ARTICLE_UPDATE_RESET,
  ARTICLE_UPDATE_SUCCESS,
  ARTICLE_WRITE_FAIL,
  ARTICLE_WRITE_REQUEST,
  ARTICLE_WRITE_RESET,
  ARTICLE_WRITE_SUCCESS,
  ARTICLE_DELETE_REQUEST,
  ARTICLE_DELETE_SUCCESS,
  ARTICLE_DELETE_FAIL,
  ARTICLE_DELETE_RESET,
  ARTICLE_RELATED_REQUEST,
  ARTICLE_LATEST_SUCCESS,
  ARTICLE_LATEST_REQUEST,
  ARTICLE_LATEST_FAIL,
  ARTICLE_RELATED_SUCCESS,
  ARTICLE_RELATED_FAIL,
  ARTICLE_NOT_RELATED_REQUEST,
  ARTICLE_NOT_RELATED_SUCCESS,
  ARTICLE_NOT_RELATED_FAIL,
} from "../constants/articleConstants";

export const articleWriteReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_WRITE_REQUEST:
      return { loading: true };
    case ARTICLE_WRITE_SUCCESS:
      return { loading: false, success: true, article: action.payload };
    case ARTICLE_WRITE_FAIL:
      return { loading: false, error: action.payload };
    case ARTICLE_WRITE_RESET:
      return {};
    default:
      return state;
  }
};

export const articleDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ARTICLE_DETAILS_REQUEST:
      return { loading: true };
    case ARTICLE_DETAILS_SUCCESS:
      return { loading: false, article: action.payload };
    case ARTICLE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const articleUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_UPDATE_REQUEST:
      return { loading: true };
    case ARTICLE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ARTICLE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ARTICLE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const articleListReducer = (state = { articleList: [] }, action) => {
  switch (action.type) {
    case ARTICLE_LIST_REQUEST:
      return { loading: true };
    case ARTICLE_LIST_SUCCESS:
      return { loading: false, articleList: action.payload };
    case ARTICLE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const articleDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_DELETE_REQUEST:
      return { loading: true };
    case ARTICLE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ARTICLE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ARTICLE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const articleLatestReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_LATEST_REQUEST:
      return { loading: true };
    case ARTICLE_LATEST_SUCCESS:
      return { loading: false, topicLatest: action.payload };
    case ARTICLE_LATEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const articleRelatedReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_RELATED_REQUEST:
      return { loading: true };
    case ARTICLE_RELATED_SUCCESS:
      return { loading: false, topicRelated: action.payload };
    case ARTICLE_RELATED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const notArticleRelatedReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_NOT_RELATED_REQUEST:
      return { loading: true };
    case ARTICLE_NOT_RELATED_SUCCESS:
      return { loading: false, notTopicRelated: action.payload };
    case ARTICLE_NOT_RELATED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
