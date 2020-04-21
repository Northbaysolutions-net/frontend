import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Pdp from "./Component/ProductDetailPage";
import Login from "./Component/Auth/Login";
import SignUp from "./Component/Auth/SignUp";
import ProductList from "./Component/ProductsList";
import Checkout from "./Component/Checkout";
import Cart from "./Component/Cart";
import RestrictedRoute from "./utils/routes/restrictedRoutes";
import PublicRoute from "./utils/routes/publicRoutes";
import "bootstrap/dist/css/bootstrap.min.css";

function checkAuthenticated() {
  console.log("************************",)
  return localStorage.getItem("Authenticated");
}

function App() {
  const authenticate = checkAuthenticated();
  console.log(authenticate);
  return (
    <div className="App">
      <Router>
        <Switch>
          <RestrictedRoute
            allowed={authenticate}
            path="/pdp/:id"
            component={Pdp}
          />
          <RestrictedRoute
            allowed={authenticate}
            path="/products"
            exact
            component={ProductList}
          />
          <RestrictedRoute
            allowed={authenticate}
            path="/cart"
            exact
            component={Cart}
          />
          <RestrictedRoute
            allowed={authenticate}
            path="/checkout"
            exact
            component={Checkout}
          />
          <Route
            allowed={authenticate}
            path="/signup"
            exact
            component={SignUp}
          />
          <Route
            allowed={authenticate}
            path="/login"
            exact
            component={Login}
          />
          <Route
            allowed={authenticate}
            path="/"
            exact
            component={Login}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
