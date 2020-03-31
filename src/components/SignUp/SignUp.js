import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import "../SignUp/SignUp.css";

class signUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name_signUp: "",
      password_signUp: "",
      email_signUp: "",
      retypePassword_signUp: ""
    };
  }

  closePopup = () => {
    this.props.closePopup();
  };

  submitClick = async () => {
    const {
      email_signUp,
      password_signUp,
      name_signUp,
      retypePassword_signUp
    } = this.state;

    if (password_signUp !== retypePassword_signUp) {
      alert(`Passwords don't match`);
      return;
    }
    if (email_signUp === '' || name_signUp === '' || password_signUp === '' ) {
      alert(`Kindly fill all fields`);
      return;
    }

    let data = {
      email: email_signUp,
      password: password_signUp,
      name: name_signUp
    };

    this.props.onsignUp(data);
    this.closePopup();

    

  };

  openSignUp = () => {
    this.props.onSetSignInTrue();
  };

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <MuiThemeProvider>
            <div>
            <AppBar title='Sign Up' style={{ background: "#343a40" }} />
            <br />
            <div className='div_center_class'>
              <div>
                <TextField
                  className='div_field_class'
                  hintText='Enter your Full Name'
                  floatingLabelText='FullName'
                  onChange={(event, newValue) =>
                    this.setState({ name_signUp: newValue })
                  }
                />
                <br />

                <TextField
                  className='div_field_class'
                  hintText='Enter your Email'
                  floatingLabelText='Email'
                  onChange={(event, newValue) =>
                    this.setState({ email_signUp: newValue })
                  }
                />
                <br />

                <TextField
                  className='div_field_class'
                  type='password'
                  hintText='Enter your Password'
                  floatingLabelText='Password'
                  onChange={(event, newValue) =>
                    this.setState({ password_signUp: newValue })
                  }
                />
                <br />

                <TextField
                  className='div_field_class'
                  type='password'
                  hintText='Re-Type Password'
                  floatingLabelText='Re-Type Password'
                  onChange={(event, newValue) =>
                    this.setState({ retypePassword_signUp: newValue })
                  }
                />
                <div className='div_button_class'>
                  <RaisedButton
                    label='Create'
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
              </div>
              <p>
                Already a member?
                <Button variant='link' onClick={this.openSignUp}>
                  Sign In
                </Button>
              </p>
            </div>
            <br />
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
    onsignUp: data => dispatch({ type: "signUp", value: data }),
    onSetSignInTrue: () => dispatch({ type: "SET_SIGNIN_TRUE" }),
  };
};

export default connect(mapStoreToProps, mapDispatchTOProps)(signUp);
