import React from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    // social: { youtube },

    social: { facebook, twitter, youtube, linkedin, instagram },
    skills,
    user: { name, avatar },
  },
}) => {
  return (
    <Fragment>
      {/* <p> social{facebook + twitter + youtube + skills}</p> */}
      <div className='profile-top bg-primary p-2'>
        <img className='round-img my-1' src={avatar} alt='' />
        <h1 className='large'>{name}</h1>
        <p className='lead'>
          {status} {company && <span> at {company}</span>}
        </p>
        <p>{location && <span>{location} </span>}</p>
        <div className='icons my-1'>
          {website && (
            <a href={website} target='_blank' rel='noopener noreferrer'>
              <i className='fas fa-globe fa-2x'></i>
            </a>
          )}
          {twitter && (
            <a href={twitter} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-twitter fa-2x'></i>
            </a>
          )}
          {facebook && (
            <a href={facebook} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-facebook fa-2x'></i>
            </a>
          )}
          {youtube && (
            <a href={youtube} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-youtube fa-2x'></i>
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-linkedin fa-2x'></i>
            </a>
          )}
          {instagram && (
            <a href={instagram} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-instagram fa-2x'></i>
            </a>
          )}
        </div>
      </div>
    </Fragment>
  )
}
ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileTop
