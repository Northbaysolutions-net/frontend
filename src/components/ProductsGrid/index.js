import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Col,
  Row,
  Image,
  Card,
  Spinner,
} from 'react-bootstrap';

import { PRODUCT_IMAGE_ENDPOINT } from '../../API/constants';
import Footer from '../Footer';

class ProductsGrid extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { products } = this.props;
    if (products.length === 0) {
      return (
        <div className='spin'>
          <Spinner animation='grow' size='lg' />
        </div>
      );
    }

    return (
      <div>
        <Container fluid>
          <Row className='justify-content-md-center'>
            {products.map((p) => (
              <Col md={2} sm={3} className='products' key={p.product_id}>
                <Card key={p.product_id}>
                  <Card.Body>
                    <Link to={`/products/${p.product_id}`}>
                      <Row className='justify-content-md-center'>
                        <Image
                          className='product-image'
                          src={`${PRODUCT_IMAGE_ENDPOINT}/${p.image}`}
                        />
                      </Row>
                    </Link>
                    <Row className='justify-content-md-center'>{p.name}</Row>
                    <Row className='justify-content-md-center'>${p.price}</Row>
                    <Row className='justify-content-md-center'>
                      <Link to={`/product/${p.product_id}`}>
                        <Button variant='info'>View Product</Button>
                      </Link>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default ProductsGrid;
