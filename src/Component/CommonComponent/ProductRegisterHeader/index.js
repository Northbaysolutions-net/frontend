import React, { Component } from "react";

import englaneImage from "../../../images/england.png";
import cartImage from "../../../images/SVG/cart.svg";

import "./style.css";

class ProductRegisterHeader extends Component {
  render() {
    return (
      <>
        <nav className="registerHeader">
          <h1 className="registerHeader__heading">
            Hi <a href="#">Sign</a> in or <a href="#">Register</a>
          </h1>
          <div className="registerHeader__deals">
            <h1>Daily Deals</h1>
            <h1>Sell</h1>
            <h1>Help & Contact</h1>
          </div>

          <div className="registerHeader__country">
            <img
              src={englaneImage}
              className="registerHeader__country__image"
            ></img>
            <h1 className="registerHeader__country__text">£ GBP</h1>
          </div>

          <div className="registerHeader__bag">
            <div className="registerHeader__bag__cart">
              <img className="registerHeader__bag__image" src={cartImage}></img>
              <span className="registerHeader__bag__count">6</span>
            </div>
            <h1 className="registerHeader__bag__text">Your bag: £3.99</h1>
          </div>
        </nav>
      </>
    );
  }
}

export default ProductRegisterHeader;
