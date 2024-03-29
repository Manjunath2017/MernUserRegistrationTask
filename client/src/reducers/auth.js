//// 3rd
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETE,
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'), //// look for an item called token
  isAuthenticated: null,
  loading: true,
  user: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // console.log('state line 14 reducers/auth.js', state, 'action', action);
      localStorage.setItem('token', payload.token) ////Set token
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETE:
      // console.log('LOGOUT, AUTH_ERROR, REGISTER_FAIL, ACCOUNT_DELETE');

      // localStorage.removeItem('token')
      return {
        ...state,
        // token: null,
        // isAuthenticated: false,
        // loading: false,
      }
    default:
      return state
  }
}
