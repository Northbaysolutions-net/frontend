import React, { Component } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { connect } from "react-redux";

import "../Product/Product.css";
import { ImageURL} from '../../constants'

class Product extends Component {

  buyNowClick = product_id => {
    this.props.onSetProductDetails(product_id);
  };

  render() {
    let product_id = this.props.productDetails.product_id;
    return (
      <Container>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant='top'
            src= {ImageURL + this.props.productDetails.thumbnail} 
          />
          <Card.Body>
            <Card.Title>{this.props.productDetails.name}</Card.Title>
            <Card.Text>
              <b>${this.props.productDetails.price}</b>
            </Card.Text>
            <Button
              variant='primary'
              onClick={() => this.buyNowClick(product_id)}
            >
              BUY NOW
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
const mapDispatchTOProps = dispatch => {
  return {
    onSetProductDetails: data => dispatch({ type: 'setProductDetails',value: data})
  };
};

export default connect(null, mapDispatchTOProps)(Product);
