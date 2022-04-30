import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listEvent } from "../actions/eventActions";
import Loader from "./Loader";
import MessageBox from "./MessageBox";

export default function AllEvents() {
  const eventLists = useSelector((state) => state.eventList);
  const { loading: loadingList, error: errorList, eventList } = eventLists;
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
  useEffect(() => {
    dispatch(listEvent());
  }, [dispatch]);
  return (
    <div className="Allevents">
      <div className="titlePage">
        <h1>All Upcoming Events</h1>
      </div>
      {loadingList ? (
        <Loader />
      ) : errorList ? (
        <MessageBox variant="danger" parag={errorList} />
      ) : (
        <div className="Allevents__cardBox">
          {eventList
            .reverse()
            .slice(0, 4)
            .map((event, i) => {
              return (
                <div
                  key={event._id}
                  className="events__card"
                  data-aos="fade-down"
                >
                  <div className="events__card-title">{event.name}</div>
                  <div className="events__card-about">
                    {event.about.substring(0, 200)}...
                  </div>
                  <div className="events__card-time">
                    <span>
                      {event.startDate.substring(8)}{" "}
                      {monthNames[event.startDate.substring(5, 7) - 1]}{" "}
                      {event.startDate.substring(0, 4)}
                    </span>
                    <span>
                      {event.startTime} - {event.endTime}
                    </span>
                  </div>
                  <div className="events__card-author">{event.presenter}</div>
                  <div className="events__card-author">{event.location}</div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
