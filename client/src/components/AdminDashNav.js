import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { signout } from "../actions/userActions";
export default function AdminDashNav(props) {
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signout());
  };
  return (
    <div className="admin__container">
      <div
        className={
          !props.toggleNav
            ? "admin__navigation"
            : "admin__navigation admin__navigation-active"
        }
        data-aos="fade-right"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
      >
        <ul>
          <li>
            <NavLink to="/">
              <span className="admin__navigation-icon">
                <img src="/images/logo2.png" width="70px" alt="logo" />
              </span>
              <span className="admin__navigation-title">Qahe Foc</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin">
              <span className="admin__navigation-icon">
                <i className="fas fa-home"></i>
              </span>
              <span className="admin__navigation-title">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/profile">
              <span className="admin__navigation-icon">
                <i class="fas fa-user"></i>
              </span>
              <span className="admin__navigation-title">Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users">
              <span className="admin__navigation-icon">
                <i className="fas fa-users"></i>
              </span>
              <span className="admin__navigation-title">Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/training-schedule">
              <span className="admin__navigation-icon">
                <i className="fas fa-clipboard-list"></i>
              </span>
              <span className="admin__navigation-title">Training</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/documents">
              <span className="admin__navigation-icon">
                <i className="fas fa-folder-open"></i>
              </span>
              <span className="admin__navigation-title">Documents</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/events">
              <span className="admin__navigation-icon">
                <i className="fas fa-calendar-alt"></i>
              </span>
              <span className="admin__navigation-title">Events</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/suggestions">
              <span className="admin__navigation-icon">
                <i className="fas fa-comment-alt"></i>
              </span>
              <span className="admin__navigation-title">Suggestions</span>
            </NavLink>
          </li>
          <li onClick={signOutHandler}>
            <NavLink to="/private/login">
              <span className="admin__navigation-icon">
                <i className="fas fa-sign-out-alt"></i>
              </span>
              <span className="admin__navigation-title">Sign out</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
