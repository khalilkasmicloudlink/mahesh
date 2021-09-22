import React from "react";
import Layout from "../Components/Layout";
import { isAuthenticated } from "../Auth/PrimaryAuth";

import { Card, ListGroup, Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <Card>
        <Card.Header>
          <h3>User Links</h3>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Card.Link href="/cart">My Cart</Card.Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Card.Link href="/profile/update">Update Profile</Card.Link>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  };

  const userInfo = () => {
    return (
      <Card>
        <Card.Header>
          <h3>User Information</h3>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>{name}</ListGroup.Item>
          <ListGroup.Item>{email}</ListGroup.Item>
          <ListGroup.Item>
            {" "}
            {role === 1 ? "Admin" : "Registered User"}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  };

  const purchaseHistory = () => {
    return (
      <Card>
        <Card.Header>
          <h3>Purchase History</h3>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>name</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </Card>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`G'day ${name}!`}
      className="container-fluid"
    >
      <Container fluid="md">
        <Row>
          <Col sm={4}>{userLinks()}</Col>
          <Col sm={8}>
            {userInfo()}
            <hr />
            {purchaseHistory()}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;
