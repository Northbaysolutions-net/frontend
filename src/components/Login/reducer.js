import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  DISPATCH_USERNAME,
  DISPATCH_PASSWORD,
} from './action-types';

const initialState = {
  name: '',
  pass: '',
  unauthorized: true,
  referred: false,
  token: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.data.token,
        unauthorized: false,
        referred: true,
      };
    case LOGIN_FAILURE:
      return { ...state, unauthorized: true, error: action.error };
    case DISPATCH_USERNAME:
      return { ...state, name: action.name };
    case DISPATCH_PASSWORD:
      return { ...state, password: action.password };
    default:
      return { ...state };
  }
};

export default reducer;
