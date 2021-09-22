import { API } from "../config";

export const createCourse = (userId, token, course) => {
    //  console.log(name, email, password)
    return fetch(`${API}/${userId}/course/create/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: course,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
     
      });
  };


  export const uploadVideo = ( userId, token, video,courseId) => {
    //  console.log(name, email, password)
    return fetch(`${API}/${userId}/video/create/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    //  body: JSON.stringify({userId, courseId, video}),
    body : video,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };


 

  export const getCoursesByInstitute = (userId, token) => {
    return fetch(`${API}/courses/by/${userId}` , {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
      
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
    })
  }


 