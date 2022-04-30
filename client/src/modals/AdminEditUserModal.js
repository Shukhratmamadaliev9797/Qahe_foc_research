import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { updateUser } from "../actions/userActions";

export default function AdminEditUserModal({ closeModal, modalShow, user }) {
  const [UserId, setUserId] = useState("");
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setID(user._id);
      setUserId(user.userId);
      setPassword(user.password);
    }
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password are not matched ");
    } else {
      dispatch(updateUser(id, UserId, password));
    }
  };
  return (
    <Modal
      show={modalShow}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <h1>Update User</h1>
      </Modal.Header>
      <form className="" onSubmit={submitHandler}>
        <Modal.Body>
          <div className="inputBox inputBox-col-1">
            <label>User ID</label>
            <input
              type="text"
              value={UserId}
              placeholder="Enter User ID"
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="inputBox inputBox-col-1">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputBox inputBox-col-1">
            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="inputBox-rightSubmit">
            <button type="submit">Update</button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
