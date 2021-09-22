import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { isAuthenticated } from "../Auth/PrimaryAuth";
import { createCourse  } from "../Institute/ApiInst";
import { getCategories  } from "../Components/ApiCore";


const AddCourse = () => {
  // destructure user and token from localstorage

  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    photoUrl: "",

    title: "",
    description: "",
    price: "",
    category: "",
    loading: false,
    error: "",
    createdCourse: "",
    redirectToCourse: false,
    formData: "",
  });

  const {
    photoUrl,

    title,
    description,
    categories,
    category,
    price,
    loading,
    error,
    createdCourse,
    redirectToCourse,
    formData,
  } = values;

  //load categories and  set form data

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  // higher order function (=> =>) , function in function
  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  // BUg report : data submission twice, data remained in state(fields)
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createCourse(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          photoUrl: "",
          description: "",
          title: "",
          price: "",
          loading: false,
          createdCourse: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form action="/uploadsingle" className="mb-3" onSubmit={clickSubmit}>
      <h4>Create Course</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("image")}
            type="file"
            name="image"
            accept="image/*"
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
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Select category</option>

          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <button className="btn btn-outline-primary">create course</button>
    </form>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdCourse ? "" : "none" }}
    >
      <h2>{`${createdCourse}`} is created. Click to add lectures</h2>
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
    <Layout title="Add New Product" description={`${user.name}`}>
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

export default AddCourse;
