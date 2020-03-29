import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CircularProgress from '@material-ui/core/CircularProgress';
import { addItemInCart, getProductById } from '../../Redux/Actions';
import Api from '../../Api';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { API_ENDPOINT_IMAGES } from '../../constants';

const mapStateToProps = state => {
  return {
    currentProduct: state.currentProduct
  };
};

const mapDispatchToProps = {
  getProductById: getProductById.request,
  addItemInCart: addItemInCart
};

class ConnectedDetails extends Component {
  constructor(props) {
    super(props);
    this.isCompMounted = false;
    this.state = {
      quantity: 1,
      product: null,
      itemLoading: true
    };
  }

  async fetchProduct(productId) {
    this.setState({ itemLoading: true });
    let result = await Api.getProductById({ id: productId });
    if (this.isCompMounted) {
      this.setState({
        product: result.data,
        quantity: 1,
        itemLoading: false
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If ID of product changed in URL, refetch details for that product
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchProduct(this.props.match.params.id);
    }
  }

  componentDidMount() {
    this.isCompMounted = true;
    this.fetchProduct(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.isCompMounted = false;
  }

  render() {
    if (this.state.itemLoading) {
      return <CircularProgress className='circular' />;
    }
    if (!this.state.product) {
      return null;
    }
    console.log(this.state);
    return (
      <div style={{ padding: 10 }}>
        <div
          style={{
            marginBottom: 20,
            marginTop: 10,
            fontSize: 22
          }}
        >
          {this.state.product.name}
        </div>
        <div style={{ display: 'flex' }}>
          <img
            src={`${API_ENDPOINT_IMAGES}/${this.state.product.image}`}
            alt=''
            width={250}
            height={250}
            style={{
              border: '1px solid lightgray',
              borderRadius: '5px',
              objectFit: 'cover'
            }}
          />
          <div
            style={{
              flex: 1,
              marginLeft: 20,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div
              style={{
                fontSize: 16
              }}
            >
              Price: {this.state.product.price} $
            </div>

            <TextField
              type='number'
              value={this.state.quantity}
              style={{ marginTop: 20, marginBottom: 10, width: 70 }}
              label='Quantity'
              inputProps={{ min: 1, max: 10, step: 1 }}
              onChange={e => {
                this.setState({ quantity: parseInt(e.target.value) });
              }}
            />
            <Button
              style={{ width: 170, marginTop: 5 }}
              color='primary'
              variant='outlined'
              onClick={() => {
                this.props.addItemInCart({
                  ...this.state.product,
                  quantity: this.state.quantity
                });
              }}
            >
              Add to Cart <AddShoppingCartIcon style={{ marginLeft: 5 }} />
            </Button>
          </div>
        </div>

        {/* Product description */}
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
            fontSize: 22
          }}
        >
          Product Description
        </div>
        <div
          style={{
            maxHeight: 200,
            fontSize: 13,
            overflow: 'auto'
          }}
        >
          {this.state.product.description
            ? this.state.product.description
            : 'Not available'}
        </div>
      </div>
    );
  }
}

const Details = connect(mapStateToProps, mapDispatchToProps)(ConnectedDetails);
export default Details;
