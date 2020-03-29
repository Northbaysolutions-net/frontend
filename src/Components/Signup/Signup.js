import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../../Auth';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { setLoggedInUser, setLoginToken } from '../../Redux/Actions';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { validateEmail } from '../../utils';

class ConnectedSignup extends Component {
  state = {
    userName: '',
    password: '',
    retypePassword: '',
    email: '',
    redirectToReferrer: false,
    errorMessage: ''
  };
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    // If user was authenticated, redirect her to where she came from.
    if (this.state.redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

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
            Sign Up{' '}
          </div>
          <TextField
            value={this.state.userName}
            placeholder='User name'
            onChange={e => {
              this.setState({ userName: e.target.value });
            }}
          />
          <TextField
            value={this.state.email}
            placeholder='Email'
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
          <TextField
            value={this.state.password}
            placeholder='Password'
            type='password'
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          />
          <TextField
            value={this.state.retypePassword}
            type='password'
            placeholder='Re-type Password'
            onChange={e => {
              this.setState({ retypePassword: e.target.value });
            }}
          />
          <Button
            style={{ marginTop: 20, width: 200 }}
            variant='outlined'
            color='primary'
            onClick={() => {
              if (!validateEmail(this.state.email)) {
                this.setState({
                  wrongCred: true,
                  errorMessage:
                    'Invalid Email, Kindly input a valid Email Address'
                });
                return;
              }
              if (
                !this.state.password ||
                !this.state.retypePassword ||
                this.state.password !== this.state.retypePassword
              ) {
                console.log(validateEmail(this.state.email));
                this.setState({
                  wrongCred: true,
                  errorMessage: 'Input passwords do not match'
                });
                return;
              }
              if (!this.state.userName) {
                this.setState({
                  wrongCred: true,
                  errorMessage: 'Please provide a valid User name'
                });
              }

              // Simulate authentication call
              Auth.signup(
                {
                  name: this.state.userName,
                  email: this.state.email,
                  pass: this.state.password
                },
                user => {
                  console.log(user);
                  if (!user.name) {
                    this.setState({
                      wrongCred: true,
                      errorMessage: user.message
                    });
                    return;
                  }

                  this.props.dispatch(
                    setLoggedInUser({
                      name: user.name,
                      customer_id: user.customer_id
                    })
                  );
                  this.props.dispatch(setLoginToken(user.token));
                  this.setState(() => ({
                    redirectToReferrer: true
                  }));
                }
              );
            }}
          >
            Sign Up
          </Button>
          {this.state.wrongCred && (
            <div style={{ color: 'red' }}>{this.state.errorMessage}</div>
          )}
        </div>
      </div>
    );
  }
}
const Signup = withRouter(connect()(ConnectedSignup));

export default Signup;
