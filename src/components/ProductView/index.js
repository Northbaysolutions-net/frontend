import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Row } from 'react-bootstrap';
import { PRODUCT_IMAGE_ENDPOINT } from '../../API/constants';
import {
  GET_PRODUCT_BY_ID_REQUEST,
  ADD_ITEM_TO_CART,
  DISPATCH_QUANTITY,
  ADD_ITEM_FALSE,
  DISPATCH_SIZE,
  DISPATCH_COLOR,
} from './action-types';

import './ProductView.css';

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.Mounted = false;
  }

  async fetchProduct(productId) {
    if (this.Mounted) {
      this.props.getProductById(productId);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If ID of product changed in URL, refetch details for that product
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchProduct(this.props.match.params.id);
    }
  }

  componentDidMount() {
    this.Mounted = true;
    this.fetchProduct(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.Mounted = false;
  }

  selectColor = (obj) => {
    if (obj.attribute_value.attribute_id === 2)
      return (
        <Button
          id={obj.attribute_value.value}
          key={obj.attribute_value_id}
          style={{ backgroundColor: `${obj.attribute_value.value}` }}
          className='options'
          onClick={(e) => this.props.dispatchColor(e.target.value)}
        ></Button>
      );
    return;
  };
  selectSize = (obj) => {
    if (obj.attribute_value.attribute_id === 1)
      return (
        <Button
          id={obj.attribute_value.value}
          key={obj.attribute_value_id}
          variant='outline-secondary'
          className='options'
          onClick={(e) => this.dispatchSize(e.target.value)}
        >
          {obj.attribute_value.value}
        </Button>
      );
    return;
  };

  render() {
    if (!this.props.product) {
      return null;
    }
    let totalItems = Number(localStorage.getItem('totalItems'));
    if (!totalItems) {
      localStorage.setItem('totalItems', 0);
      totalItems = 0;
    }

    let duplicateItem = false;
    let duplicateIndex = null;
    for (let i = 1; i <= totalItems + 1; i++) {
      if (
        Number(localStorage.getItem(`item_${i}_id`)) ===
          this.props.product.product_id &&
        localStorage.getItem(`item_${i}_size`) === this.props.size &&
        localStorage.getItem(`item_${i}_color`) === this.props.color
      ) {
        duplicateItem = true;
        duplicateIndex = i;
        break;
      }
    }

    if (this.props.addItem && !duplicateItem) {
      localStorage.setItem('totalItems', Number(totalItems) + 1);
      totalItems += 1;
    }

    if (this.props.addItem && totalItems > 0) {
      if (duplicateItem) {
        localStorage.setItem(
          `item_${duplicateIndex}_qty`,
          Number(localStorage.getItem(`item_${duplicateIndex}_qty`)) +
            Number(this.props.quantity)
        );
      }
      if (!duplicateItem) {
        localStorage.setItem(
          `item_${Number(totalItems)}_id`,
          this.props.product.product_id
        );
        localStorage.setItem(
          `item_${Number(totalItems)}_qty`,
          this.props.quantity
        );
        localStorage.setItem(
          `item_${Number(totalItems)}_size`,
          this.props.size
        );
        localStorage.setItem(
          `item_${Number(totalItems)}_color`,
          this.props.color
        );
      }
      this.props.dispatchAddItemFalse();
    }

    return (
      <div className='outer-padding'>
        <div className='product-name'>{this.props.product.name}</div>
        <div className='outer-div'>
          <img
            src={`${PRODUCT_IMAGE_ENDPOINT}/${this.props.product.image}`}
            alt=''
            width={250}
            height={250}
            className='img-border'
          />
          <div className='product-detail'>
            <div className='product-price'>
              Price: {this.props.product.price} $
            </div>
            <b> Color</b>
            <Row>
              {this.props.product.product_attributes.map(this.selectColor)}
            </Row>
            <b>Size</b>
            <Row>
              {this.props.product.product_attributes.map(this.selectSize)}
            </Row>
            <TextField
              type='number'
              value={this.props.quantity}
              className='quantity'
              label='Quantity'
              inputProps={{ min: 1, max: 10, step: 1 }}
              onChange={(e) => {
                this.props.dispatchQuantity(Number(e.target.value));
              }}
            />
            <Button
              className='add-item-btn'
              color='primary'
              variant='outlined'
              onClick={() => {
                this.props.addItemToCart(
                  this.props.product,
                  this.props.quantity,
                  this.props.size,
                  this.props.color
                );
              }}
            >
              Add to Cart <AddShoppingCartIcon style={{ marginLeft: 5 }} />
            </Button>
          </div>
        </div>

        {/* Product description */}
        <div className='description-title'>Product Description</div>
        <div className='description-text'>
          {this.props.product.description
            ? this.props.product.description
            : 'Not available'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.singleProductStore.product,
    quantity: state.singleProductStore.quantity,
    size: state.singleProductStore.size,
    color: state.singleProductStore.color,
    addItem: state.singleProductStore.addItem,
    productQty: state.singleProductStore.productQty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchQuantity: (quantity) =>
      dispatch({ type: DISPATCH_QUANTITY, quantity }),
    dispatchColor: (color) =>
      dispatch({
        type: DISPATCH_COLOR,
        color,
      }),
    dispatchSize: (size) =>
      dispatch({
        type: DISPATCH_SIZE,
        size,
      }),
    getProductById: (productId) =>
      dispatch({ type: GET_PRODUCT_BY_ID_REQUEST, productId }),
    addItemToCart: (product, quantity, size, color) => {
      product.quantity = Number(quantity);
      product.size = size;
      product.color = color;
      dispatch({ type: ADD_ITEM_TO_CART, product });
    },
    dispatchAddItemFalse: () =>
      dispatch({
        type: ADD_ITEM_FALSE,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);
