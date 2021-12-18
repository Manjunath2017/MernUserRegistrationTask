import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Alert from '../layout/Alert'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Dashboard from '../Dashboard/dashboard'
import PrivateRoute from '../Routing/PrivateRoute'
import CreateProfile from '../profile-forms/CreateProfile'
import EditProfile from '../profile-forms/EditProfile'
import AddExperience from '../profile-forms/AddExperience'
import AddEducation from '../profile-forms/AddEducation'
import Profiles from '../profiles/Profiles'

import Profile from '../profile/Profile'
import Test from '../profile-forms/Test'
import NotFound from '../layout/NotFound'

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:_id' component={Profile} />

        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />

        <PrivateRoute exact path='/test' component={Test} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}
export default Routes
