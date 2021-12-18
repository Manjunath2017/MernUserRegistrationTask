import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import Routes from './components/Routing/Routes'
import { loadUser } from './actions/auth'

////Redux
import { Provider } from 'react-redux'
import store from './store'
import SetAuthToken from './utils/SetAuthToken'

console.log('localStorage.token line 17 app.js', localStorage.token)
if (localStorage.token) {
  //// it 'll chceck if token is available
  SetAuthToken(localStorage.token) //if true, call and set token
}
const App = () => {
  useEffect(() => {
    //// check form loc
    console.log('useEffect line 21 app.js store', store)
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App
