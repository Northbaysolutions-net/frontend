import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";

import reducerSignInSignUp from "./components/SignIn/Reducer/signInSignUpReducer";
//import reducerCart from "./store/reducers/reducerCart";
import reducerProductsList from "./components/ProductsList/Reducer/productsListReducer";
import reducerSubBar from "./components/SubBar/Reducer/subBarReducer";
import reducerNavBar from "./components/NavBar/Reducer/navBarReducer";
import reducerMainPage from "./components/MainPage/Reducer/mainPageReducer";
import reducerPopUp from "./components/PopUp/Reducer/popUpReducer";
import reducerModel from "./components/Model/Reducer/modelReducer";
import reducerCheckOut from "./components/CheckOut/Reducer/checkOutReducer";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./store/Sagas/index";

const sagaMiddleware = new createSagaMiddleware();

const logAction = store => {
  return next => {
    return action => {
      const result = next(action);
      console.log(`Action Dispach : ${JSON.stringify(result)}`);
      return result;
    };
  };
};

const rootReducer = combineReducers({
  rSignInSignUp: reducerSignInSignUp,
 // rCart: reducerCart,
  rProductsList: reducerProductsList,
  rSubBar: reducerSubBar,
  rNavBar: reducerNavBar,
  rMainPage : reducerMainPage,
  rPopUp : reducerPopUp,
  rModel : reducerModel,
  rCheckOut : reducerCheckOut
});

const store = createStore(
  rootReducer,
  applyMiddleware(logAction, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
