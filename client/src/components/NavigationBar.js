import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <Navbar className="staff__navbar-container" expand="lg">
      <div className="staff__navbar-logo">
        <Link to="/">
          <img width="80" src="/images/logo2.png" alt="logo" />
        </Link>
      </div>

      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse className="justify-content-end" id="navbarScroll">
        {" "}
        <Nav.Link className="staff__navbar-link" href="/about-us">
          About us
        </Nav.Link>
        <Nav.Link className="staff__navbar-link" href="/upcoming-events">
          Events
        </Nav.Link>
        <Nav.Link className="staff__navbar-link" href="/articles">
          Articles
        </Nav.Link>
        <Nav.Link className="staff__navbar-link" href="/contact">
          Contact
        </Nav.Link>
        <Nav.Link className="staff__navbar-button" href="/private/login">
          Login
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
