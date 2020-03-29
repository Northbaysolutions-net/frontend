import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { setCheckedOutItems, deleteCartItem } from '../../Redux/Actions';

const mapStateToProps = state => {
  return {
    checkedOutItems: state.checkedOutItems,
    cartItems: state.cartItems
  };
};

const mapDispatchToProps = {
  setCheckedOutItems: setCheckedOutItems,
  deleteCartItem: deleteCartItem
};

// This component shows the items user checked out from the cart.
class ConnectedOrder extends Component {
  render() {
    console.log(this.props.cartItems);
    console.log(this.props.checkedOutItems);
    let totalPrice = this.props.cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);

    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10 }}>Order summary</div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.cartItems.map((item, index) => {
              console.log(item);
              return (
                <TableRow key={item.product_id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Button
                      color='secondary'
                      onClick={() => {
                        this.props.deleteCartItem(item.product_id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div
          style={{
            color: '#504F5A',
            marginLeft: 5,
            marginTop: 50,
            fontSize: 22
          }}
        >
          Total price: {totalPrice} $
        </div>
        <Link to='checkout'>
          <Button
            color='primary'
            variant='outlined'
            disabled={totalPrice === 0}
            onClick={() => {
              console.log('purchased');
            }}
            style={{ margin: 5, marginTop: 30 }}
          >
            Purchase
          </Button>
        </Link>
        <Button
          color='secondary'
          variant='outlined'
          disabled={totalPrice === 0}
          onClick={() => {
            this.props.setCheckedOutItems([]);
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Discard
        </Button>
      </div>
    );
  }
}
const Order = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConnectedOrder)
);

export default Order;
