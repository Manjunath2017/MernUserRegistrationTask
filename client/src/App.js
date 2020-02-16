import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';


const App=()=> (
  <Router>
  <Fragment>
    <NavBar />
    <Route exact path='/' component={Landing} />
    <section className="container">
      <Switch>
        <Route exact path='/login' component={Login} />    
        <Route exact path='/register' component={Register} />    
      </Switch>
    </section>
  </Fragment>
  </Router>
);

export default App;
