import axios from 'axios';
import {
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOSE,
    PROFILE_ERROR,
    UPDATE_PROFILE, 
    CLEAR_PROFILE,
    ACCOUNT_DELETE
}from './types';
import {setAlert} from './alert';

// Get current users profile
// /api/profile/me
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


//Get all profiles
// /api/profile
export const getProfiles = () => async dispatch=> {
    dispatch({type:CLEAR_PROFILE});

    try{
        const response = await axios.get(`/api/profile`);

        dispatch({
            type:GET_PROFILES,
            payload:response.data
        });
    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{ msg: err.response.status, status:err.response.status}
        });
    }
};

//Get profile by ID
// /api/profile/${userId}
export const getProfileById= userId => async dispatch =>{
    try{
        const response = await axios.get(`/api/profile/${userId}`);

        dispatch({
            type:GET_PROFILE,
            payload:response.data
        });
    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{ msg: err.response.status, status:err.response.status}
        });
    }
}; 

export const getGithubRepos =userName =>async dispatch =>{
    try{
        const response = await axios.get(`/api/profile/github/${userName}`);

        dispatch({
            type:GET_REPOSE,
            payload:response.data
        });
    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg: err.response.status, status:err.response.status}
        })
    }
}

//Create or update  profile
// /api/profile
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
        dispatch(setAlert(edit ? 'Profile Updated!' :'Profile Created!', 'success'));
        
        var notTrue=true;
        notTrue=!notTrue;
        
        console.log('edit', edit, 'notTrue', notTrue);
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
// /api/profile/experience
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


//Add Education
// /api/profile/school
export const addEducation=( formData, history)=> async dispatch=>{
    try{
        const config={
            header:{
                'Content-Type':'application/json'
            }
        };
        const res=await axios.put('/api/profile/school', formData, config);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });

        dispatch(setAlert('Education Added', 'success') );
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

//Delete Experience
// /api/profile/experience/${id}
export const deleteExperience = id => async dispatch =>{
    if(window.confirm('Are you sure? This cannot be undone!')){
        try {
            // console.log('deleteExperience!', id);
            const res = await axios.delete(`/api/profile/experience/${id}`);
            dispatch({
                type:UPDATE_PROFILE,
                payload:res.data
            })
            dispatch(setAlert('Experience Removed ', 'success'));
        } catch (error) {
            // console.log('error DeleteExperience!'); 
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:error.response.statusText, status:error.response.status}
            })       
        }
    }
}
//Delete Education
// /api/profile/education/${id}
export const deleteEducation = id => async dispatch =>{
    if(window.confirm('Are you sure? This cannot be undone!')){
        try {
            // console.log('deleteExperience!', id);

            // const res = await axios.delete(`/api/education/school/${id}`);
            const res = await axios.delete(`/api/profile/school/${id}`);
            
            console.log('res', res, '\n res data',res.data);
            dispatch({
                type:UPDATE_PROFILE,
                payload:res.data
            })
            dispatch(setAlert('Education Removed ', 'success'));
        } catch (error) {
            // console.log('error DeleteEducation!'); 
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:error.response.statusText, status:error.response.status}
            })       
        }
    }
}

// Delete account and profile
// /api/profile/
export const deleteAccount = () => async dispatch =>{
    if(window.confirm('Are you sure? This cannot be undone! ')){
        try {
            const res = await axios.delete(`/api/profile/`); //Taking ID from token in backend!
            // console.log('res \n \n ', res);
            dispatch({type:CLEAR_PROFILE});
            dispatch({type:ACCOUNT_DELETE});

            dispatch(setAlert('Your account has been permanantly deleted!'));
            //redirect automitacilly to index page from router
        } catch (error) {
            // console.log('error, delete account!');
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:error.response.statusText, status:error.response.status}                
            })
        }
    }
}