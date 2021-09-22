import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { isAuthenticated } from "../Auth/PrimaryAuth";
import {
  createCourse,
  getCoursesByInstitute,
  uploadVideo,
} from "../Institute/ApiInst";
import { getCategories } from "../Components/ApiCore";

const AddVideo = () => {
  // const { user, token } = isAuthenticated();
  // const { course, setCourse} = useState([])
  const [values, setValues] = useState({
    videoUrl: "",

    title: "",
    description: "",
    course: "",
    loading: false,
    error: "",
    createdVideo: "",
    redirectToCourse: false,
    formData: "",
  });

  const {
    videoUrl,

    title,
    description,
    courses,
    course,
    loading,
    error,
    createdVideo,
    redirectToVideo,
    formData,
  } = values;

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  //load categories and  set form data

  const init = (userId, token) => {
    getCoursesByInstitute(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, courses: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init(userId, token);
  }, []);

  // higher order function (=> =>) , function in function
  const handleChange = (name) => (event) => {
    const value = name === "video" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  // BUg report : data submission twice, data remained in state(fields)
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    uploadVideo(userId, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          videoUrl: "",
          description: "",
          title: "",
          course: "",
          loading: false,
          createdVideo: data.name,
        });
      }
    });
  };
  // console.log(uploadVideo)

  const newPostForm = () => (
    <form action="/uploadmultiple" className="mb-3" onSubmit={clickSubmit}>
      <h4>Create Course</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("video")}
            type="file"
            name="video"
            accept="video/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("title")}
          type="text"
          className="form-control"
          value={title}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          type="text"
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Course</label>
        <select onChange={handleChange("course")} className="form-control">
          <option>Select Course</option>
          {courses &&
            courses.map((c, i) => (
              <option key={i} value={c._id}>
                {c.title}
              </option>
            ))}
        </select>
      </div>

      <button className="btn btn-outline-primary">create course</button>
    </form>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdVideo ? "" : "none" }}
    >
      <h2>{`${createdVideo}`} is created. Click to add lectures</h2>
    </div>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>UpLoading...</h2>
      </div>
    );

  return (
    <Layout title="Add New Lecture" description={"description"}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {showLoading()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};
export default AddVideo;
