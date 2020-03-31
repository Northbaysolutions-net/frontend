import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {information, about, contact, faq, locator , privacy, exchange , international ,intouch,uan,number, shopmateEmail, quickLinks } from '../../constants'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_signIn: "",
      password_signIn: ""
    };
  }

  submitClick = () => {
    let data = {
      email: this.state.email_signIn,
      password: this.state.password_signIn
    };
    this.props.onSignIn(data);
  };
  render() {
    return (
      <MDBFooter
        style={{ background: "whitesmoke" }}
        color='blue'
        className='font-small pt-4 mt-4'
      >
        <MDBContainer fluid className='text-center text-md-left'>
          <MDBRow>
            <MDBCol md='4'>
              <h5 className='title'>{information}</h5>
              <p>{about}</p>
              <p>{contact}</p>
              <p>{faq}</p>
              <p>{locator}</p>
            </MDBCol>
            <MDBCol md='4'>
              <h5 className='title'>{quickLinks}</h5>
              <p>{privacy}</p>
              <p>{exchange}</p>
              <p>{international}</p>
            </MDBCol>
            <MDBCol md='4'>
              <h5 className='title'>{intouch}</h5>
              <ul>
                <li className='list-unstyled'>
                  <a href='#'>{uan}</a>
                </li>
                <li className='list-unstyled'>
                  <a href='#'>{number}</a>
                </li>
                <li className='list-unstyled'>
                  <a href='#'>{shopmateEmail}</a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className='footer-copyright text-center py-3'>
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a href='#'> ShopMate </a>
          </MDBContainer>
        </div>
      </MDBFooter>
    );
  }
}

export default Footer;
