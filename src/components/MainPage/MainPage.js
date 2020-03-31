import React, { Component } from 'react';
import ProductList from '../ProductsList/ProductsList.js';
import NavBar from '../NavBar/NavBar';
import SubBar from '../SubBar/SubBar';
import Footer from '../Footer/Footer';
import CheckOut from '../CheckOut/CheckOut';
import { connect } from 'react-redux';

import ProductDetails from '../ProductDetails/ProductDetails';

class MainPage extends Component {
  componentDidMount() {
    console.log('mount it!');

    localStorage.setItem('TotalAmmount', 0);
    localStorage.setItem('Products', []);
  }

  render() {
    return (
      <div>
        <NavBar />
        {this.props.ProductDetails ? <ProductDetails /> : ''}
        {this.props.ProductList ? (
          <div>
            <SubBar />
            <ProductList />
          </div>
        ) : (
          ' '
        )}
        {this.props.CheckOut ? <CheckOut /> : ''}

        <Footer />
      </div>
    );
  }
}
const mapStoreToProps = store => {
  return {
    ProductList: store.rMainPage.ProductList,
    ProductDetails: store.rMainPage.ProductDetails,
    CheckOut: store.rMainPage.CheckOut
  };
};

export default connect(mapStoreToProps, null)(MainPage);
