import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {loadUser} from './actions/auth';

////Redux
import {Provider} from 'react-redux';
import store from './store';
import SetAuthToken from './utils/SetAuthToken'; 

if(localStorage.token){
  console.log('localStorage.token line 17 app.js');
  SetAuthToken(localStorage.token);
}
const App=()=>{
  useEffect(()=>{
    console.log('useEffect line 21 app.js');
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
      </Switch>
    </section>
  </Fragment>
  </Router>
  </Provider>
)};

export default App;