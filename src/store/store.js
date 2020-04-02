import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from './Reduxs/rootReducer';
import rootSaga from "./Sagas/index";

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


const store = createStore(
  rootReducer,
  applyMiddleware(logAction, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

export default store;