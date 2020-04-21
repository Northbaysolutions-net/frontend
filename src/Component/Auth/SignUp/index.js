import React, { Component } from "react";
import { Link, Redirect} from "react-router-dom";
import { signUpRequest } from "../../../Actions";
import { connect } from "react-redux";

import Header from "../../../Component/CommonComponent/Header";
import Footer from "../../../Component/CommonComponent/Footer";

import "./style.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      gender: "",
      address: "",
      email: "",
      password: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const signUpData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      gender: this.state.gender,
      address: this.state.address,
      email: this.state.email,
      password: this.state.password
    };
    this.props.signUpRequest(signUpData, this.props.history);
  };
  render() {
    if (this.props.register_user && this.props.register_user.success) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <Header />
        <div className="container">
          <div className="signup">
            <div className="signup__heading">
              <h1>Sign Up</h1>
            </div>

            <form className="signup__form">
              <input
                type="text"
                name="first_name"
                placeholder="First Name*"
                className="signup__form__fullname"
                required
                onChange={this.handleChange}
              ></input>
              <input
                type="text"
                name="last_name"
                placeholder="Last Name*"
                className="signup__form__fullname"
                required
                onChange={this.handleChange}
              ></input>
              <input
                type="text"
                name="email"
                placeholder="Email*"
                className="signup__form__email"
                required
                onChange={this.handleChange}
              ></input>
              <input
                type="password"
                name="password"
                placeholder="Password*"
                className="signup__form__password"
                required
                onChange={this.handleChange}
              ></input>
              <select
                className="signup__form__gender"
                name="gender"
                required
                onChange={this.handleChange}
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              <input
                type="text"
                name="address"
                placeholder="Address*"
                className="signup__form__address"
                required
                onChange={this.handleChange}
              ></input>
              {this.props.register_user && this.props.register_user.success === false ? (
                this.props.register_user.errors.map((message, index) => {
                  return (
                    <li className="error_message" key={index}>
                      <p className="error_p">{message.message}</p>
                    </li>
                  );
                })
              ) : (
                <div></div>
              )}
              <div className="signup__submit">
                <button
                  className="signup__submit__button"
                  onClick={this.onSubmit}
                >
                  Create
                </button>
              </div>
            </form>

            <div className="signup__forgot">
              <a href="/#" className="signup__forgot__already">
                <h1>Already a member?</h1>
              </a>
              <Link to="/" className="signup__forgot__siginin">
                <h1>Sign In</h1>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    register_user: state.register_user
  };
};
const mapDispachToProps = dispatch => {
  return {
    signUpRequest: signUpData => dispatch(signUpRequest(signUpData))
  };
};
export default connect(mapStateToProps, mapDispachToProps)(SignUp);
