import {REGISTER_SUCCESS, REGISTER_FAIL} from '../actions/types';

const initialState={
    token:localStorage.getItem('token'), 
    isAuthenticated:null,
    loading:true,
    user:null
}

export default function(state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case REGISTER_SUCCESS:
            // console.log('state line 14 reducers/auth.js', state, 'action', action);
            localStorage.setItem('token', payload.token); ////Set token
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
            case REGISTER_FAIL:
                localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            }
            default:
                return state;
        }
}