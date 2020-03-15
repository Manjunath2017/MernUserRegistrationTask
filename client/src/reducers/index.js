//// 2nd combine all reducers
import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';

export default combineReducers({ //// Conbine all reducers
    alert,
    auth,
    profile
});