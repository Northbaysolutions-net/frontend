// eslint-disable-next-line
import React, { Component } from "react";

import crossImage from "../../images/SVG/cross.svg";
import shirtImage from "../../images/adas.jpg";

import ProductRegisterHeader from "../CommonComponent/ProductRegisterHeader";
import ShopMateHeader from "../CommonComponent/ShopeMateHeader";
import ProductFooter from "../CommonComponent/ProductFooter";

import "./style.css";

class Cart extends Component {
  render() {
    return (
      <>
        <ProductRegisterHeader />
        <ShopMateHeader />
        <div className="shoppingbackground">
          <div className="shoppingpopup">
            <img
              className="shoppingpopup__cross"
              src={crossImage}
              alt="cross"
            ></img>
            <h1 className="shoppingpopup__heading">4 Items In Your Cart</h1>
            <div className="shoppingpopup__table">
              <div class="shoppingpopup__table">
                <table>
                  <tr>
                    <th>Item</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                  <tr>
                    <td>
                      <div className="shoppingpopup__table__item">
                        <img
                          src={shirtImage}
                          className="shoppingpopup__table__item__image"
                        ></img>
                        <div className="shoppingpopup__table__item__detail">
                          <h1 className="shoppingpopup__table__text">
                            Green T-shirt 2016
                          </h1>
                          <h1 className="shoppingpopup__table__code">
                            Men BK3569
                          </h1>
                          <div className="shoppingpopup__table__item__remove">
                            <svg
                              className="shoppingpopup__table__cross"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 32 32"
                            >
                              <title>cross</title>
                              <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
                            </svg>
                            <span>Remvoe</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="shoppingpopup__table__price">
                      <h1 className="shoppingpopup__table__heading">XX</h1>
                      <h1 className="shoppingpopup__table__price__L">L</h1>
                    </td>
                    <td>
                      <div className="shoppingpopup__quantity__count">
                        <div className="shoppingpopup__quantity__count__minus">
                          <a
                            href="#"
                            className="shoppingpopup__quantity__count__link"
                          >
                            -
                          </a>
                        </div>
                        <div className="shoppingpopup__quantity__count__one">
                          2
                        </div>
                        <div className="shoppingpopup__quantity__count__minus">
                          <a
                            href="#"
                            className="shoppingpopup__quantity__count__link"
                          >
                            +
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h1 className="shoppingpopup__table__price__money">
                        £15.00
                      </h1>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="shoppingpopup__table__item">
                        <img
                          src={shirtImage}
                          className="shoppingpopup__table__item__image"
                        ></img>
                        <div className="shoppingpopup__table__item__detail">
                          <h1 className="shoppingpopup__table__text">
                            Green T-shirt 2016
                          </h1>
                          <h1 className="shoppingpopup__table__code">
                            Men BK3569
                          </h1>
                          <div className="shoppingpopup__table__item__remove">
                            <svg
                              className="shoppingpopup__table__cross"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 32 32"
                            >
                              <title>cross</title>
                              <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
                            </svg>
                            <span>Remvoe</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="shoppingpopup__table__price">
                      <h1 className="shoppingpopup__table__heading">XX</h1>
                      <h1 className="shoppingpopup__table__price__L">L</h1>
                    </td>
                    <td>
                      <div className="shoppingpopup__quantity__count">
                        <div className="shoppingpopup__quantity__count__minus">
                          <a
                            href="#"
                            className="shoppingpopup__quantity__count__link"
                          >
                            -
                          </a>
                        </div>
                        <div className="shoppingpopup__quantity__count__one">
                          2
                        </div>
                        <div className="shoppingpopup__quantity__count__minus">
                          <a
                            href="#"
                            className="shoppingpopup__quantity__count__link"
                          >
                            +
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h1 className="shoppingpopup__table__price__money">
                        £15.00
                      </h1>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="shoppingpopup__footer">
              <button className="shoppingpopup__footer__back">
                Back to shop
              </button>
              <button className="shoppingpopup__footer__checkout">
                Back to shop
              </button>
            </div>
          </div>
        </div>

        <ProductFooter />
      </>
    );
  }
}

export default Cart;
