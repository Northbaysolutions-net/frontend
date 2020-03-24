import React, { Component } from "react";
import ProductRegisterHeader from "../CommonComponent/ProductRegisterHeader";
import ShopMateHeader from "../CommonComponent/ShopeMateHeader";
import { connect } from "react-redux";

import { getItemsRequest, resetItems } from "../../Actions";

import "./style.css";
import ProductFooter from "../CommonComponent/ProductFooter";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      items: []
    };
  }
  componentDidMount = () => {
    this.props.resetItems();
    this.getAllItems();
  };
  getAllItems = () => {
    const pageNo = this.state;
    const itemParams = {
      params: `?pagination=false&page=${pageNo}`
    };
    this.props.getItemsRequest({ itemParams });
  };
  render() {
    console.log(this.props.items.data);
    var all_items = <section></section>;
    if (this.props.items.data) {
      all_items = this.props.items.data.map(item => {
        return (
          <div className="home__card__parent">
            <div className="home__card__hover">
              <img
                alt=""
                src={require(`../../images/items/${item.image}`)}
                className="home__card__image"
              />
              <h1 className="home__card__text">{item.name}</h1>
              <button className="home__card__button">Buy Now</button>
            </div>
            <div className="home__card__middle">
              <img
                alt=""
                className="home__card__middle__image"
                src={require(`../../images/items/${item.image}`)}
              />
              <button className="home__card__middle__button">Quick View</button>
            </div>
          </div>
        );
      });
    }
    return (
      <>
        <ProductRegisterHeader />
        <ShopMateHeader />
        <main>
          <div className="container">
            <section className="mens-wear">
              <h1 className="mens-wear__heading">Mens wear</h1>
              <ul className="mens-wear__list">
                <li className="mens-wear__list__item">Accessories</li>
                <li className="mens-wear__list__item">Hoodies & Sweatshirts</li>
                <li className="mens-wear__list__item">Leather Jackets</li>
                <li className="mens-wear__list__item">ASOS Basic Tops</li>
                <li className="mens-wear__list__item">Jackets & Coats</li>
                <li className="mens-wear__list__item">Long Sleeve T-Shirts</li>
                <li className="mens-wear__list__item">Bags</li>
                <li className="mens-wear__list__item">Jeans</li>
                <li className="mens-wear__list__item">Loungewear</li>
                <li className="mens-wear__list__item">Caps & Hats</li>
                <li className="mens-wear__list__item">Jewellery</li>
                <li className="mens-wear__list__item">Oversized & Longline</li>
                <li className="mens-wear__list__item">Gifts</li>
                <li className="mens-wear__list__item">Joggers</li>
                <li className="mens-wear__list__item">Polo Shirts</li>
                <li className="mens-wear__list__item">Grooming</li>
                <li className="mens-wear__list__item">Jumper & Cardigans</li>
                <li className="mens-wear__list__item">Shirts</li>
              </ul>
            </section>
          </div>
          <section className="home__card">{all_items}</section>
        </main>
        <ProductFooter />
      </>
    );
  }
}
const mapStateToProps = state => {
  console.log(state.items);
  return {
    items: state.items
  };
};
const mapDispachToProps = dispatch => {
  return {
    resetItems: () => dispatch(resetItems()),
    getItemsRequest: itemParams => dispatch(getItemsRequest(itemParams))
  };
};
export default connect(mapStateToProps, mapDispachToProps)(ProductList);
