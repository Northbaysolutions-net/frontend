// eslint-disable-next-line
import React, { Component } from "react";

import shirtImage from "../../images/adas.jpg";
import { connect } from "react-redux";
import update from "react-addons-update";
import ProductRegisterHeader from "../CommonComponent/ProductRegisterHeader";
import ShopMateHeader from "../CommonComponent/ShopeMateHeader";
import ProductFooter from "../CommonComponent/ProductFooter";
import { Link, Redirect } from "react-router-dom";
import {
  getCartRequest,
  removeFromCartRequest,
  emptyCartRequest
} from "../../Actions";

import "./style.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
      cartsItem: [],
      quantity: 1
    };
  }
  componentDidMount = () => {
    this.getCart();
  };
  static getDerivedStateFromProps(props, state) {
    console.log("get Derived State From Props");
    console.log(props);
    console.log(state);
    if (props.cart.data !== state.cart) {
      state.cart = props.cart.data;
      if (props.cart.data) {
        state.cartsItem = props.cart.data.cartsItems;
        var new_arr = state.cartsItem;
        for(var i = 0; i < new_arr.length; i++){
          if(new_arr[i+1] && new_arr[i].item_id === new_arr[i+1].item_id){
            new_arr[i].item_quantity = new_arr[i].item_quantity+new_arr[i].item_quantity;
            new_arr[i].Item.price = new_arr[i].Item.price+new_arr[i].Item.price;
            new_arr.splice(i+1,1);
          }
        }
        console.log(new_arr);
        state.cartsItem = new_arr;
        /* var new_arr = [...new Set(state.cartsItem.map(item => item.item_id))];
        var update_arr = [];
        for (var i = 0; i < new_arr.length; i++) {
          update_arr.push(
            state.cartsItem[
              state.cartsItem.findIndex(x => x.item_id === new_arr[i])
            ]
          );
        }
        console.log(update_arr);
        state.cartsItem = update_arr; */
      }
      return true;
    }
    // Return null to indicate no change to state.
    return null;
  }
  getCart = () => {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(user);
    const params = user.id;
    console.log("in cart", params);
    this.props.getCartRequest(params);
  };
  increaseQuantity = (quantity, index, e) => {
    var new_arr = this.state.cartsItem;
    var obj = new_arr[index];
    obj.item_quantity = obj.item_quantity + 1;
    new_arr[index] = obj;
    this.setState({ cartsItem: new_arr });
  };
  decreaseQuantity = (quantity, index, e) => {
    if (quantity < 2) {
      return;
    } else {
      var new_arr = this.state.cartsItem;
      var obj = new_arr[index];
      obj.item_quantity = obj.item_quantity - 1;
      new_arr[index] = obj;
      this.setState({ cartsItem: new_arr });
    }
  };
  removeItem = (item, index, e) => {
    console.log(item);
    var params = {
      cart_id: item.cart_id,
      item_id: item.item_id
    };
    this.props.removeFromCartRequest(params);
    var new_arr = this.state.cartsItem;
    new_arr.splice(index, 1);
    this.setState({ cartsItem: new_arr });
  };
  emptyCart = e => {
    console.log("empty cart");
    if(this.state.cartsItem.length > 0){
      this.props.emptyCartRequest(this.state.cartsItem[0].cart_id);
      this.setState({cartsItem:[]})
    }
  }
  handleLogout = e =>{
    console.log("back from header logout");
    return <Redirect to="/" />;
  }
  render() {
    console.log(this.state.cartsItem);
    if (this.state.cart && this.state.cart.cartsItems) {
      return (
        <>
          <ProductRegisterHeader
            items={this.state.cartsItem}
            user={JSON.parse(localStorage.getItem("currentUser"))}
            onLogout={this.handleLogout}
          />
          <ShopMateHeader />
          <div className="shoppingbackground">
            <div className="shoppingpopup">
            <button className="shoppingpopup__empty__cart" onClick={e => this.emptyCart()}>
            Empty Cart</button>  
            <h1 className="shoppingpopup__heading">
                {this.state.cartsItem.length} Items In Your Cart
              </h1>
              
              <div className="shoppingpopup__table">
                <div className="shoppingpopup__table">
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.cartsItem.map((cartItem, i) => (
                        <tr key={i}>
                          <td>
                            <div className="shoppingpopup__table__item">
                              <img
                                alt=""
                                src={require(`../../images/items/${cartItem.Item.image}`)}
                                className="shoppingpopup__table__item__image"
                              ></img>
                              <div className="shoppingpopup__table__item__detail">
                                <h1 className="shoppingpopup__table__text">
                                  {cartItem.Item.name}
                                </h1>
                                <h1 className="shoppingpopup__table__code">
                                  {cartItem.Item.item_code}
                                </h1>
                                <div className="shoppingpopup__table__item__remove">
                                  <svg
                                    className="shoppingpopup__table__cross"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    onClick={e => this.removeItem(cartItem, i)}
                                  >
                                    <title>cross</title>
                                    <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
                                  </svg>
                                  <span>Remove</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h1 className="shoppingpopup__table__heading">
                              XX
                            </h1>
                            <h1 className="shoppingpopup__table__price__L">
                              L
                            </h1>
                          </td>
                          <td>
                            <div className="shoppingpopup__quantity__count">
                              <div className="shoppingpopup__quantity__count__minus">
                                <a
                                  className="shoppingpopup__quantity__count__link"
                                  onClick={e =>
                                    this.decreaseQuantity(
                                      cartItem.item_quantity,
                                      i
                                    )
                                  }
                                >
                                  -
                                </a>
                              </div>
                              <div className="shoppingpopup__quantity__count__one">
                                {cartItem.item_quantity}
                              </div>
                              <div className="shoppingpopup__quantity__count__minus">
                                <a
                                  className="shoppingpopup__quantity__count__link"
                                  onClick={e =>
                                    this.increaseQuantity(
                                      cartItem.item_quantity,
                                      i
                                    )
                                  }
                                >
                                  +
                                </a>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h1 className="shoppingpopup__table__price__money">
                              £{cartItem.Item.price}
                            </h1>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="shoppingpopup__footer">
                <Link className="shoppingpopup__footer__back" to={`/products`}>
                  Back to shop
                </Link>
                {this.state.cartsItem && this.state.cartsItem.length > 0 ? (
                  <Link
                  className="shoppingpopup__footer__checkout"
                  to={`/checkout`}
                >
                  Move to checkout
                </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>

          <ProductFooter />
        </>
      );
    } else {
      return <div></div>;
    }
  }
}
const mapStateToProps = state => {
  console.log(state.cart);
  return {
    cart: state.cart,
    item_result: state.item_result
  };
};
const mapDispachToProps = dispatch => {
  return {
    getCartRequest: params => dispatch(getCartRequest(params)),
    removeFromCartRequest: params => dispatch(removeFromCartRequest(params)),
    emptyCartRequest: params => dispatch(emptyCartRequest(params))
  };
};
export default connect(mapStateToProps, mapDispachToProps)(Cart);
