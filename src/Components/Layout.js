import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

const Layout = ({
  title = "Title",
  description = "Description",
  children,
  className,
}) => (
  <div>
    <Jumbotron style={{ background: "#ff3333", color: "white"}} fluid>
      <Container fluid>
        <h1 className="nav-header-1">{title}</h1>
        <p>{description}</p>
      </Container>
    </Jumbotron>
    <Container>
      <div className={className}>{children}</div>
    </Container>
  </div>
);

export default Layout;
