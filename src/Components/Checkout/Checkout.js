import React, { Component } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  getUserInformation,
  updateUserInformation,
  placeOrder
} from '../../Redux/Actions';
import {
  isUsZipCode,
  cardnumberValidator,
  compareObjects,
  createOrderObject
} from '../../utils';

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
    loggedInUser: state.loggedInUser,
    token: state.token,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = {
  getUserInformation: getUserInformation.request,
  updateUserInformation: updateUserInformation.request,
  placeOrder: placeOrder.request
};

class ConnectedCheckout extends Component {
  state = {
    creditCard: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    mobPhone: '',
    redirectToReferrer: false,
    errorMessage: ''
  };

  componentDidMount() {
    console.log(this.props.loggedInUser);
    if (this.props.cartItems.length > 0)
      this.props.getUserInformation({
        name: this.props.loggedInUser.name,
        token: this.props.token
      });
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.currentUser !== this.props.currentUser) {
      this.setState({
        creditCard: this.props.currentUser.credit_card,
        addressLine1: this.props.currentUser.address_1,
        addressLine2: this.props.currentUser.address_2,
        city: this.props.currentUser.city,
        region: this.props.currentUser.region,
        postalCode: this.props.currentUser.postal_code,
        country: this.props.currentUser.country,
        mobPhone: this.props.currentUser.mob_phone
      });
    }
  }

  checkout = async () => {
    if (!cardnumberValidator(this.state.creditCard)) {
      this.setState({
        wrongCred: true,
        errorMessage: 'Invalid Credit Card Number'
      });
      return;
    }
    if (!isUsZipCode(this.state.postalCode)) {
      this.setState({
        wrongCred: true,
        errorMessage: 'Please Input Valid Postal'
      });
      return;
    }
    if (!this.state.addressLine1 && !this.state.addressLine2) {
      this.setState({
        wrongCred: true,
        errorMessage: 'Address Cannot be Empty'
      });
      return;
    }
    if (!this.state.city || !this.state.region || !this.state.country) {
      this.setState({
        wrongCred: true,
        errorMessage: 'City Region or Country Cannot be empty'
      });
      return null;
    }
    if (!compareObjects(this.props.currentUser, this.state)) {
      let updateUserInfo = {
        name: this.props.loggedInUser.name,
        newData: {
          credit_card: this.state.creditCard,
          address_1: this.state.addressLine1,
          address_2: this.state.addressLine2,
          city: this.state.city,
          region: this.state.region,
          postal_code: this.state.postalCode,
          country: this.state.country
        }
      };
      this.props.updateUserInformation({
        object: updateUserInfo,
        token: this.props.token
      });
    }
    let object = createOrderObject({
      loggedInUser: this.props.loggedInUser,
      cartItems: this.props.cartItems
    });
    this.props.placeOrder({ object, token: this.props.token });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (this.state.redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    if (this.props.cartItems.length > 0) {
      return (
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',

            alignItems: 'center'
          }}
        >
          <div
            style={{
              height: 300,
              width: 200,
              padding: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Avatar style={{ marginBottom: 10 }}>
              <LockOutlinedIcon />
            </Avatar>
            <div
              style={{
                marginBottom: 20,
                fontSize: 24,
                textAlign: 'center'
              }}
            >
              {' '}
              Checkout{' '}
            </div>
            <TextField
              value={this.state.creditCard}
              placeholder='Credit Card (Visa Card Only)'
              onChange={e => {
                this.setState({ creditCard: e.target.value });
              }}
            />
            <TextField
              value={this.state.addressLine1}
              placeholder='Address Line 1'
              onChange={e => {
                this.setState({ addressLine1: e.target.value });
              }}
            />
            <TextField
              value={this.state.addressLine2}
              placeholder='Address Line 2'
              onChange={e => {
                this.setState({ addressLine2: e.target.value });
              }}
            />
            <TextField
              value={this.state.city}
              placeholder='City'
              onChange={e => {
                this.setState({ city: e.target.value });
              }}
            />
            <TextField
              value={this.state.region}
              placeholder='Region'
              onChange={e => {
                this.setState({ region: e.target.value });
              }}
            />
            <TextField
              value={this.state.postalCode}
              type='number'
              placeholder='Postal Code'
              onChange={e => {
                this.setState({ postalCode: e.target.value });
              }}
            />
            <TextField
              value={this.state.country}
              placeholder='Country'
              onChange={e => {
                this.setState({ country: e.target.value });
              }}
            />
            <Button
              style={{ marginTop: 20, width: 200 }}
              variant='outlined'
              color='primary'
              onClick={this.checkout}
            >
              Checkout
            </Button>
            {this.state.wrongCred && (
              <div style={{ color: 'red' }}>{this.state.errorMessage}</div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div style={{ padding: 20 }}>
            You have currently 0 items in your cart
          </div>
          <Link to='/'>
            <Button
              style={{ marginLeft: 20 }}
              variant='outlined'
              color='primary'
            >
              {' '}
              Go to Home page
            </Button>
          </Link>
        </div>
      );
    }
  }
}
const Checkout = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConnectedCheckout)
);

export default Checkout;
