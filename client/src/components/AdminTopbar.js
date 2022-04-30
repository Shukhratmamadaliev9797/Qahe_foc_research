import React from "react";
import { useSelector } from "react-redux";

export default function AdminTopbar({ setToggle, toggleNavbar }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  return (
    <div
      className={
        !toggleNavbar
          ? "admin__topbarBox"
          : "admin__topbarBox admin__topbarBox-active"
      }
    >
      <div className="admin__topbar">
        <div className="admin__topbar-toggle">
          <i className="fas fa-bars"></i>
        </div>
        <div className="admin__topbar-title">
          <h1>Dashboard</h1>
        </div>
        <div className="admin__topbar-user">
          <span>
            Welcome ${userInfo.firstName} {userInfo.lastName}
          </span>
          <img src={userInfo.image} alt="user" />
        </div>
      </div>
    </div>
  );
}
