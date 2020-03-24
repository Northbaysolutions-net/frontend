import React from "react";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ allowed, ...params }) => {
  console.log(allowed,...params);
  return !allowed ? <Route {...params} /> : <Redirect push to="/product" />;
};

export default PublicRoute;
