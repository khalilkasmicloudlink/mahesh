import React, { useState } from "react";
import Layout from "../Components/Layout";
import { isAuthenticated } from "../Auth/PrimaryAuth";
import { Link } from "react-router-dom";
import { createCategory } from "./ApiAdmin";
import { getCategories  } from "../Components/ApiCore";


const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  

  // destructure user and token from localstorage

  const { user, token } = isAuthenticated();

  

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} created </h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category Name should be unique</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="alert-danger">
        {" "}
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout title="Add New Category" description={`${user.name}`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {newCategoryForm()}
          {showError()}
          {showSuccess()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
