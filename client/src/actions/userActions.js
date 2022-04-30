import axios from "axios";
import {
  COLLEAGUES_LIST_FAIL,
  COLLEAGUES_LIST_REQUEST,
  COLLEAGUES_LIST_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const signin = (userId, password) => {
  return async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { userId, password } });
    try {
      const { data } = await axios.post("/api/users/signin", {
        userId,
        password,
      });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listUsers = () => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_LIST_FAIL, payload: message });
    }
  };
};
export const listColleagues = () => {
  return async (dispatch, getState) => {
    dispatch({ type: COLLEAGUES_LIST_REQUEST });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get("/api/users/colleagues");
      dispatch({ type: COLLEAGUES_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: COLLEAGUES_LIST_FAIL, payload: message });
    }
  };
};

export const detailsUser = (userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_DETAILS_FAIL, payload: message });
    }
  };
};
export const updateUserProfile = ({
  usId,
  profileImage,
  firstName,
  lastName,
  aboutMe,
  interests,
  phoneNumber,
  email,
  address,
  twitterLink,
  facebookLink,
  linkedinLink,
}) => {
  return async (dispatch, getState) => {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
      payload: {
        profileImage,
        firstName,
        lastName,
        aboutMe,
        interests,
        phoneNumber,
        email,
        address,
        twitterLink,
        facebookLink,
        linkedinLink,
      },
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/api/users/profile/${usId}`,
        {
          profileImage,
          firstName,
          lastName,
          aboutMe,
          interests,
          phoneNumber,
          email,
          address,
          twitterLink,
          facebookLink,
          linkedinLink,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
    }
  };
};

export const register = (userId, password, isAdmin, isStaff) => {
  return async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { userId, password, isAdmin, isStaff },
    });
    try {
      const { data } = await axios.post("/api/users/register", {
        userId,
        password,
        isAdmin,
        isStaff,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const signout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_SIGNOUT });
  };
};

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.delete(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: USER_DELETE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_DELETE_FAIL, payload: message });
    }
  };
};

export const updateUser = (id, userId, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, password } });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/api/users/${id}`,
        { userId, password },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_UPDATE_FAIL, payload: message });
    }
  };
};
