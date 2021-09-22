import React from "react";
import Layout from "../Components/Layout";
import { isAuthenticated } from "../Auth/PrimaryAuth";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const adminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
             Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="#">
              Create Course
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="#">
              Admin Link 3
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="#">
            Admin Link 4
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="#">
            Admin Link 5
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Admin Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === "admin" ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`G'day ${name}!`}
      className="container-fluid"
    >
      <Container fluid>
        <Row>
          <Col sm={3}>{adminLinks()}</Col>
          <Col sm={9}>{adminInfo()}</Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default adminDashboard;
