import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {
  DISPATCH_PASSWORD,
  DISPATCH_USERNAME,
  LOGIN_REQUEST,
} from './action-types';

import './Login.css';

class Login extends Component {
  onSubmit = () => {
    this.props.login(this.props.name, this.props.password);
  };

  render() {
    if (!this.props.unauthorized) {
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('userName', this.props.name);
      localStorage.setItem('token', this.props.token);
    }

    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.props.referred === true) {
      return <Redirect to={from} />;
    }

    return (
      <div className='outer-div'>
        <div className='container-div'>
          <Avatar className='avatar-class'>
            <LockOutlinedIcon />
          </Avatar>
          <div className='header-div'> Log in </div>
          <TextField
            value={this.props.name}
            placeholder='User name'
            onChange={(e) => {
              this.props.dispatchUserName(e.target.value); //dispatch username
            }}
          />
          <TextField
            value={this.props.password}
            type='password'
            placeholder='Password'
            onChange={(e) => {
              this.props.dispatchPassword(e.target.value); //dispatch password
            }}
          />
          <Button
            className='btn-submit'
            variant='outlined'
            color='primary'
            onClick={this.onSubmit}
          >
            Log in
          </Button>
          <div></div>
          {this.props.unauthorized && (
            <div className='unauthorized-div'>
              Wrong username and/or password
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.logInStore.name,
    password: state.logInStore.password,
    unauthorized: state.logInStore.unauthorized,
    referred: state.logInStore.referred,
    token: state.logInStore.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUserName: (name) => dispatch({ type: DISPATCH_USERNAME, name }),
    dispatchPassword: (password) =>
      dispatch({ type: DISPATCH_PASSWORD, password }),
    login: (name, password) =>
      dispatch({ type: LOGIN_REQUEST, data: { name, password } }),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
