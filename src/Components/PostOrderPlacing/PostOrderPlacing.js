import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import {
  postOrderPopup,
  setCheckedOutItems,
  resetStoreAfterOrder
} from '../../Redux/Actions';
import { withRouter } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const mapStateToProps = state => {
  return {
    open: state.postOrderPopup,
    successfulOrderPlacing: state.successfulOrderPlacing
  };
};

const mapDispatchToProps = {
  postOrderPopup: postOrderPopup,
  setCheckedOutItems: setCheckedOutItems,
  resetStoreAfterOrder: resetStoreAfterOrder
};

class ConnectedPostOrderPopup extends Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => {
            this.props.resetStoreAfterOrder();
            this.props.postOrderPopup(false);
            this.props.history.push('/');
          }}
        >
          <AppBar position='static' style={{ backgroundColor: '#3863aa' }}>
            <Toolbar>
              <ShoppingCartIcon
                fontSize='large'
                style={{ color: 'white', marginRight: 20 }}
              />
              Shopping Cart
            </Toolbar>
          </AppBar>

          {this.props.successfulOrderPlacing ? (
            <div
              style={{
                maxHeight: 400,
                padding: 10,
                overflow: 'auto'
              }}
            >
              Order Placed Successfully!!! You will recieve an Email Shortly.
              Thank you for Shopping with Us. Happy Shopping!!!
            </div>
          ) : (
            <div
              style={{
                maxHeight: 400,
                padding: 10,
                overflow: 'auto'
              }}
            >
              There was an Error in Placing your Order. Kindly try again later.
              We apologize for inconvenience.
            </div>
          )}

          <div style={{ display: 'flex', padding: 20, alignItems: 'center' }}>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => {
                this.props.resetStoreAfterOrder();
                this.props.postOrderPopup(false);
                this.props.history.push('/');
              }}
            >
              Go to Home Page
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}
const PostOrderPopup = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConnectedPostOrderPopup)
);
export default PostOrderPopup;
