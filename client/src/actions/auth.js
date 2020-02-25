import axios from 'axios';
//// 2nd
import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from './types';
import {setAlert} from './alert';
import SetAuthToken from '../utils/SetAuthToken';

//// Load User -> called FN from /App.js-->router
export const loadUser=()=> async dispatch=>{
    console.log(localStorage.token, 'localstorage token auth actions/.js line 14')
    if(localStorage.token){
        SetAuthToken(localStorage.token);
    }
    try{
        const result=await axios.get('/api/auth');
        console.log(result, 'result action/auth.js');
        dispatch({ //// call dispatcher an pass data, /type.js 'll set token
            type:USER_LOADED,
            payload:result.data
        });
    }catch(err){
        console.log('result fail line 26 action/auth.js',err);
        dispatch({
            type:AUTH_ERROR
        });
    }
}

//// Register user
export const register=({name, email, password})=> async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    };
    const body=JSON.stringify({name, email, password});

    try{
        const res=await axios.post('/api/users', body, config);
      
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });
        dispatch(loadUser());
    }catch(err){
        const errors=err.response.data.errors;
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type:REGISTER_FAIL
        });
    }
}

//// Login User
export const login=(email, password)=> async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    };
    const body=JSON.stringify({ email, password});

    try{
        const res=await axios.post('/api/auth', body, config);
      
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });
        dispatch(loadUser());
    }catch(err){
        const errors=err.response.data.errors;
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type:LOGIN_FAIL
        });
    }
}

//// Logout
export const logout =()=>dispatch=>{
    dispatch({
        type:LOGOUT
    });
};