////1st store
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'; ////middleware
import rootReducer from './reducers'; //// we have multiple reducers (auth, alert, etc) and combine it in rootReducer => /reducers/index
const initialState={};
const middleWare=[thunk];
const store=createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;