import React from "react";
import { Redirect, Route } from "react-router-dom";

const RestrictedRoute = ({ storeAuthenticate, allowed, ...params }) => {
  return JSON.parse(allowed) === true ? (
    <Route {...params} />
  ) : (
    <Redirect push to="/login" />
  );
};

export default RestrictedRoute;
