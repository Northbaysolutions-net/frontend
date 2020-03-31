import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    isLoggedIn: state.tableDataReducer.isLoggedIn
  };
};

// Private Route Component which renders private component if user is logged in otherwise redirects to login page again. 
export const PrivateRoute = ({ children, ...props }) => {
  return (
    <Route
      {...props}
      render={({ location }) =>
        props.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
export default connect(mapStateToProps)(PrivateRoute);