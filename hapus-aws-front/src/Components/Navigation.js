import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { signout, isAuthenticated } from "../Auth/PrimaryAuth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "Black" };
  } else {
    return { color: "#ffffff" };
  }
};

const Navigation = ({ history }) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">Hapus</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/" style={isActive(history, "/")}>
            Home
          </Nav.Link>

          {isAuthenticated() && isAuthenticated().user.role === "user" && (
            <Nav.Link
              href="/user/dashboard"
              style={isActive(history, "/user/dahsboard")}
            >
              Dashboard
            </Nav.Link>
          )}

          {isAuthenticated() && isAuthenticated().user.role === "inst" && (
            <Nav.Link
              href="/institute/dashboard"
              style={isActive(history, "/institute/dahsboard")}
            >
              Dashboard
            </Nav.Link>
          )}

          {isAuthenticated() && isAuthenticated().user.role === "admin" && (
            <Nav.Link
              href="/admin/dashboard"
              style={isActive(history, "/admin/dahsboard")}
            >
              Dashboard
            </Nav.Link>
          )}

          {!isAuthenticated() && (
            <Fragment>
              <Nav.Link href="/signup" style={isActive(history, "/signup")}>
                Signup
              </Nav.Link>

              <Nav.Link href="/login" style={isActive(history, "/login")}>
                Login
              </Nav.Link>
            </Fragment>
          )}

          {isAuthenticated() && (
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                Signout
              </span>
            </li>
          )}
           <Nav.Link href="/" style={{ cursor: "pointer", color: "#ffffff" }} >
            About Us
          </Nav.Link>
          <Nav.Link href="/" style={{ cursor: "pointer", color: "#ffffff" }}>
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigation);
