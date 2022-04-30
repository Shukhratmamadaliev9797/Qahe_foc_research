import React, { useState } from "react";
import axios from "../../node_modules/axios/index";
import Notification from "./Notification";

export default function ContactContent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");

    setTimeout(() => {
      setSent(false);
    }, 4000);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setSent(true);
    axios
      .post("/api/email/sent", { firstName, lastName, email, message })
      .then((res) => {}, resetForm())
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {sent ? (
        <Notification success="true" extraClass="success">
          Email sent
        </Notification>
      ) : (
        ""
      )}

      <div className="contact">
        <div className="contact__header" data-aos="fade-down">
          <h1>HAVE SOME QUESTIONS?</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </p>
        </div>
        <div className="contact__main">
          <div className="contact__main-left" data-aos="fade-right">
            <i className="fas fa-mail-bulk contact__main-left-icon"></i>
          </div>
          <form
            onSubmit={submitHandler}
            className="contact__main-right"
            data-aos="fade-left"
          >
            <div className="inputBox">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
              />
            </div>
            <div className="inputBox">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="inputBox">
              <label>Email</label>
              <input
                type="email"
                placeholder="What is your email?"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="inputBox">
              <label>Message</label>
              <textarea
                type="text"
                placeholder="Write you message..."
                rows="10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div className="inputBox-fullButton">
              <button type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
