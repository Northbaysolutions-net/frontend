import React, { Component } from "react";

import searchImage from "../../../images/SVG/search.svg";
import crossImage from "../../../images/SVG/cross.svg";

import "./style.css";

class Search extends Component {
  render() {
    return (
      <>
        <form action="#" className="search">
          <button className="search__button">
            <img src={searchImage} className="search__icon"></img>
          </button>
          <input
            type="text"
            className="search__input"
            placeholder="search any thing"
          ></input>
          <button className="search__button">
            <img src={crossImage} className="search__icon"></img>
          </button>
        </form>
      </>
    );
  }
}

export default Search;
