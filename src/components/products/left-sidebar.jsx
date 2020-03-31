import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import "../common/index.scss";
import { connect } from "react-redux";

// import custom Components
import Service from "./common/service";
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import {
  addToCartUnsafe,
  addToWishlist,
  receiveSingleProduct
} from "../../actions";
import ImageZoom from "./common/product/image-zoom";
import SmallImages from "./common/product/small-image";

class LeftSideBar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      nav1: null,
      nav2: null
    };
  }

  // document.getElementById('idOfElement').classList.add('newClassName');

  componentWillMount() {
    let productId = this.props.match.params.id;
    this.props.receiveSingleProduct(productId);
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  filterClick() {
    document.getElementById("filter").style.left = "-15px";
  }
  backClick() {
    document.getElementById("filter").style.left = "-365px";
  }

  render() {
    const {
      symbol,
      item,
      addToCartUnsafe,
      addToWishlist
    } = this.props;
    var products = {
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      fade: true
    };
    var productsnav = {
      slidesToShow: 3,
      swipeToSlide: true,
      arrows: false,
      dots: false,
      focusOnSelect: true
    };

    return (
      <div>
        {/*SEO Support*/}
        <Helmet>
          <title>
            Shopmate | {item.description} | {item.name}
          </title>
          <meta
            name="description"
          />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb parent={"Product"} title={item.name} />

        {/*Section Start*/}
        {item ? (
          <section className="section-b-space">
            <div className="collection-wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-sm-3 collection-filter" id="filter">
                    <div className="collection-mobile-back pl-5">
                      <span onClick={this.backClick} className="filter-back">
                        <i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
                        back
                      </span>
                    </div>

                    {/* <BrandBlock/> */}
                    <Service />
                    {/*side-bar single product slider start*/}
                    {/*side-bar single product slider end*/}
                  </div>
                  <div className="col-lg-9 col-sm-12 col-xs-12">
                    <div className="">
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="filter-main-btn mb-2">
                            <span
                              onClick={this.filterClick}
                              className="filter-btn"
                            >
                              <i
                                className="fa fa-filter"
                                aria-hidden="true"
                              ></i>{" "}
                              filter
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 product-thumbnail">
                          <Slider
                            {...products}
                            asNavFor={this.state.nav2}
                            ref={slider => (this.slider1 = slider)}
                            className="product-slick"
                          >
                            <div key={`a${item.product_id}`}>
                              <ImageZoom
                                image={"/assets/images/product_images/".concat(
                                  item.image
                                )}
                              />
                            </div>

                            <div key={`b${item.product_id}`}>
                              <ImageZoom
                                image={"/assets/images/product_images/".concat(
                                  item.image_2
                                )}
                              />
                            </div>
                          </Slider>
                          <SmallImages
                            item={item}
                            settings={productsnav}
                            navOne={this.state.nav1}
                          />
                        </div>
                        <DetailsWithPrice
                          symbol={symbol}
                          item={item}
                          navOne={this.state.nav1}
                          addToCartClicked={addToCartUnsafe}
                          BuynowClicked={addToCartUnsafe}
                          addToWishlistClicked={addToWishlist}
                          reqFilters={this.props.filters}
                          cartList={this.props.cart}
                        />
                      </div>
                    </div>
                    <DetailsTopTabs item={item} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
        {/*Section End*/}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    item: state.data.singleProduct,
    products: state.data.products,
    symbol: state.data.symbol,
    filters: state.filters,
    cart: state.cartList
  };
};

export default connect(mapStateToProps, {
  addToCartUnsafe,
  addToWishlist,
  receiveSingleProduct: receiveSingleProduct.request
})(LeftSideBar);
