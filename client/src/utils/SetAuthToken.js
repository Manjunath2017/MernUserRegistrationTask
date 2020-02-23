import axios from 'axios';

const SetAuthToken = token =>{
    if(token){
        return axios.defaults.headers.common['auth-token-anyName']=token;
    }
    delete axios.defaults.headers.common['auth-token-anyName'];
}

export default SetAuthToken;
