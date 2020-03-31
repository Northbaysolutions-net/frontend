import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { Redirect } from "react-router-dom";
import "./LoginPage.css";
import { authenticate } from "../../actions/index";

import Breadcrumb from "../common/breadcrumb";
import crypto from 'crypto'
require("dotenv").config()


const ENCRYPTION_KEY = `${process.env.REACT_APP_ENCRYPTION_KEY}`; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textClass: "hidden",
      userName: "",
      password: "",
      redirect: false
    };
  }
  encrypt = text => {
      console.log(ENCRYPTION_KEY)

  
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipher(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
    );
    let encrypted = cipher.update(text);
  
    encrypted = Buffer.concat([encrypted, cipher.final()]);
  
    return encrypted.toString("hex");
  };

  handleUsername = e => {
    this.setState({ userName: e.target.value });
  };
  handlePassword = e => {
    this.setState({ password: e.target.value });
  };
  handleSubmit = () => {
    const { userName, password } = this.state;

    // Encoding the credentials in base64 using btoa window function
const name=this.encrypt(userName)
const pass=this.encrypt(password)
console.log(userName,password)
    // let config = {
    //   headers: {
    //     Authorization: basicAuth
    //   }
    // };
    // API Call for Login Authorization
    axios
      .post('http://localhost:3000/login', {name,pass} )
      .then(response => {
        if (response.data.token) {
          this.props.authenticate(response.data);
          this.setState({ redirect: true });
        } else {
          this.setState({ textClass: "visible" });
        }
      })
      .catch(error => {
        this.setState({ textClass: "visible" });
        console.log(error);
      });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Breadcrumb title={"Login"} />

        {/*Login section*/}
        <section className="login-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h3>Login</h3>
                <div className="theme-card">
                  <form className="theme-form">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        required=""
                        onChange={this.handleUsername}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="review">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="review"
                        placeholder="Enter your password"
                        required=""
                        onChange={this.handlePassword}
                      />
                    </div>
                    <a
                      onClick={this.handleSubmit}
                      className="btn btn-solid"
                    >
                      Login
                    </a>
                  </form>
                  <span className={this.state.textClass}>
                    <p className="error-message">
                      &nbsp; Please provide a valid username or password
                    </p>
                  </span>
                </div>
              </div>
              <div className="col-lg-6 right-login">
                <h3>New Customer</h3>
                <div className="theme-card authentication-right">
                  <h6 className="title-font">Create A Account</h6>
                  <p>
                    Sign up for a free account at our store. Registration is
                    quick and easy. It allows you to be able to order from our
                    shop. To start shopping click register.
                  </p>
                  <a href="#" className="btn btn-solid">
                    Create an Account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(null,{authenticate})(Login)
