import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import Auth from '../../Auth';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import { setLoggedInUser, setLoginToken } from '../../Redux/Actions';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {
  DISPATCH_EMAIL,
  DISPATCH_USERNAME,
  DISPATCH_PASSWORD,
  DISPATCH_REPASSWORD,
  DISPATCH_SHIPPING_REGION_ID,
  DISPATCH_INVALID,
  SIGNUP_REQUEST,
} from './action-types';

import './SignUp.css';

class SignUp extends Component {
  //helper
  validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  onSubmit = () => {
    if (!this.validateEmail(this.props.email)) {
      this.props.dispatchInvalid('Invalid Email Address');
      return;
    }
    if (
      !this.props.password ||
      !this.props.rePassword ||
      this.props.password !== this.props.rePassword
    ) {
      this.props.dispatchInvalid('Passwords do not match');
      return;
    }
    if (!this.props.name) {
      this.props.dispatchInvalid('Invalid Username');
      return;
    }
    if (
      !this.props.shippingRegionId ||
      !Number.isInteger(this.props.shippingRegionId)
    ) {
      this.props.dispatchInvalid('Invalid Shipping Region ID');
    }

    let signUpData = {
      name: this.props.name,
      email: this.props.email,
      password: this.props.password,
      shipping_region_id: this.props.shippingRegionId,
    };

    this.props.signUp(signUpData);
  };

  render() {
    if (this.props.signUpComplete === true) {
      alert('Sign Up Successful! Please log in to proceed.');
      return <Redirect to={{ pathname: '/login' }} />;
    }

    return (
      <div className='outer-div'>
        <div className='container-div'>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <div className='header-div'> Sign Up </div>
          <TextField
            value={this.props.name}
            placeholder='User Name'
            onChange={(e) => {
              this.props.dispatchUserName(e.target.value); //dispatch username
            }}
          />
          <TextField
            value={this.props.email}
            placeholder='Email'
            onChange={(e) => {
              this.props.dispatchEmail(e.target.value); //dispatch email
            }}
          />
          <TextField
            value={this.props.password}
            placeholder='Password'
            type='password'
            onChange={(e) => {
              this.props.dispatchPassword(e.target.value); //dispatch password
            }}
          />{' '}
          <TextField
            value={this.props.rePassword}
            type='password'
            placeholder='Re-type Password'
            onChange={(e) => {
              this.props.dispatchRePassword(e.target.value); //dispatch rePassword
            }}
          />
          <TextField
            value={this.props.shippingRegionId}
            placeholder='Shipping Region ID'
            onChange={(e) => {
              this.props.dispatchShippingRegionId(Number(e.target.value)); //dispatch rePassword
            }}
          />
          <Button
            className='btn-submit'
            variant='outlined'
            color='primary'
            onClick={this.onSubmit}
          >
            Sign Up
          </Button>
          {this.props.invalid && (
            <div className='error-div'>{this.props.errorMessage}</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.signUpStore.name,
    email: state.signUpStore.email,
    password: state.signUpStore.password,
    rePassword: state.signUpStore.rePassword,
    shippingRegionId: state.signUpStore.shippingRegionId,
    errorMessage: state.signUpStore.errorMessage,
    invalid: state.signUpStore.invalid,
    signUpComplete: state.signUpStore.signUpComplete,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUserName: (name) => dispatch({ type: DISPATCH_USERNAME, name }),
    dispatchEmail: (email) => dispatch({ type: DISPATCH_EMAIL, email }),
    dispatchPassword: (password) =>
      dispatch({ type: DISPATCH_PASSWORD, password }),
    dispatchRePassword: (rePassword) =>
      dispatch({ type: DISPATCH_REPASSWORD, rePassword }),
    dispatchShippingRegionId: (shippingRegionId) =>
      dispatch({ type: DISPATCH_SHIPPING_REGION_ID, shippingRegionId }),
    dispatchInvalid: (errorMessage) =>
      dispatch({ type: DISPATCH_INVALID, errorMessage }),
    signUp: (data) => dispatch({ type: SIGNUP_REQUEST, data }),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
