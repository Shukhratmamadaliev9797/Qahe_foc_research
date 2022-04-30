import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../node_modules/react-spinners/BarLoader";
import { signin } from "../../actions/userActions";
import MessageBox from "../../components/MessageBox";

export default function Login(props) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(userId, password));
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin === true) {
        props.history.push("/admin");
      } else if (userInfo.isStaff === true) {
        props.history.push("/staff");
      } else {
        return;
      }
    }
  }, [userInfo, props.history, userId]);
  return (
    <div className="Login_container">
      <div data-aos="fade-down" className="Login_box">
        <div className="Login_box-header">
          <img src="/images/logo.png" alt="logo" />
          <h1>Staff Login</h1>
        </div>

        <form className="Login_box-body" onSubmit={submitHandler}>
          {loading && <Loader />}
          {error && (
            <MessageBox variant="danger" heading="Error" parag={error} />
          )}
          <div className="Login_box-body-inputBox">
            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              id="userId"
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter ID"
              required
            />
          </div>
          <div className="Login_box-body-inputBox">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div></div>
          <div className="Login_box-body-inputBox">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
