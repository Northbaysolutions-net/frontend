import React from "react";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ allowed, ...params }) => {
  // allowed = localStorage.getItem("Authenticated");
  console.log(allowed);
  return !allowed && allowed === null && allowed === false ? (
    <Route {...params} />
  ) : (
    <Redirect push to="/products" />
  );
};

export default PublicRoute;
