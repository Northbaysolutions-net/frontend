import React, { Component } from "react";
import { connect } from "react-redux";

import starImage from "../../images/SVG/star-full.svg";
import heartImage from "../../images/SVG/heart.svg";

import ProductRegisterHeader from "../CommonComponent/ProductRegisterHeader";
import ShopeMateHeader from "../CommonComponent/ShopeMateHeader";
import ProductFooter from "../CommonComponent/ProductFooter";
import { getItemDetailRequest } from "../../Actions";

import "./style.css";
import CarouselPage from "../CommonComponent/CarouselPage";

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {}
    };
  }
  componentDidMount = () => {
    this.getItem();
  };
  getItem = () => {
    const params = this.props.match.params.id;
    console.log("in product details", params);
    this.props.getItemDetailRequest({ params });
  };
  render() {
    console.log(this.props.item.data);
    if (this.props.item.data) {
      return (
        <>
          <ProductRegisterHeader />
          <ShopeMateHeader />
          <div className="containerdiv">
            <div className="detail">
              <div className="detail__image">
                <CarouselPage
                data={this.props.item.data.image}
                 />
              </div>
              <div className="detail__description">
                <div className="detail__heading">
                  <h1 className="detail__heading__text">
                    {this.props.item.data.description}
                  </h1>
                </div>
                <div className="detail__star">
                  <img alt="" src={starImage} className="star__icon"></img>
                  <img alt="" src={starImage} className="star__icon"></img>
                  <img alt="" src={starImage} className="star__icon"></img>
                  <img alt="" src={starImage} className="star__icon"></img>
                  <img alt="" src={starImage} className="star__icon"></img>
                </div>

                <div className="detail__category">
                  <h1 className="detail__category__heading">
                    {this.props.item.data.name}
                  </h1>
                  <h1 className="detail__category__amount">
                    £{this.props.item.data.price}
                  </h1>
                </div>

                <div className="detail__size-guid">
                  <h1 className="detail__size-guid__first">Size</h1>
                  <h1 className="detail__size-guid__second">Size guide</h1>
                </div>

                <ul className="detail__button-size">
                  <li className="detail__button-size--item">
                    <a href="#" className="detail__button-size__link">
                      XS
                    </a>
                  </li>
                  <li className="detail__button-size--item">
                    <a href="#" className="detail__button-size__link">
                      S
                    </a>
                  </li>
                  <li className="detail__button-size--item">
                    <a href="#" className="detail__button-size__link">
                      M
                    </a>
                  </li>
                  <li className="detail__button-size--item">
                    <a href="#" className="detail__button-size__link">
                      L
                    </a>
                  </li>
                  <li className="detail__button-size--item">
                    <a href="#" className="detail__button-size__link">
                      ML
                    </a>
                  </li>
                  <li className="detail__button-size--item">
                    <a href="#" className="detail__button-size__link">
                      XXL
                    </a>
                  </li>
                </ul>

                <div className="detail__quantity">
                  <h1 className="detail__quantity__text">Quantity</h1>
                  <div className="detail__quantity__count">
                    <div className="detail__quantity__count__minus">
                      <a href="/#" className="detail__quantity__count__link">
                        -
                      </a>
                    </div>
                    <div className="detail__quantity__count__one">2</div>
                    <div className="detail__quantity__count__minus">
                      <a href="/#" className="detail__quantity__count__link">
                        +
                      </a>
                    </div>
                  </div>
                </div>

                <div className="detail__cart">
                  <button className="detail__cart__button">Add to cart</button>
                  <div className="detail__cart__heart">
                    <img
                      alt=""
                      src={heartImage}
                      className="detail__cart__heart__icon"
                    ></img>
                    <h1 className="detail__cart__heart__text">
                      Add to Wish List
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductFooter />
        </>
      );
    }else{
      return <></>
    }
  }
}
const mapStateToProps = state => {
  console.log(state.item);
  return {
    item: state.item
  };
};
const mapDispachToProps = dispatch => {
  return {
    getItemDetailRequest: params => dispatch(getItemDetailRequest(params))
  };
};
export default connect(mapStateToProps, mapDispachToProps)(ProductDetailPage);
