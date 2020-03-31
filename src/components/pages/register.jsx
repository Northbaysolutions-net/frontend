import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import Breadcrumb from "../common/breadcrumb";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      redirect: false,
      textClass: "hidden"
    };
  }

  setStateFromInput = event => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
    console.log(this.state);
  };

  handleSubmit = () => {
    const { userName, password, email } = this.state;

    // let config = {
    //   headers: {
    //     Authorization: basicAuth
    //   }
    // };
    // API Call for Login Authorization
    axios
      .post("http://localhost:3000/signup", {
        userName,
        password,
        email
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
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
    if (this.state.redirect) {
      return <Redirect to="/pages/login" />;
    }

    return (
      <div>
        <Breadcrumb title={"create account"} />

        {/*Regsiter section*/}
        <section className="register-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h3>create account</h3>
                <div className="theme-card">
                  <form className="theme-form">
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="email">User Name</label>
                        <input
                          type="text"
                          name="userName"
                          className="form-control"
                          id="fname"
                          placeholder="First Name"
                          required=""
                          onChange={this.setStateFromInput}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="email">email</label>
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          required=""
                          onChange={this.setStateFromInput}
                        />
                        <span className={this.state.textClass}>
                          <p className="error-message">
                            &nbsp; Email already exists
                          </p>
                        </span>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="review">Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="review"
                          placeholder="Enter your password"
                          onChange={this.setStateFromInput}
                          required=""
                        />
                      </div>
                      <a className="btn btn-solid" onClick={this.handleSubmit}>
                        create Account
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Register;
