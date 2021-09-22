import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCourses } from "../course/Apicourse";
import CourseCard from "../course/card";
import footer from './footer'
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const [Error, setError] = useState(false);
  const [courseByArrival, setCourseByArrival] = useState([]);

  const loadCourseByArrival = () => {
    getCourses("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCourseByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadCourseByArrival();
  }, []);

  return (
    <Layout
      title="Home"
      description="Choose Course"
      className="container-fluid"
    >
      <Container fluid>
        <h2 className="mb-4">Latest Arrival</h2>

        <Row>
          {courseByArrival.map((course, i) => (
            <Col sm key={i}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
        <footer />
      </Container>
    </Layout>
    
  );
};

export default Home;
