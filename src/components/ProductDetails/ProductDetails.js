import React, { Component } from 'react';
import { Card, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ImageURL} from '../../constants'

import PopUp from '../PopUp/PopUp';
import APIs from '../../APIs/index';
import './ProductDetails.css';

const api = new APIs();

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '',
      color: '',
      showPopup: false,
      quantity : 1
    };
  }
  componentDidMount() {
    let data = { id: this.props.ProductDetailsId };
    this.props.ongetProduct(data);
  }



  addToCart = async () => {
    if (this.props.token === '') {
      this.props.onSetSignInTrue();
      this.togglePopup();
      return;
    }
    let data = { token: this.props.token };

    await api
      .getTokenStatus(data)
      .then(response => {
        if (response.payload.status === true) {
          if (this.state.color === '' || this.state.size === '') {
            alert('kindly select product size and color .');
            return;
          }
          let product = {
            product_id: this.props.product.product_id,
            name: this.props.product.name,
            price: this.props.product.price * this.state.quantity,
            color: this.state.color,
            size: this.state.size,
            quantity: this.state.quantity,
            thumbnail : this.props.product.thumbnail

          };
          let allEntries = [];
          if (localStorage.getItem('Products') !== '')
            allEntries = JSON.parse(localStorage.getItem('Products'));
          allEntries.push(product);
          localStorage.setItem('Products', JSON.stringify(allEntries));
          this.props.onSetShowModelTrue();
        } else {
          alert('Kindly Login again your session has been expired ');
        }
      })
      .catch(err => {
        alert('Encounter some Issue while placing In cart');
        console.log(err);
      });
  };

  selectSize = id => {
    let elems = document.querySelectorAll('[id$=_size]');
    let index = 0,
      length = elems.length;
    for (; index < length; index++) {
      elems[index].style.borderColor = '';
    }
    document.getElementById(id).style.borderColor = 'black';
    this.setState({ size: document.getElementById(id).value });
  };

  selectColor = id => {
    let elems = document.querySelectorAll('[id$=_color]');
    let index = 0,
      length = elems.length;
    for (; index < length; index++) {
      elems[index].style.borderStyle = 'inherit';
    }
    document.getElementById(id).style.borderStyle = 'outset';
    this.setState({ color: document.getElementById(id).style.backgroundColor });
  };

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  handleQuantityChange = value =>
  {
    this.setState({ quantity: value});
  }

  render() {
    const hStyle = { color: 'red' };
    let color_attribute = [];
    let size_attribute = [];

    if (this.props.product !== undefined && this.props.product.product_id) {
      let product = this.props.product;
      let product_attributes = product.product_attributes;
      for (let i = 0; i < product_attributes.length; i++) {
        if (
          product_attributes[i].attribute_value.attribute.attribute === 'Color'
        )
          color_attribute.push(
            product_attributes[i].attribute_value.attribute_value
          );

        if (
          product_attributes[i].attribute_value.attribute.attribute === 'Size'
        )
          size_attribute.push(
            product_attributes[i].attribute_value.attribute_value
          );
      }
    }
    let quantities = []
    for (let i = 1; i <= this.props.product.quantity; i++){
      quantities.push(
      <option key={i} id={i} >{i}</option>);
    }

    let colors = color_attribute.map((v, key) => (
      <button
        className='button button5'
        id={v + '_color'}
        key={key}
        style={{ backgroundColor: v }}
        onClick={() => this.selectColor(v + '_color')}
      ></button>
    ));

    let sizes = size_attribute.map((v, key) => (
      <Button
        variant='link'
        id={v + '_size'}
        key={key}
        value={v}
        onClick={() => this.selectSize(v + '_size')}
      >
        {v + ' '}
      </Button>
    ));

    return (
      <Container>
        <Card className='card_container'>
          <Row>
            <Col>
              <Card.Img
                variant='top'
                src = {ImageURL + this.props.product.image} 
              />
            </Col>
            <Col>
              <Card.Body>
                <Card.Title>{this.props.product.name}</Card.Title>
                <Card.Text>{this.props.product.description}</Card.Text>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <b style={hStyle}>${this.props.product.price}</b>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Subtitle className='mb-2 text-muted'>
                      Color
                    </Card.Subtitle>
                    {colors}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Subtitle className='mb-2 text-muted'>
                      Size
                    </Card.Subtitle>
                    {sizes}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Subtitle className='mb-2 text-muted'>
                      Quantity
                    </Card.Subtitle>
                    <select name='quantity' value={this.state.quantity} 
                    onChange={event => this.handleQuantityChange(event.target.value)}>
                   {quantities}
        </select>
                  </ListGroup.Item>
                </ListGroup>
                <br />
                <Button variant='primary' onClick={this.addToCart}>
                  Add To Cart
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
        {this.state.showPopup ? <PopUp closePopup={this.togglePopup} /> : null}
      </Container>
    );
  }
}

const mapStoreToProps = store => {
  return {
    product: store.rProductsList.product,
    ProductDetailsId: store.rMainPage.ProductDetailsId,
    token: store.rSignInSignUp.token,
    status: store.rSignInSignUp.status,
    customer_id: store.rSignInSignUp.customer_id,
    order_id: store.rCheckOut.order_id
  };
};
const mapDispatchTOProps = dispatch => {
  return {
    ongetProduct: data => dispatch({ type: 'getProduct', value: data }),
    onSetSignInTrue: () => dispatch({ type: 'SET_SIGNIN_TRUE' }),
    onGetTokenStatus: data => dispatch({ type: 'getTokenStatus', value: data }),
    onSetShowModelTrue: () => dispatch({ type: 'setShowModelTrue' })
  };
};

export default connect(mapStoreToProps, mapDispatchTOProps)(ProductDetails);
