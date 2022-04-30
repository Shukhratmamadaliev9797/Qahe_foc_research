import axios from "../../node_modules/axios/index";
import {
  EVENT_CREATE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
} from "../constants/eventConstants";

export const createEvent = (
  eventName,
  eventPresenter,
  aboutEvent,
  startEventDate,
  endEventDate,
  startEventTime,
  endEventTime,
  eventLocation
) => {
  return async (dispatch) => {
    dispatch({
      type: EVENT_CREATE_REQUEST,
      payload: {
        eventName,
        eventPresenter,
        aboutEvent,
        startEventDate,
        endEventDate,
        startEventTime,
        endEventTime,
        eventLocation,
      },
    });
    try {
      const { data } = await axios.post("/api/events/createEvent", {
        eventName,
        eventPresenter,
        aboutEvent,
        startEventDate,
        endEventDate,
        startEventTime,
        endEventTime,
        eventLocation,
      });
      dispatch({ type: EVENT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EVENT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listEvent = () => {
  return async (dispatch) => {
    dispatch({ type: EVENT_LIST_REQUEST });
    try {
      const { data } = await axios.get(`/api/events`);
      dispatch({ type: EVENT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: EVENT_LIST_FAIL, payload: error.message });
    }
  };
};

export const deleteEvent = (eventId) => {
  return async (dispatch, getState) => {
    dispatch({ type: EVENT_DELETE_REQUEST, payload: eventId });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.delete(`/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: EVENT_DELETE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: EVENT_DELETE_FAIL, payload: message });
    }
  };
};

export const updateEvent = (
  eventId,
  eventName,
  eventPresenter,
  aboutEvent,
  startEventDate,
  endEventDate,
  startEventTime,
  endEventTime,
  eventLocation
) => {
  return async (dispatch, getState) => {
    dispatch({
      type: EVENT_UPDATE_REQUEST,
      payload: {
        eventName,
        eventPresenter,
        aboutEvent,
        startEventDate,
        endEventDate,
        startEventTime,
        endEventTime,
        eventLocation,
      },
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/api/events/${eventId}`,
        {
          eventName,
          eventPresenter,
          aboutEvent,
          startEventDate,
          endEventDate,
          startEventTime,
          endEventTime,
          eventLocation,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: EVENT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: EVENT_UPDATE_FAIL, payload: message });
    }
  };
};
