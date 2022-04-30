import React from "react";
import Modal from "react-bootstrap/Modal";
export default function UserInfo({ closeModal, modalShow, user }) {
  return (
    <Modal
      show={modalShow}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <h1>User Info</h1>
      </Modal.Header>
      <Modal.Body>
        <div className="userInfoModal">
          <div className="userInfoModal__id">User ID: {user?.userId}</div>
          <div className="userInfoModal__imageBox">
            <div className="userInfoModal__image">
              <img
                src={user?.image ? user?.image : "/images/default-user.png"}
                alt="user"
              />
            </div>
          </div>

          <div className="userInfoModal__name">
            <h1>
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
          <hr />
          <div className="userInfoModal__about">
            <h3>About</h3>
            <p>{user?.aboutMe}</p>
          </div>
          <hr />
          <div className="userInfoModal__interests">
            <h3>Interests</h3>
            <p>{user?.interests}</p>
          </div>
          <hr />
          <div className="userInfoModal__contact">
            <h3>Contact Info</h3>
            <ul>
              <li>
                <b>Email: </b>
                {user?.email}
              </li>
              <li>
                <b>Phone: </b>
                {user?.phoneNumber}
              </li>
            </ul>
          </div>
          <hr />
          <div className="userInfoModal__social">
            <h3>Social media</h3>
            <ul>
              <li>
                <a href={user?.facebookLink}>Facebook</a>
              </li>
              <li>
                <a href={user?.twitterLink}>Twitter</a>
              </li>
              <li>
                <a href={user?.linkedinLink}>Linkedin</a>
              </li>
            </ul>
          </div>
          <hr />
          <div className="userInfoModal__address">
            <h3>Address</h3>
            <p>{user?.address}</p>
          </div>
          <hr />
          <div className="userInfoModal__status">
            <h3>Status</h3>
            <span>
              {user?.isAdmin
                ? "Admin"
                : user?.isStuff
                ? "Staff"
                : user?.isAdmin && user.isStuff
                ? "Admin/Staff"
                : ""}
            </span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
