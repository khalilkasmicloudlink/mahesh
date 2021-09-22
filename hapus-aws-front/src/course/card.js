import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "../Components/ShowImage";
import moment from "moment";
import {
  Button,
  Card,
  Col,
  CardColumns,
  Container,
  Row,
} from "react-bootstrap";

// import '../App.css';

const CourseCard = ({
  course,
  showViewCourseButton = true,

  setRun = (f) => f,
  run = undefined,
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);

  const showViewButton = (showViewCourseButton) => {
    return (
      showViewCourseButton && (
        <Link to={`/course/${course._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
            View Course
          </button>
        </Link>
      )
    );
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const handleChange = (courseId) => (event) => {
    setRun(!run); // run useEffect in parent Cart

    if (event.target.value >= 1) {
    }
  };

  return (
    <React.Fragment>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={course.photoUrl}
          fluid
          style={{ height: "12rem", width: "18rem" }}
        />
        {/* //.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
} */}
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Card.Text>
            {course.description.substring(0, 100)}
            <p className="card-p black-10">
              {" "}
              <p> &#x20B9; {course.price}</p>
            </p>
            <p className="black-9">
              Category: {course.category && course.category.name}
            </p>
            <Card.Footer>
              <small className="text-muted">
                Added {moment(course.createdAt).fromNow()}
              </small>
            </Card.Footer>
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
          {showViewButton(showViewCourseButton)}
          <br />
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default CourseCard;
