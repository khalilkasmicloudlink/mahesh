import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { read } from "./Apicourse";
import Card from "./card";

const Course = (props) => {

    const [course, setCourse] = useState({})
    const [relatedCourse, setRelatedCourse] = useState([])
    const [error, setError] = useState(false)

    const loadSingleCourse = courseId => {

        read(courseId).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setCourse(data)

                //fetch related products
                // listRelated(data._id).then(data => {
                //   if(data.error){
                //     setError(data.error)
                //   } else {
                //       setRelatedCourse(data)
                //   }
                // })
            }
        })




    }

    // Grab courseId from routes 
   useEffect(() => {
        const courseId = props.match.params.courseId
        loadSingleCourse(courseId)
   }, [props] )




  return (
    <Layout
      title={ course &&  course.title}
      description={course && course.description && course.description.substring(0, 100 )}
      className="container-fluid"
    >
      
  <div className="row">

    <div className="col-8">
    {course && course.description && (<Card course={course} showViewCourseButton={false} />)}
    </div>

    {/* <div className="col-4">
      <h4>Related Courses</h4>
      { course.videoUrl.map((v, i) => (
        <div key={i} className="mb-3">
          <Card  video={v} />
        </div>
      )  ) }
    </div>  */}
  
  </div>
    </Layout>
  );
};

export default Course;
