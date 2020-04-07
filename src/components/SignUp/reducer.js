import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  DISPATCH_USERNAME,
  DISPATCH_EMAIL,
  DISPATCH_PASSWORD,
  DISPATCH_REPASSWORD,
  DISPATCH_SHIPPING_REGION_ID,
  DISPATCH_INVALID,
} from './action-types';

const initialState = {
  name: '',
  password: '',
  rePassword: '',
  email: '',
  shippingRegionId: null,
  errorMessage: '',
  invalid: false,
  signUpComplete: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, signUpComplete: true };
    case SIGNUP_FAILURE:
      return { ...state, error: action.error };
    case DISPATCH_USERNAME:
      return { ...state, name: action.name };
    case DISPATCH_EMAIL:
      return { ...state, email: action.email };
    case DISPATCH_PASSWORD:
      return { ...state, password: action.password };
    case DISPATCH_REPASSWORD:
      return { ...state, rePassword: action.rePassword };
    case DISPATCH_SHIPPING_REGION_ID:
      return { ...state, shippingRegionId: action.shippingRegionId };
    case DISPATCH_INVALID:
      return { ...state, invalid: true, errorMessage: action.errorMessage };
    default:
      return { ...state };
  }
};

export default reducer;
