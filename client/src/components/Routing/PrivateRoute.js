import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) => (
  //   console.log(
  //     'isAuthenticated:',
  //     isAuthenticated,
  //     'loading',
  //     loading
  //   )
  <Route
    {...rest}
    // <Route {...rest +console.log('rest' +{...rest} +'component' +Component, +"props" )}
    render={(props) =>
      //'loading' not included
      !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
    }
  />
)

PrivateRoute.propTypes = {
  auth: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
