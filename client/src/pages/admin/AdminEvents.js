import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, listEvent } from "../../actions/eventActions";
import Loader from "../../components/Loader";
import MessageBox from "../../components/MessageBox";
import {
  EVENT_CREATE_RESET,
  EVENT_DELETE_RESET,
  EVENT_UPDATE_RESET,
} from "../../constants/eventConstants";
import AdminCreateEventModel from "../../modals/AdminCreateEventModel";
import SmallModal from "../../modals/SmallModal";
import AdminUpdateEventModel from "../../modals/AdminUpdateEventModel";

export default function AdminEvents() {
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [event, setEvent] = useState();
  const [showCreateModal, setshowCreateModal] = useState(false);
  const dispatch = useDispatch();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const eventCreate = useSelector((state) => state.eventCreate);
  const { loading, error, success } = eventCreate;

  const eventDelete = useSelector((state) => state.eventDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = eventDelete;

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = eventUpdate;

  const eventLists = useSelector((state) => state.eventList);
  const { loading: loadingList, error: errorList, eventList } = eventLists;

  useEffect(() => {
    dispatch(listEvent());
    if (success) {
      dispatch({ type: EVENT_CREATE_RESET });
      setshowCreateModal(false);
    }
    if (successDelete) {
      dispatch({ type: EVENT_DELETE_RESET });
      setshowDeleteModal(false);
    }
    if (successUpdate) {
      dispatch({ type: EVENT_UPDATE_RESET });
      setshowUpdateModal(false);
    }
  }, [success, dispatch, successDelete, successUpdate]);

  const eventDeleteHandler = (event) => {
    dispatch(deleteEvent(event._id));
  };
  return (
    <>
      <SmallModal
        showModal={showDeleteModal}
        header="true"
        headingText="Delete event"
        body="true"
        bodyText="Are you sure you want to delete event?"
        footer="true"
        buttonClose="true"
        buttonCloseText="cancel"
        buttonAction="true"
        buttonActionText="delete"
        modalAction={() => eventDeleteHandler(event)}
        closeModal={() => setshowDeleteModal(false)}
      />
      <AdminCreateEventModel
        show={showCreateModal}
        close={() => setshowCreateModal(false)}
      />
      <AdminUpdateEventModel
        event={event}
        show={showUpdateModal}
        close={() => setshowUpdateModal(false)}
      />
      <div
        className="adminEvent"
        data-aos="fade-left"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
      >
        <div className="adminDocuments__title">
          <h1>Events</h1>
          <button onClick={() => setshowCreateModal(true)}>Create Event</button>
        </div>
        {loading && <Loader />}
        {error && <MessageBox variant="danger" parag={error} heading="Error" />}
        {loadingDelete && <Loader />}
        {errorDelete && (
          <MessageBox variant="danger" parag={errorDelete} heading="Error" />
        )}
        {loadingUpdate && <Loader />}
        {errorUpdate && (
          <MessageBox variant="danger" parag={errorUpdate} heading="Error" />
        )}
        {loadingList ? (
          <Loader />
        ) : errorList ? (
          <MessageBox variant="danger" heading="Error" parag={errorList} />
        ) : (
          <div>
            {eventList.map((event) => {
              return (
                <div className="adminEvent__card">
                  <div className="adminEvent__card-date">
                    <span>
                      {monthNames[event.startDate.substring(5, 7) - 1]}
                    </span>
                    <span>{event.startDate.substring(8)}</span>
                  </div>
                  <div className="adminEvent__card-content">
                    <div className="adminEvent__card-name">{event.name}</div>
                    <div className="adminEvent__card-about">
                      {event.about.substring(0, 100)}...
                    </div>
                    <div className="adminEvent__card-location">
                      {event.location}
                    </div>
                  </div>
                  <div className="adminEvent__card-action">
                    <button
                      onClick={() => {
                        setshowUpdateModal(true);
                        setEvent(event);
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setshowDeleteModal(true);
                        setEvent(event);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
