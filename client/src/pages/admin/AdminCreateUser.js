import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import { useHistory } from "react-router-dom";
import { USER_REGISTER_RESET } from "../../constants/userConstants";

export default function AdminCreateUser(props) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isStaff, setIsStaff] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success } = userRegister;
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not matched");
    } else {
      dispatch(register(userId, password, isAdmin, isStaff));
    }
  };

  useEffect(() => {
    if (success) {
      history.push("/admin/users");
      dispatch({ type: USER_REGISTER_RESET });
    }
  }, [success, history, dispatch]);
  return (
    <div className="admin__createUser">
      {loading && "loading"}
      {error && error}
      <div className="admin__createUser-header">
        <h1>Create User</h1>
      </div>
      <div className="admin__createUser-body">
        <form className="admin__createUser-form" onSubmit={submitHandler}>
          <div className="admin__createUser-form-headerBox">
            <div className="admin__createUser-form-header">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <div className="inputBox">
            <label htmlFor="userID">User ID</label>
            <input
              id="userID"
              type="text"
              placeholder="Enter User ID"
              autoComplete="off"
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <label htmlFor="userPassword">User Password</label>
            <input
              id="userPassword"
              type="password"
              placeholder="Enter User Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <label htmlFor="confirmUserPassword">Confirm User Password</label>
            <input
              id="confirmUserPassword"
              type="password"
              placeholder="Confirm User Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="admin__createUser-form-checkbox ">
            <div className="">
              <label htmlFor="isAdmin">Is Admin</label>
              <input
                id="isAdmin"
                type="checkbox"
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
            <div className="">
              <label htmlFor="isStaff">Is Staff</label>
              <input
                id="isStaff"
                type="checkbox"
                onChange={(e) => setIsStaff(e.target.checked)}
              />
            </div>
          </div>

          <div className="inputBox-fullButton">
            <button type="submit">Create User</button>
          </div>
        </form>
      </div>
    </div>
  );
}
