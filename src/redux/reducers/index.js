import { combineReducers } from 'redux';

import logInStore from '../../components/Login/reducer';
import signUpStore from '../../components/SignUp/reducer';
import singleProductStore from '../../components/ProductView/reducer';
import landingViewStore from '../../components/LandingView/reducer';

const rootReducer = combineReducers({
  logInStore,
  signUpStore,
  singleProductStore,
  landingViewStore,
});

export default rootReducer;
