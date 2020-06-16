import axios from 'axios';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
}from './types';
import {setAlert} from './alert';
// Get current users profile
export const getCurrentProfile=()=> async dispatch=>{
    try{
        const res=await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
    }catch(err){
        console.log(err.response);
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        });
    }
}

//Create or update  profile
export const createProfileFn=(formData, history, edit=false) => async dispatch=>{
    try{
        const config={
            headers:{
                'Content-type':'application/json'
            }
        }
        const res=await axios.post('/api/profile', formData, config);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated!' :'Profile Created!', 'success'))
        if(!edit){
            history.push('/dashboard');
        }
    }catch(err){
        const errors=err.response.data.error; //
        console.log(errors)
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger'))); //// Vlaidation is done from backend!
        }

        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

//Add Experience
export const addExperience=( formData, history)=> async dispatch=>{
    try{
        const config={
            header:{
                'Content-Type':'application/json'
            }
        };
        const res=await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });

        dispatch(setAlert('Experience Added', 'success') );
        history.push('/dashboard');
    }catch(err){
        const errors=err.response.data.errors; //
        console.log(errors)
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger'))); //// Vlaidation is done from backend!
        }

        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
     }
}


