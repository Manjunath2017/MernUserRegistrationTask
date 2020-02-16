import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
const [formData, setFormData]=useState({
    email:'',
    password:''
});
const {email, password}=formData;
const onChange=(e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
}
const onSubmit= async e=>{
    e.preventDefault();
    // console.log(formData);
    const newUser={email, password};
    // console.log(newUser);
    const body={...newUser};
    try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const res=await axios.post('/api/auth/', body, config);
        console.log(res.data);

    }catch(error){
        console.error(error.response.data.errors);
    }
}
    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" onSubmit={e=>onSubmit(e) }>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" required name="email" value={email} onChange={e => onChange(e) } />
                    <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" minLength="6"  value={password} onChange={e => onChange(e) }/>
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="login">Sign In</Link>
            </p>

        </Fragment> 
    )
}
export default Login;