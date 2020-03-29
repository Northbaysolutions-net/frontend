import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header.js';
import ProductList from './Components/ProductList/ProductList';
import { Switch, Route } from 'react-router-dom';
import Menu from './Components/Menu/Menu';
import CartDialog from './Components/CartDialog/CartDialog';
import Details from './Components/Details/Details';
import Order from './Components/Order/Order';
import Login from './Components/Login/Login';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Footer from './Components/Footer/Footer';
import Signup from './Components/Signup/Signup';
import Checkout from './Components/Checkout/Checkout';
import PostOrderPlacingPopup from './Components/PostOrderPlacing/PostOrderPlacing';

require('dotenv').config();

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <div className='app-body'>
          <Menu />
          <div className='content'>
            <CartDialog />
            <PostOrderPlacingPopup />
            <Switch>
              <Route path='/' exact component={ProductList} />
              <Route path='/details/:id' component={Details} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
              <ProtectedRoute path='/order' component={Order} />
              <ProtectedRoute path='/checkout' component={Checkout} />
              <Route
                component={() => (
                  <div style={{ padding: 20 }}>Page not found</div>
                )}
              />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
