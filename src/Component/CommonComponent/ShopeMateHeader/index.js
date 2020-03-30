import React, { Component } from "react";
import cartImage from "../../../images/SVG/cart.svg";
import { Link } from "react-router-dom";
import "./style.css";
import Search from "../SearchFiels";
class ShopeMateHeader extends Component {
  render() {
    return (
      <>
        <nav className="shopmateHeader">
          <Link className="shopmateHeader__heading" to={`/products`}> 
          Shopemate</Link>
          <div className="shopmateHeader__items">
            <ul className="shopmate__list">
              <li className="shopmate__list__item">Women</li>
              <li className="shopmate__list__item">Men</li>
              <li className="shopmate__list__item">Kids</li>
              <li className="shopmate__list__item">Shoes</li>
              <li className="shopmate__list__item">Brands</li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}
export default ShopeMateHeader;
