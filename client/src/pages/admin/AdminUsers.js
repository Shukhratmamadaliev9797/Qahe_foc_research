import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../../node_modules/react-spinners/BarLoader";
import { deleteUser, listUsers } from "../../actions/userActions";
import MessageBox from "../../components/MessageBox";
import {
  USER_DELETE_RESET,
  USER_UPDATE_RESET,
} from "../../constants/userConstants";
import AdminEditUserModal from "../../modals/AdminEditUserModal";
import SmallModal from "../../modals/SmallModal";
import UserInfo from "../../modals/UserInfo";

export default function AdminUsers(props) {
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showUserInfoModal, setshowUserInfoModal] = useState(false);
  const [showUserEditModal, setShowUserEditModal] = useState(false);
  const [user, setUser] = useState();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
      setshowDeleteModal(false);
    }
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      setShowUserEditModal(false);
    }
  }, [dispatch, successDelete, user, successUpdate]);

  const userDeleteHandler = (user) => {
    dispatch(deleteUser(user._id));
  };
  return (
    <div
      className={
        !props.toggleNav ? "admin__users" : "admin__users admin__users-active"
      }
      data-aos="fade-left"
      data-aos-anchor="#example-anchor"
      data-aos-offset="500"
      data-aos-duration="500"
    >
      <SmallModal
        showModal={showDeleteModal}
        header="true"
        headingText="Delete user"
        body="true"
        bodyText="Are you sure you want to delete user?"
        footer="true"
        buttonClose="true"
        buttonCloseText="cancel"
        buttonAction="true"
        buttonActionText="delete"
        modalAction={() => userDeleteHandler(user)}
        closeModal={() => setshowDeleteModal(false)}
      />
      <UserInfo
        modalShow={showUserInfoModal}
        closeModal={() => setshowUserInfoModal(false)}
        user={user}
      />
      <AdminEditUserModal
        modalShow={showUserEditModal}
        closeModal={() => setShowUserEditModal(false)}
        user={user}
      />
      <div className="admin__users-header">
        <div className="admin__users-header-title">
          <h1>Total users</h1>
          <Link to="/admin/users/create/user">Create new user</Link>
        </div>
      </div>
      {loadingUpdate && <Loader />}
      {errorUpdate && (
        <MessageBox variant="danger" parag={errorUpdate} heading="Error" />
      )}
      {loadingDelete && <Loader />}
      {errorDelete && (
        <MessageBox variant="danger" parag={errorDelete} heading="Error" />
      )}
      {loading ? (
        "loading..."
      ) : error ? (
        <div>{error}</div>
      ) : (
        <table>
          <tr>
            <th>Photo</th>
            <th>Full name</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>

          {users.map((user) => {
            return (
              <>
                <tr key={user._id}>
                  <td>
                    <div className="admin__user-img">
                      <img
                        width="50px"
                        src={
                          user.image ? user.image : "/images/default-user.png"
                        }
                        alt={user.firstName}
                      />
                    </div>
                  </td>
                  <td>
                    {user.firstName && user.lastName ? (
                      user.firstName + " " + user.lastName
                    ) : (
                      <span className="notCompleted">not completed</span>
                    )}
                  </td>
                  <td>{user.userId}</td>
                  <td>
                    <span className="userStatus">
                      {user.isAdmin ? "Admin" : "Staff"}
                    </span>
                  </td>
                  <td>
                    {user.email ? (
                      user.email
                    ) : (
                      <span className="notCompleted">not completed</span>
                    )}
                  </td>
                  <td>
                    {user.mobileNumber ? (
                      user.mobileNumber
                    ) : (
                      <span className="notCompleted">not completed</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setshowUserInfoModal(true);
                        setUser(user);
                      }}
                      title="user info"
                      className="edit-button"
                    >
                      <i
                        title="user info"
                        className="far fa-clipboard edit-user-icon"
                      ></i>
                    </button>
                    <button
                      onClick={() => {
                        setShowUserEditModal(true);
                        setUser(user);
                      }}
                      className="edit-button"
                    >
                      <i className="fas fa-edit edit-user-icon"></i>
                    </button>

                    <button
                      className="edit-button"
                      onClick={() => {
                        setshowDeleteModal(true);
                        setUser(user);
                      }}
                    >
                      <i className="far fa-trash-alt edit-user-icon"></i>
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      )}
    </div>
  );
}
