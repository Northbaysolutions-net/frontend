import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import React, { Component } from "react";
import "../SignIn/SignIn.css";
import { connect } from "react-redux";
import {Button} from 'react-bootstrap'


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_signIn: "",
      password_signIn: ""
    };
  }

  submitClick = () => {
    const {
      email_signIn,
      password_signIn } = this.state;

    if (email_signIn === '' || password_signIn === '' ) {
      alert(`Kindly fill all fields`);
      return;
    }

    let data = {
      email: email_signIn,
      password: password_signIn
    };

    this.props.onSignIn(data);
    this.closePopup();
  };

  openSignup = () =>
  {
    this.props.onSetSignInFalse( );
  }

  closePopup = () =>
  {
    this.props.closePopup();
  }

  render() {
    return (
            <div className='popup'>
        <div className='popup_inner'>
        <MuiThemeProvider>
          <div>
            <AppBar title='Sign In'  position="fixed" style={{ background: "#343a40" }} />
            <div className='div_center_class'>
              <TextField  className = 'div_field_class'
                hintText='Enter your Email'
                floatingLabelText='Email'
                onChange={(event, newValue) =>
                  this.setState({ email_signIn: newValue }) 
                }
                key = 'Email'
              />
              <br />
              <TextField  className = 'div_field_class'  key = 'password'
                type='password'
                hintText='Enter your Password'
                floatingLabelText='Password'
                onChange={(event, newValue) =>
                  this.setState({ password_signIn: newValue })
                }
              />
              <div className='div_button_class'>
                <RaisedButton
                  label='Submit'
                  primary={true}
                  className='button_class button_width-right'
                  onClick={this.submitClick}
                />
                 <RaisedButton
              label='Close'
              primary={true}
              className='button_class button_width-left'
              onClick={this.closePopup}
            />
              </div>
               <br />
              <Button variant='link' onClick={this.openSignup}>Create Account</Button>
          </div>
        </div>
        </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
const mapStoreToProps = store => {
  return {
    customer_id: store.rSignInSignUp.customer_id,
    token: store.rSignInSignUp.token
  };
};
const mapDispatchTOProps = dispatch => {
  return {
    onSignIn: data => dispatch({ type: "signIn", value: data }),
    onSetSignInFalse: () => dispatch({ type: "SET_SIGNIN_FALSE"})
  };
};

export default connect(mapStoreToProps, mapDispatchTOProps)(SignIn);
