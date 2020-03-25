import React, { Component } from "react";

import lockImage from "../../../images/PNG/cart.png";
import userImage from "../../../images/PNG/user.png";

import "./style.css";

class Header extends Component {
  render() {
    return (
      <nav className="shopmate">
        <h1 className="shopmate__heading">Shopemate</h1>
        <div className="shopmate__country">
          <h1 className="shopmate__country__title">French</h1>
          <h1 className="shopmate__country__title">Italian</h1>
          <h1 className="shopmate__country__title">Irish</h1>
          <h1 className="shopmate__country__title">Animal</h1>
          <h1 className="shopmate__country__title">Flower</h1>
          <h1 className="shopmate__country__title">All Products</h1>
        </div>

        <div className="shopmate__items">
          <div lang="shopmate__cart">
            <div className="shopmate__cart__div">
              <div className="shopmate__cart__image">
                <img src={lockImage}></img>
              </div>
              <div className="shopmate__cart__image">
                <img src={userImage}></img>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
