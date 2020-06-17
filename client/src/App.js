import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {loadUser} from './actions/auth';
import Dashboard from './components/Dashboard/dashboard';
import PrivateRouting from './components/Routing/PrivateRouting';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import addExperience from './components/profile-forms/AddExperience';
import addEducation from './components/profile-forms/AddEducation';



////Redux
import {Provider} from 'react-redux';
import store from './store';
import SetAuthToken from './utils/SetAuthToken'; 


console.log('localStorage.token line 17 app.js', localStorage.token);
if(localStorage.token){  //// it 'll chceck if token is available
  SetAuthToken(localStorage.token); //if true, call n set token 
}
const App=()=>{
  useEffect(()=>{  //// check form loc
    console.log('useEffect line 21 app.js store', store);
    store.dispatch(loadUser()); 
  },[]);
 
  return(
  <Provider store={store}>
  <Router>
  <Fragment>
    <NavBar />
    <Route exact path='/' component={Landing} />
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />    
        <Route exact path='/register' component={Register} />    
        <PrivateRouting exact path='/dashboard' component={Dashboard} />
        <PrivateRouting exact path='/create-profile' component={CreateProfile} />
        <PrivateRouting exact path='/edit-profile' component={EditProfile} />

        <PrivateRouting exact path='/add-experience' component={addExperience} />    
        <PrivateRouting exact path='/add-education' component={addEducation} />    



      </Switch>
    </section>
  </Fragment>
  </Router>
  </Provider>
)};
export default App;