import React, { Component } from "react";

import englaneImage from "../../../images/england.png";
import cartImage from "../../../images/SVG/cart.svg";
import { Link } from "react-router-dom";
import "./style.css";

class ProductRegisterHeader extends Component {
  logout = e => {
    console.log("in logout");
    localStorage.clear();
    localStorage.setItem("Authenticated", false);
    this.props.onLogout(e);
  };
  render() {
    var price = 0.0;
    console.log(this.props.items, this.props.user);
    if (this.props.items) {
      for (var i = 0; i < this.props.items.length; i++) {
        price = price + this.props.items[i].Item.price;
      }
    }
    return (
      <>
        <nav className="registerHeader">
          {this.props.user ? (
            <h1 className="registerHeader__heading">
              Hi {this.props.user.first_name}
            </h1>
          ) : (
            <h1 className="registerHeader__heading">
              Hi <a href="/">Sign</a> in or <a href="/signup">Register</a>
            </h1>
          )}
          <div className="registerHeader__deals">
            <h1>Daily Deals</h1>
            <h1>Sell</h1>
            <h1>Help & Contact</h1>
          </div>

          <div className="registerHeader__country">
            <img
              alt=""
              src={englaneImage}
              className="registerHeader__country__image"
            ></img>
            <h1 className="registerHeader__country__text">£ GBP</h1>
          </div>

          <div className="registerHeader__bag">
            <div className="registerHeader__bag__cart">
              <Link to="/cart">
                <img
                  alt=""
                  className="registerHeader__bag__image"
                  src={cartImage}
                ></img>
                {this.props.items && this.props.items.length > 0 ? (
                  <span className="registerHeader__bag__count">
                    {this.props.items.length}
                  </span>
                ) : (
                  <span className="registerHeader__bag__count">0</span>
                )}
              </Link>
            </div>
            {this.props.items && this.props.items.length > 0 && price > 0 ? (
              <h1 className="registerHeader__bag__text">Your bag: £{price}</h1>
            ) : (
              <h1 className="registerHeader__bag__text">Your bag: £0</h1>
            )}
          </div>
          <button
              className="registerHeader__logout"
              onClick={e => this.logout()}
            >
              Logout
            </button>
        </nav>
      </>
    );
  }
}

export default ProductRegisterHeader;
