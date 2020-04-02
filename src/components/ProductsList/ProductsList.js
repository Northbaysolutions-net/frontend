import React, { Component } from "react";
import Product from "../Product/Product.js";
import "./ProductsList.css";
import { Container, Row, Col} from "react-bootstrap";
import { connect } from "react-redux";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount () {

    this.props.ongetAllProducts();
    this.setState({products : this.props.products})
    console.log('mount it!');
}

  render() {
    let products = this.props.products;
    let products_arr = []
    
    for (let i = 0; i < products.length; i++) {
      products_arr.push(
        <Col className='product_col' key={i}>
          <Product  productDetails = {products[i]} />
        </Col>
      );      
    }

    return (
      <div>
        <Container className = "thumnail">
         <Row>{products_arr}</Row>
        </Container>
      </div>
    );
  }
}

const mapStoreToProps = store => {
  return {
    products: store.rProductsList.products,
  };
};
const mapDispatchTOProps = dispatch => {
  return {
    ongetAllProducts: () => dispatch({ type: "getAllProducts"})
  };
};

export default connect(mapStoreToProps, mapDispatchTOProps)(ProductsList);

