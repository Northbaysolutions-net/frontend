import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingView from './components/LandingView';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProductView from './components/ProductView';
import Cart from './components/Cart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={LandingView} />
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/product/:id' exact component={ProductView} />
        <Route path='/cart' exact component={Cart} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
