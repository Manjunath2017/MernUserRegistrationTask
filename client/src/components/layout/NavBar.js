import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const NavBar=({auth:{isAuthenticated,loading}, logout})=>{
  
  //authorized user 
  const authLinks=(
    <ul>
      <li>
          <Link to="/profiles">
          Developers
          </Link>
      </li>

      <li>
          <Link to="/dashboard">
            <i className="fas fa-user" /> 
            <span className="hide-sm"> Dashboard </span>
          </Link>
      </li>

      <li>
          <Link onClick={logout} to="/">
            <i className="fas fa-sign-out-alt" /> 
            <span className="hide-sm"> Logout </span>
          </Link>
      </li>
    </ul>
   );

  //Guest User
   const guestLink=(
      <ul>
        <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="register">Register</Link></li>
        <li><Link to="login">Login</Link></li>
      </ul>
   );
    return(
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fas fa-code"></i> DevProfile</Link>
        </h1>
    {!loading &&( <div> {isAuthenticated ? authLinks : guestLink}</div>)}
      </nav>
    )
}
NavBar.propTypes={
  logout:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
};

const mapStateToProps=state=>({
  auth:state.auth
});

export default connect(mapStateToProps, {logout})(NavBar);