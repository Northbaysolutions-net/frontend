import React, { Component } from "react";
import ProductRegisterHeader from "../CommonComponent/ProductRegisterHeader";
import ShopMateHeader from "../CommonComponent/ShopeMateHeader";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import searchImage from "../../images/SVG/search.svg";
import crossImage from "../../images/SVG/cross.svg";
import { getItemsRequest, resetItems, getCartRequest } from "../../Actions";

import "./style.css";
import ProductFooter from "../CommonComponent/ProductFooter";

// import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
/* import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import PageItem from 'react-bootstrap/PageItem';
import Pagination from 'react-bootstrap/Pagination' */

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      items: [],
      search: "",
      cartsItem: []
    };
  }
  componentDidMount = () => {
    // this.props.resetItems();
    this.getAllItems(this.state.pageNo);
  };
  static getDerivedStateFromProps(props, state) {
    console.log(props.cart.data);
    if (props.cart.data && props.cart.data.cartsItems !== state.cartsItem) {
      state.cartsItem = props.cart.data.cartsItem;
      if (props.cart.data) {
        state.cartsItem = props.cart.data.cartsItems;
        var new_arr = state.cartsItem;
        for(var i = 0; i < new_arr.length; i++){
          if(new_arr[i+1] && new_arr[i].item_id === new_arr[i+1].item_id){
            new_arr[i].item_quantity = new_arr[i].item_quantity+new_arr[i].item_quantity;
            new_arr.splice(i+1,1);
          }
        }
        console.log(new_arr);
        state.cartsItem = new_arr;
      }
      return true;
    }
    // Return null to indicate no change to state.
    return null;
  }
  getAllItems = pageNo => {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    console.log("page ###########", pageNo);
    const itemParams = {
      params: `?pagination=true&page=${pageNo}`
    };
    console.log(itemParams);
    this.props.getCartRequest(user.id);
    this.props.getItemsRequest(itemParams);
  };
  handlePageChange = pageNo => {
    console.log(`active page is ${pageNo}`);
    this.setState({ pageNo: pageNo });
    this.getAllItems(pageNo);
  }
  onItemClick(item, event) {
    console.log(item);
    // debugger;
    this.props.history.push(`/pdp/${item.id}`);
    // return <Redirect to= {`/pdp/${item.id}`}/>;
  }
  onSearch = e => {
    console.log("on search", e.target.value);
    this.setState({ search: e.target.value }, () => {
      const { pageNo, search } = this.state;
      const itemParams = {
        params: `?pagination=true&page=${pageNo}&search=${search}`
      };
      this.props.getItemsRequest(itemParams);
    });
  };
  handleLogout = e =>{
    console.log("back from header logout");
    this.props.history.push('/');
    // return <Redirect to="/" />;
  }
  render() {
    console.log(this.props.items);
    console.log(this.props.cart);
    var all_items = <section></section>;
    if (this.props.items.data && this.props.cart.data) {
      all_items = this.props.items.data.map((item, index) => {
        return (
          <div
            className="home__card__parent"
            onClick={e => this.onItemClick(item)}
          >
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
        {this.props.cart.data && this.state.cartsItem ? (
          <ProductRegisterHeader
            items={this.state.cartsItem}
            user={JSON.parse(localStorage.getItem("currentUser"))}
            onLogout={this.handleLogout}
          />
        ) : (
          <ProductRegisterHeader />
        )}
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
          <div className="search">
            <form className="search">
              <button>
                <img alt="" src={searchImage} className="search__icon"></img>
              </button>
              <input
                type="text"
                className="search__input"
                placeholder="search any thing"
                name="search"
                onChange={this.onSearch}
              ></input>
            </form>
          </div>
          <div className="products_pagination">
            {this.props.items.pagination ? (
              <Pagination
                activePage={this.state.pageNo}
                itemsCountPerPage={this.props.items.pagination.per_page}
                totalItemsCount={this.props.items.pagination.total}
                pageRangeDisplayed={4}
                itemClass="page-item"
                linkClass="page-link"
                onChange={this.handlePageChange.bind(this)}
              />
            ) : (
              <Pagination
                activePage={1}
                itemsCountPerPage={1}
                totalItemsCount={1}
                pageRangeDisplayed={1}
                itemClass="page-item"
                linkClass="page-link"
                onChange={this.handlePageChange.bind(this)}
              />
            )}
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
    items: state.items,
    cart: state.cart
  };
};
const mapDispachToProps = dispatch => {
  return {
    resetItems: () => dispatch(resetItems()),
    getItemsRequest: itemParams => dispatch(getItemsRequest(itemParams)),
    getCartRequest: params => dispatch(getCartRequest(params))
  };
};
export default connect(mapStateToProps, mapDispachToProps)(ProductList);
