import { API } from "../config";
import queryString from "querystring";

export const getCourses = (sortBy) => {
    return fetch(`${API}/courses?sortBy=${sortBy}&order=desc&limit=6`, {
      method: "GET",
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));

      
  };


  export const read = (courseId) => {
    return fetch(`${API}/course/${courseId}`, {
      method: "GET",
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };


  export const coursesByInst  = (userId, token) => {
    return fetch(`${API}/courses/by/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

 