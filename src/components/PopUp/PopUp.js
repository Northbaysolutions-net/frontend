import React, { Component } from "react";
import { connect } from "react-redux";

import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import "../PopUp/PopUp.css";

class PopUp extends Component {

  render() {
    let SignIned = this.props.SignIn;
    return <div>{SignIned ? <SignIn closePopup={this.props.closePopup} /> : <SignUp closePopup={this.props.closePopup}/>}</div>;
  }
}
const mapStoreToProps = store => {
  return {
    SignIn: store.rPopUp.SignIn
  };
};


export default connect(mapStoreToProps, null)(PopUp);
