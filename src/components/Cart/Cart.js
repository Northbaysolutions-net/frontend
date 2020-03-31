import React, { Component } from 'react';
import { Table, Container, Col, Image, Row } from 'react-bootstrap';

import '../Cart/Cart.css';
import cross from '../../Images/cross.png';

import { ImageURL} from '../../constants'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: []
    };
  }

  removeProduct = removeVal => {
    let cartProducts = JSON.parse(localStorage.getItem('Products'));
    cartProducts.splice(removeVal, 1);
    localStorage.setItem('Products', JSON.stringify(cartProducts));
    this.props.setTotalCount(
      JSON.parse(localStorage.getItem('Products')).length
    );
    this.setState({
      cartProducts: JSON.parse(localStorage.getItem('Products'))
    });
  };

  getProducts = () => {
    let cartVal = localStorage.getItem('Products');
    if (cartVal !== undefined && cartVal !== null) {
      if (cartVal.length > 0)
        this.setState({ cartProducts: JSON.parse(cartVal) });
    }
    localStorage.setItem('TotalAmmount', 0);
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    let products = [];
    let total = 0;
    for (let i = 0; i < this.state.cartProducts.length; i++) {
      total = total + this.state.cartProducts[i].price;
      products.push(
        <tr key={this.state.cartProducts[i].product_id}>
          <td>
            <Row>
              <Col xs={4} md={4}>
                <Image
                  src={ImageURL + this.state.cartProducts[i].thumbnail}
                />
              </Col>
              <Col xs={4} md={8}>
                <Row>
                  <b>{this.state.cartProducts[i].name}</b>
                </Row>
                <Row>
                  <img
                    src={cross}
                    alt='cart'
                    className=' image_cart_icon'
                    onClick={() => this.removeProduct(i)}
                  />
                  Remove
                </Row>
              </Col>
            </Row>
          </td>
          <td>{this.state.cartProducts[i].size}</td>
          <td>{this.state.cartProducts[i].price}</td>
          <td>{this.state.cartProducts[i].quantity}</td>
        </tr>
      );
    }
    localStorage.setItem('TotalAmmount', total);

    return (
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>{products}</tbody>
        </Table>
        <p>Total Ammount {total}</p>
      </Container>
    );
  }
}

export default Cart;
