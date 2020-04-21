import React, { Component } from "react";
import { connect } from "react-redux";

import starImage from "../../images/SVG/star-full.svg";
import heartImage from "../../images/SVG/heart.svg";

import ProductRegisterHeader from "../CommonComponent/ProductRegisterHeader";
import ShopeMateHeader from "../CommonComponent/ShopeMateHeader";
import ProductFooter from "../CommonComponent/ProductFooter";
import { getItemDetailRequest, addToCartRequest, getCartRequest } from "../../Actions";
import { MDBContainer, MDBAlert } from "mdbreact";

import "./style.css";
import CarouselPage from "../CommonComponent/CarouselPage";
import { Redirect } from "react-router-dom";

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      quantity: 1,
      visible: false,
      cartsItem:[]
    };
  }
  componentDidMount = () => {
    this.getItem();
  };
  static getDerivedStateFromProps(props, state) {
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
  getItem = () => {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    const params = this.props.match.params.id;
    console.log("in product details", params);
    this.props.getItemDetailRequest(params);
    this.props.getCartRequest(user.id);
  };
  addToCart = (item, e) => {
    console.log(item, this.state.quantity);
    var data = {
      item_quantity: this.state.quantity,
      item_id: item.id
    };
    this.props.addToCartRequest(data);
  };
  increaseQuantity = (quantity, e) => {
    this.setState({ quantity: quantity + 1 });
  };
  decreaseQuantity = (quantity, e) => {
    console.log(quantity);
    if (quantity < 2) {
      return;
    } else {
      this.setState({ quantity: quantity - 1 });
    }
  };
  handleLogout = e =>{
    console.log("back from header logout");
    return <Redirect to="/" />;
  }
  render() {
    var alert = <div></div>;
    console.log(this.props.item_result.data);
    if (
      this.props.item_result.success === true &&
      this.props.item_result.data
    ) {
      // this.onShowAlert();
      alert = (
        <MDBContainer>
          <MDBAlert color="success" className="success_alert" dismiss>
            {this.props.item_result.message}
          </MDBAlert>
        </MDBContainer>
      );
    } else if (this.props.item_result.success === false) {
      // this.onShowAlert();
      alert = (
        <MDBContainer>
          <MDBAlert color="danger" className="success_alert" dismiss>
            {this.props.item_result.message}
          </MDBAlert>
        </MDBContainer>
      );
    }
    if (this.props.item.data) {
      return (
        <>
        {this.props.cart.data && this.state.cartsItem ? (
          <ProductRegisterHeader
            items={this.state.cartsItem}
            user={JSON.parse(localStorage.getItem("currentUser"))}
            onLogout={this.handleLogout}
          />
        ) : (
          <ProductRegisterHeader/>
        )}
          <ShopeMateHeader />
          {alert}
          <div className="containerdiv">
            <div className="detail">
              <div className="detail__image">
                <CarouselPage data={this.props.item.data.image} />
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
                      <a
                        className="detail__quantity__count__link"
                        onClick={e =>
                          this.decreaseQuantity(this.state.quantity)
                        }
                      >
                        -
                      </a>
                    </div>
                    <div className="detail__quantity__count__one">
                      {this.state.quantity}
                    </div>
                    <div className="detail__quantity__count__minus">
                      <a
                        className="detail__quantity__count__link"
                        onClick={e =>
                          this.increaseQuantity(this.state.quantity)
                        }
                      >
                        +
                      </a>
                    </div>
                  </div>
                </div>

                <div className="detail__cart">
                  <button
                    className="detail__cart__button"
                    onClick={e => this.addToCart(this.props.item.data, e)}
                  >
                    Add to cart
                  </button>
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
    } else {
      return <></>;
    }
  }
}
const mapStateToProps = state => {
  console.log(state.item);
  console.log(state.item_result);
  return {
    item: state.item,
    item_result: state.item_result,
    cart: state.cart
  };
};
const mapDispachToProps = dispatch => {
  return {
    getItemDetailRequest: params => dispatch(getItemDetailRequest(params)),
    addToCartRequest: data => dispatch(addToCartRequest(data)),
    getCartRequest: params => dispatch(getCartRequest(params)),
  };
};
export default connect(mapStateToProps, mapDispachToProps)(ProductDetailPage);
