import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createSuggestion } from "../actions/suggestionAction";
import Loader from "../components/Loader";
import MessageBox from "../components/MessageBox";

export default function StuffSuggestionModal(props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Submitted");
  const dispatch = useDispatch();

  const suggestionCreate = useSelector((state) => state.suggestionCreate);
  const { loading, error, success } = suggestionCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSuggestion(fullName, email, message, status));
  };

  useEffect(() => {
    if (success) {
      setFullName("");
      setEmail("");
      setMessage("");
    }
  }, [success]);

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {loading && <Loader />}
      {error && <MessageBox variant="danger" parag={error} heading="Error" />}
      <Modal.Header onHide={props.close} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>Create Suggestion</h1>
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={submitHandler}>
        <Modal.Body>
          <div className="suggestionModal">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="suggestionModal">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="suggestionModal">
            <label>Message</label>
            <textarea
              placeholder="Write your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={props.close} className="suggestionModal__button">
            Submit
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
