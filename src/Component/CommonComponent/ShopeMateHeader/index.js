import React, { Component } from "react";
import cartImage from "../../../images/SVG/cart.svg";
import "./style.css";
import Search from "../SearchFiels";
class ShopeMateHeader extends Component {
  render() {
    return (
      <>
        <nav className="shopmateHeader">
          <h1 className="shopmateHeader__heading">Shopemate</h1>
          <div className="shopmateHeader__items">
            <ul className="shopmate__list">
              <li className="shopmate__list__item">Women</li>
              <li className="shopmate__list__item">Men</li>
              <li className="shopmate__list__item">Kids</li>
              <li className="shopmate__list__item">Shoes</li>
              <li className="shopmate__list__item">Brands</li>
            </ul>
            <Search />
            <div lang="shopmateHeader__cart">
              <div className="shopmateHeader__cart__div">
                <img
                  className="shopmateHeader__cart__image"
                  src={cartImage}
                ></img>
                <span className="shopmateHeader__cart__count">6</span>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
export default ShopeMateHeader;
