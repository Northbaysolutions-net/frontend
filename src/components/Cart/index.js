import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

import APIs from '../../API';
import { Redirect } from 'react-router-dom';

class Cart extends Component {
  constructor() {
    this.state.totalItems = Number(localStorage.getItem('totalItems'));
    this.state.orderPlaced = false;
  }

  placeOrder = async () => {
    let customer_id = localStorage.getItem('customer_id');
    let cart = [];
    for (let i = 1; i <= this.state.totalItems; i++) {
      cart.concat({
        product_id: localStorage.getItem(`item_${i}_id`),
        quantity: localStorage.getItem(`item_${i}_qty`),
        size: localStorage.getItem(`item_${i}_size`),
        color: localStorage.getItem(`item_${i}_color`),
      });
    }
    await APIs.placeOrder(customer_id, cart);
    localStorage.clear();
    alert('Order placed successfully! Redirecting you to main page');
    this.setState({ orderPlaced: true });
    return;
  };

  cartDetails = () => {
    for (let i = 1; i <= this.state.totalItems; i++) {
      return (
        <Container>
          <Row>Product ID = {localStorage.getItem(`item_${i}_id`)}</Row>
          <Row>Quantity = {localStorage.getItem(`item_${i}_qty`)}</Row>
          <Row>Size = {localStorage.getItem(`item_${i}_size`)}</Row>
          <Row>Color = {localStorage.getItem(`item_${i}_color`)}</Row>
        </Container>
      );
    }
  };
  render() {
    if (this.state.orderPlaced) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    if (!localStorage.getItem('loggedIn')) {
      return (
        <div>
          Please <a href='/login'>log in</a> to access cart.
        </div>
      );
    }
    let { totalItems } = this.state;
    if (!totalItems) {
      totalItems = 0;
    }
    if (totalItems == 0) {
      return (
        <div>
          Your cart is empty. Please go to <a href='/'>the main page</a> to find
          some items you might like.
        </div>
      );
    }

    return (
      <div>
        <this.cartDetails />
        <Button onClick={this.placeOrder}>Place Order</Button>
      </div>
    );
  }
}

export default Cart;
