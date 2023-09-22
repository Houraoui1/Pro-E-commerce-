import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddeleware from "redux-saga";
import Login from "../page/Login";
import loginRedu from "./reducer/Reducer/";
import { watcherSaga } from "./sagas/SagaRoot";

const reducer = combineReducers({
  login: Login,
  LoginReducer: loginRedu,
});

const sagamiddeleware = createSagaMiddeleware();
const middleware = [sagamiddeleware];
const store = createStore(reducer, {}, applyMiddleware(...middleware));
sagamiddeleware.run(watcherSaga)

export default store;
