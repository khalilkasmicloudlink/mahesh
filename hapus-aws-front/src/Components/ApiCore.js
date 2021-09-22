import { API } from "../config";
import queryString from "querystring";

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const readVideoFile = (videoId, courseId) => {
  return fetch(`${API}/course/${courseId}/video/${videoId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getVideos = (sortBy) => {
  return fetch(`${API}/videos?sortBy=${sortBy}&order=desc`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createVideo = (video) => {
  //  console.log(name, email, password)
  return fetch(`${API}/video/create/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: video,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
