import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import cart from '../../Images/cart.png'
import './NavBar.css'
import Model from "../Model/Model";


class NavBar extends Component {


  componentDidMount() {
    this.props.ongetAllCategories();
    console.log("mount it!");
  }

  setMainPage = () =>
  {
    let data = {};
    data["category_id"] = 0;
    data["size"] = 0;
    data["gender"] = 0;
    data["color"] = 0;
    data["order"] = 0
    data["search"] = 0;
    data["pageNo"] = 1;
    this.props.ongetAllProducts(data);
    this.props.onSetProductList();
  }

  selectCategory = category_id => {
    let data = {};
    data["category_id"] = category_id;
    data["size"] = this.props.size;
    data["gender"] = this.props.gender;
    data["color"] = this.props.color;
    data["order"] = this.props.order;
    data["search"] = this.props.search;
    data["pageNo"] = 1;
    this.props.onSetProductList();
    this.props.ongetAllProducts(data);
  };

  render() {
    let optionTemplate = this.props.categories.map((v) => (
      <Nav.Link
        eventKey={v.category_id}
        onClick={() => this.selectCategory(v.category_id)}
        key = {v.category_id}
      >
        {v.name}
      </Nav.Link>
    ));

    return (
      <div>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand onClick={this.setMainPage}>ShopMate</Navbar.Brand>
          <Nav className='mr-auto'>{optionTemplate}</Nav>
            <img src={cart} alt='cart'className=" image_cart_icon" onClick= {this.props.onSetShowModelTrue}/>
        </Navbar>
        {this.props.ShowModel ?  
        <Model /> : null }  
      </div>
    );
  }
}
const mapStoreToProps = store => {
  return {
    categories: store.rNavBar.categories,
    gender_attributes: store.rSubBar.gender_attributes,
    size: store.rProductsList.size,
    gender: store.rProductsList.gender,
    color: store.rProductsList.color,
    search:  store.rProductsList.search,
    pageNo: store.rProductsList.pageNo,
    order:  store.rProductsList.order,
    ShowModel: store.rModel.ShowModel
  };
};
const mapDispatchTOProps = dispatch => {
  return {
    ongetAllCategories: () => dispatch({ type: "getAllCategories" }),
    ongetAllProducts: data => dispatch({ type: "getAllProducts", value: data }),
    onSetProductList: () => dispatch({ type: "setProductList" }),
    onSetShowModelTrue: () => dispatch({ type: "setShowModelTrue" })

  };
};

export default connect(mapStoreToProps, mapDispatchTOProps)(NavBar);
