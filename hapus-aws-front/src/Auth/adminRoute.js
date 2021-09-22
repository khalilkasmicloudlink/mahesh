import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../Auth/PrimaryAuth";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() && isAuthenticated().user.role === "admin" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);



export default AdminRoute