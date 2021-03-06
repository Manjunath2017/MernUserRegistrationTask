import axios from 'axios';

const SetAuthToken = token =>{
    if(token){
        axios.defaults.headers.common['auth-token-anyName']=token;
    }else{
        delete axios.defaults.headers.common['auth-token-anyName'];
    }
}

export default SetAuthToken;
