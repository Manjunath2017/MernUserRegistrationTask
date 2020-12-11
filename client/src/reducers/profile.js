import { 
    GET_PROFILE, 
    GET_PROFILES, 
    PROFILE_ERROR, 
    CLEAR_PROFILE, 
    UPDATE_PROFILE, 
    ACCOUNT_DELETE } from "../actions/types";

const initialState={
    profile:null,
    profiles:[],
    repos:[],
    loading:true,
    error:{}
}

export default (state=initialState, action)=>{
    const {type, payload}=action;

    switch(type){
        case ACCOUNT_DELETE:
            console.log('state: ', state, 'payload:', payload);
        return{
            ...state
        };
        case GET_PROFILE:
        case UPDATE_PROFILE:
        return {
            ...state,
            profile:payload,
            loading:false
        };
        case GET_PROFILES:
        return{
            ...state,
            profile:payload,
            loading:false   
        }
        case PROFILE_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile:null,
                repos:[],
                loading:false
            }
            default:
                return state
    }
}