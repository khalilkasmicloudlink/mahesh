import React ,{ useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { isAuthenticated } from "../Auth/PrimaryAuth";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { getCoursesByInstitute } from "./ApiInst"


const InstDashboard = () => {

  const [courseInfo, setCourseInfo] = useState([]);

  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  const token = isAuthenticated().token;

  const init = (userId, token, error) => {
    getCoursesByInstitute(userId, token).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            setCourseInfo(data);
        }
    });
};

useEffect(() => {
    init(_id, token);
}, []);

  



  const instLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Institute Links</h4>
        <ul className="list-group">
     
          <li className="list-group-item">
            <Link className="nav-link" to="/create/course">
              Create Course
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link"  to="/video/create">
              Add lecture
            </Link>
          </li>
          
          
        </ul>
      </div>
    );
  };

  const instInfo = () => {
    return (
     
      <div className="card mb-5">
        <h3 className="card-header">Institute Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 'inst' ? "Institute" : "Registered User"}
          </li>
        </ul>
      </div>

    )
  };

  const coursesInfo = () => {
    return (
     
      <div className="card mb-5">
        <h3 className="card-header">Manage Course</h3>
        <ul className="list-group">
          <li className="list-group-item">{courseInfo.title}</li>


          { courseInfo.map((c, i) => (
              
            
          <li key={i} value={c._id} className="list-group-item">
          <Link className="nav-link"  to={`/course/${c._id}`}>
          {c.title}
            </Link> 
          </li>
         
         ))}
        </ul>
      </div>

    )
  };


  



  return (
    <Layout
      title="Dashboard"
      description={`G'day ${name}!`}
      className="container-fluid"
    >
      <Container fluid>
        <Row>
          <Col sm={4}>{instLinks()}</Col>
          <Col sm={8}>
            {instInfo()}
            {coursesInfo()}
            </Col>
          
        </Row>
      </Container>
    </Layout>
  );
};

export default InstDashboard;
