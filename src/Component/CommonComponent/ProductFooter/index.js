import React, { Component } from "react";

import instagramImage from "../../../images/SVG/instagram.svg";
import pintrestImage from "../../../images/SVG/pinterest.svg";
import twitterImage from "../../../images/SVG/twitter.svg";
import facebookImage from "../../../images/SVG/facebook.svg";

import "./style.css";

class ProductFooter extends Component {
  render() {
    return (
      <>
        <footer className="productFooter">
          <ul className="productFooter__list">
            <li className="productFooter__list--item">
              <a className="productFooter__list__link" href="/#">
                Women
              </a>
            </li>
            <li className="productFooter__list--item">
              <a className="productFooter__list__link" href="/#">
                Men
              </a>
            </li>
            <li className="productFooter__list--item">
              <a className="productFooter__list__link" href="/#">
                Kids
              </a>
            </li>
            <li className="productFooter__list--item">
              <a className="productFooter__list__link" href="/#">
                Shoes
              </a>
            </li>
            <li className="footer__list--item">
              <a className="productFooter__list__link" href="/#">
                Brands
              </a>
            </li>
          </ul>

          <div className="productFooter__social">
            <div className="productFooter__background">
              <img alt="" className="productFooter__icon" src={instagramImage}></img>
            </div>

            <div className="productFooter__background">
              <img alt="" className="productFooter__icon" src={pintrestImage}></img>
            </div>
            <div className="productFooter__background">
              <img alt="" src={twitterImage} className="productFooter__icon"></img>
            </div>
            <div className="productFooter__background">
              <img alt="" className="productFooter__icon" src={facebookImage}></img>
            </div>
          </div>

          <div className="productFooter__copyright">
            <h1>
              &copy; 2020 shopmate Ltd <b>Contact</b> <b>Privacy Policy</b>
            </h1>
          </div>
        </footer>
      </>
    );
  }
}

export default ProductFooter;
