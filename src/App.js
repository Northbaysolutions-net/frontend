import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Pdp from "./Component/ProductDetailPage";
import Login from "./Component/Auth/Login";
import SignUp from "./Component/Auth/SignUp";
import ProductList from "./Component/ProductsList";
import Cart from "./Component/Cart";
import RestrictedRoute from "./utils/routes/restrictedRoutes";
import PublicRoute from "./utils/routes/publicRoutes";

function checkAuthenticated() {
  return localStorage.getItem("Authenticated");
}

function App() {
  const authenticate = checkAuthenticated();
  return (
    <div className="App">
      <Router>
        <Switch>
          <RestrictedRoute allowed={authenticate} path="/pdp/:id" component={Pdp} />
          <Route path="/products" component={ProductList} />
          <Route path="/signup" component={SignUp} />
          <Route path="/cart" component={Cart} />
          <Route path="/" component={Login} />
          <PublicRoute allowed={authenticate} path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
