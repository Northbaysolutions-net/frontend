import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

import {
  addToCartUnsafe,
  addToWishlist,
  addToCompare,
  getCategories,
  filterPage
} from "../../../actions";
import ProductListItem from "./product-list-item";
import { getBrands } from "../../../services";

import "./product-listing.css";

class ProductListing extends Component {
  constructor(props) {
    super(props);

    this.state = { limit: 5, hasMoreItems: true };
  }

  componentWillMount() {
    this.fetchMoreItems();
    const categories = getBrands().then(cat => {
      this.props.getCategories(cat);
    });
  }

  fetchMoreItems = () => {
    if (this.state.limit >= this.props.products.length) {
      this.setState({ hasMoreItems: false });
      return;
    }
    // a fake async api call
    setTimeout(() => {
      this.setState({
        limit: this.state.limit + 5
      });
    }, 3000);
  };

  handleClick = (e, a) => {
    this.props.filterPage({
      category: this.props.filters.brand,
      color: this.props.filters.attributes,
      size: this.props.filters.size,
      sortBy: this.props.filters.sortBy,
      search: this.props.filters.search,
      page: e.target.text - 1
    });
  };

  render() {
    const {
      products,
      addToCartUnsafe,
      symbol,
      addToWishlist,
      addToCompare
    } = this.props;

    let num = Math.ceil(this.props.count / 10);
    let items = [];
    for (let number = 1; number <= num; number++) {
      items.push(
        <Pagination.Item
          onClick={e => this.handleClick(e)}
          key={number}
          active={number === this.props.filters.page + 1}
        >
          {number}
        </Pagination.Item>
      );
    }
    return (
      <div>
        <div className="product-wrapper-grid">
          <div className="container-fluid">
            {products.length > 0 ? (
              <div className='infinite-scroll-component'>
                <div className="row">
                  {products.map((product, index) => (
                    <div 
                      className={`${
                        this.props.colSize === 3
                          ? "col-xl-3 col-md-6 col-grid-box"
                          : "col-lg-" + this.props.colSize
                      }`}
                      key={index}
                    >
                        
                      <ProductListItem
                        product={product}
                        symbol={symbol}
                        onAddToCompareClicked={() => addToCompare(product)}
                        onAddToWishlistClicked={() => addToWishlist(product)}
                        onAddToCartClicked={addToCartUnsafe}
                        key={index}
                        reqFilters={this.props.filters}
                        cartList={this.props.cart}
                      />
                   
                    </div>
                  ))}
                </div>
                <div>
                  <Pagination size="lg">{items}</Pagination>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-sm-12 text-center section-b-space mt-5 no-found">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`}
                    className="img-fluid mb-4"
                  />
                  <h3>
                    Sorry! Couldn't find the product you were looking For!!!{" "}
                  </h3>
                  <p>
                    Please check if you have misspelt something or try searching
                    with other words.
                  </p>
                  <Link
                    to={`${process.env.PUBLIC_URL}/`}
                    className="btn btn-solid"
                  >
                    continue shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  products: state.data.products,
  count: state.data.count,
  symbol: state.data.symbol,
  filters: state.filters,
  cart: state.cartList
});

export default connect(mapStateToProps, {
  addToCartUnsafe,
  addToWishlist,
  addToCompare,
  getCategories,
  filterPage
})(ProductListing);
