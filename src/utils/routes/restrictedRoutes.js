import React from "react";
import { Redirect, Route } from "react-router-dom";

const RestrictedRoute = ({allowed, ...params }) => {
  return allowed ? (
    <Route {...params} />
  ) : (
    <Redirect push to="/login" />
  );
};

export default RestrictedRoute;
