import React, { Component } from "react";

import "./style.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__question">
          <h1 className="footer__question__heading">Question</h1>

          <ul className="footer__question__list">
            <li>
              <a href="#" className="footer__question__list__link">
                Help
              </a>
            </li>
            <li>
              <a href="#" className="footer__question__list__link">
                Track Order
              </a>
            </li>
            <li>
              <a href="#" className="footer__question__list__link">
                Return
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__store">
          <h1 className="footer__store__heading">Whats in store</h1>
          <ul className="footer__question__list">
            <li>
              <a href="#" className="footer__store__list__link">
                Women
              </a>
            </li>
            <li>
              <a href="#" className="footer__store__list__link">
                Men
              </a>
            </li>
            <li>
              <a href="#" className="footer__store__list__link">
                Kids
              </a>
            </li>
            <li>
              <a href="#" className="footer__store__list__link">
                Shoes
              </a>
            </li>
            <li>
              <a href="#" className="footer__store__list__link">
                Brands
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__follow">
          <h1 className="footer__follow__heading">Follow Us</h1>
          <ul className="footer__follow__list">
            <li>
              <a href="#" className="footer__follow__list__link">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="footer__follow__list__link">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="footer__follow__list__link">
                Youtube
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__copyright">
          <h1>&copy; 2020 Northby Solutions</h1>
        </div>
      </footer>
    );
  }
}

export default Footer;
