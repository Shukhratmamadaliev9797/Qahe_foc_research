import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { updateEvent } from "../actions/eventActions";

export default function AdminUpdateEventModel({ event, show, close }) {
  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventPresenter, setEventPresenter] = useState("");
  const [aboutEvent, setAboutEvent] = useState("");
  const [startEventDate, setStartEventDate] = useState("");
  const [endEventDate, setEndEventDate] = useState("");
  const [startEventTime, setStartEventTime] = useState("");
  const [endEventTime, setEndEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (event) {
      setEventId(event._id);
      setEventName(event.name);
      setEventPresenter(event.presenter);
      setAboutEvent(event.about);
      setStartEventDate(event.startDate);
      setEndEventDate(event.endDate);
      setStartEventTime(event.startTime);
      setEndEventTime(event.endTime);
      setEventLocation(event.location);
    }
  }, [event]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateEvent(
        eventId,
        eventName,
        eventPresenter,
        aboutEvent,
        startEventDate,
        endEventDate,
        startEventTime,
        endEventTime,
        eventLocation
      )
    );
  };
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header onHide={close} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>Update Event</h1>
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={submitHandler}>
        <Modal.Body>
          <div className="adminEvent__inputBox-col1">
            <label>Event Name</label>
            <input
              type="text"
              value={eventName}
              placeholder="Enter Event Name"
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="adminEvent__inputBox-col1">
            <label>Event Presenter</label>
            <input
              type="text"
              value={eventPresenter}
              placeholder="Enter Event Presenter"
              onChange={(e) => setEventPresenter(e.target.value)}
            />
          </div>
          <div className="adminEvent__inputBox-col1">
            <label>About Event</label>
            <textarea
              type="text"
              value={aboutEvent}
              placeholder="Tell About Event"
              onChange={(e) => setAboutEvent(e.target.value)}
            />
          </div>
          <div className="adminEvent__inputBox-col2">
            <div>
              <label>Start Date</label>
              <input
                type="date"
                value={startEventDate}
                onChange={(e) => setStartEventDate(e.target.value)}
              />
            </div>
            <div>
              <label>End Date</label>
              <input
                type="date"
                value={endEventDate}
                onChange={(e) => setEndEventDate(e.target.value)}
              />
            </div>
          </div>
          <div className="adminEvent__inputBox-col2">
            <div>
              <label>Start Time</label>
              <input
                type="time"
                value={startEventTime}
                onChange={(e) => setStartEventTime(e.target.value)}
              />
            </div>
            <div>
              <label>End Time</label>
              <input
                type="time"
                value={endEventTime}
                onChange={(e) => setEndEventTime(e.target.value)}
              />
            </div>
          </div>
          <div className="adminEvent__inputBox-col1">
            <label>Event Location</label>
            <input
              type="text"
              value={eventLocation}
              placeholder="Enter Event Location"
              onChange={(e) => setEventLocation(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="suggestionModal__button">Update</button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
