import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";

export default function StaffNav() {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  return (
    <Navbar className="staff__navbar-container" expand="lg">
      <div className="staff__navbar-logo">
        <img width="60" src="/images/logo2.png" alt="logo" />
      </div>

      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse className="justify-content-end" id="navbarScroll">
        <span>Welcome back {userInfo.firstName}</span>
      </Navbar.Collapse>
    </Navbar>
  );
}
