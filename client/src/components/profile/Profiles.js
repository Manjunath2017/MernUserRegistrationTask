import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles} from '../../actions/profile';

const Profiles = ({getProfiles, profile: { profiles, loading } }) =>{
  useEffect(() =>{
     getProfiles();
     console.log('getProfiles');
  }, [getProfiles]);
  console.log('profile', getProfiles);
  return (
  <Fragment>
     {loading ? (<Spinner />):(<Fragment> 
         <h1 className="large text-primary">Developers</h1>
         <p className="lead">
           <i className="fab fa-connectdevelop"></i> Browse and connect with developers
         </p>
         <div className="profiles">
           {profiles?
          (
            profiles.map(profile =>
              ( 
                // <ProfileItem key={profile._id} profile={profile} />
              
              <ul><li> <p>{profile}</p> </li></ul>
              )
            )
          ) : ( <h4>No profile found...</h4> )}
        </div>
      </Fragment>)}
  </Fragment>)
}

Profiles.prototype={
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Profiles);
