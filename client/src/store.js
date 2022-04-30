import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducers,
  userSignInReducers,
  userUpdateProfileReducer,
  colleaguesListReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  articleDeleteReducer,
  articleDetailsReducer,
  articleLatestReducer,
  articleListReducer,
  articleRelatedReducer,
  articleUpdateReducer,
  articleWriteReducer,
  notArticleRelatedReducer,
} from "./reducers/articleReducers";
import {
  suggestionCreateReducers,
  suggestionListReducer,
  suggestionUpdateReducer,
} from "./reducers/suggestionReducer";
import {
  trainingScheduleListReducer,
  trainingScheduleReducer,
} from "./reducers/trainingScheduleReducer";
import {
  documentListReducer,
  documentUploadReducers,
} from "./reducers/documentReducer";
import {
  eventCreateReducers,
  eventDeleteReducer,
  eventListReducer,
  eventUpdateReducer,
} from "./reducers/eventsReducer";
const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
const reducer = combineReducers({
  userSignIn: userSignInReducers,
  userList: userListReducer,
  userRegister: userRegisterReducers,
  userDelete: userDeleteReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  colleaguesList: colleaguesListReducer,
  articleWrite: articleWriteReducer,
  articleDetails: articleDetailsReducer,
  articleUpdate: articleUpdateReducer,
  articleList: articleListReducer,
  articleDelete: articleDeleteReducer,
  suggestionCreate: suggestionCreateReducers,
  suggestionList: suggestionListReducer,
  suggestionUpdate: suggestionUpdateReducer,
  trainingScheduleCreate: trainingScheduleReducer,
  trainingScheduleList: trainingScheduleListReducer,
  documentUpload: documentUploadReducers,
  documentList: documentListReducer,
  eventCreate: eventCreateReducers,
  eventList: eventListReducer,
  eventDelete: eventDeleteReducer,
  eventUpdate: eventUpdateReducer,
  articleLatest: articleLatestReducer,
  articleRelated: articleRelatedReducer,
  articleNotRelated: notArticleRelatedReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
