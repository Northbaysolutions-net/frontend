import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { getCartRequest } from "../../Actions";
import { connect } from "react-redux";

import ProductRegisterHeader from "../CommonComponent/ProductRegisterHeader";
import ShopeMateHeader from "../CommonComponent/ShopeMateHeader";
import ProductFooter from "../CommonComponent/ProductFooter";

import "./style.css";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      gender: "",
      address: "",
      email: "",
      password: "",
      zip_code: "54000",
      state: "Punjab",
      cartsItem: []
    };
  }
  componentDidMount = () => {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    this.setState({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      address: user.address
    });
    this.props.getCartRequest(user.id);
  };
  static getDerivedStateFromProps(props, state) {
    console.log(props.cart.data);
    if (props.cart.data && props.cart.data.cartsItems !== state.cartsItem) {
      state.cartsItem = props.cart.data.cartsItems;
      var new_arr = state.cartsItem;
      for (var i = 0; i < new_arr.length; i++) {
        if (new_arr[i + 1] && new_arr[i].item_id === new_arr[i + 1].item_id) {
          new_arr[i].item_quantity =
            new_arr[i].item_quantity + new_arr[i].item_quantity;
          new_arr.splice(i + 1, 1);
        }
      }
      console.log(new_arr);
      state.cartsItem = new_arr;

      return true;
    }
    // Return null to indicate no change to state.
    return null;
  }
  getCart = () => {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    this.props.getCartRequest(user.id);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const checkoutData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      address: this.state.address,
      email: this.state.email,
      password: this.state.password
    };
    this.props.signUpRequest(checkoutData, this.props.history);
  };
  render() {
    const {
      first_name,
      last_name,
      address,
      email,
      zip_code,
      state
    } = this.state;
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
        <ShopeMateHeader />
        <div className="container">
          <div className="signup">
            <div className="signup__heading">
              <h1>Checkout</h1>
            </div>

            <form className="signup__form">
              <h3>First Name</h3>
              <input
                type="text"
                name="first_name"
                placeholder="First Name*"
                value={first_name}
                className="signup__form__fullname"
                required
                onChange={this.handleChange}
              ></input>
              <h3>Last Name</h3>
              <input
                type="text"
                name="last_name"
                placeholder="Last Name*"
                value={last_name}
                className="signup__form__fullname"
                required
                onChange={this.handleChange}
              ></input>
              <h3>Email</h3>
              <input
                type="text"
                name="email"
                placeholder="Email*"
                value={email}
                className="signup__form__email"
                required
                onChange={this.handleChange}
              ></input>
              <h3>Zip Code</h3>
              <input
                type="text"
                name="zip_code"
                placeholder="Zip Code*"
                value={zip_code}
                className="signup__form__password"
                required
                onChange={this.handleChange}
              ></input>
              <h3>State</h3>
              <input
                type="text"
                name="state"
                placeholder="State*"
                value={state}
                className="signup__form__password"
                required
                onChange={this.handleChange}
              ></input>
              <h3>Address</h3>
              <input
                type="text"
                name="address"
                placeholder="Address*"
                value={address}
                className="signup__form__address"
                required
                onChange={this.handleChange}
              ></input>
              {this.props.register_user &&
              this.props.register_user.success === false ? (
                this.props.register_user.errors.map((message, index) => {
                  return (
                    <li className="error_message" key={index}>
                      <p className="error_p">{message.message}</p>
                    </li>
                  );
                })
              ) : (
                <div></div>
              )}
            </form>
            <div className="checkout__footer">
              <Link className="checkout__footer__back" to={`/products`}>
                Back to shop
              </Link>
              <button className="checkout__button" onClick={this.onSubmit}>
                Checkout
              </button>
            </div>
          </div>
        </div>
        <ProductFooter />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};
const mapDispachToProps = dispatch => {
  return {
    getCartRequest: params => dispatch(getCartRequest(params))
  };
};
export default connect(mapStateToProps, mapDispachToProps)(Checkout);
