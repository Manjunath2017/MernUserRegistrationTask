import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Fragment } from 'react'

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  // console.log(_id, name, avatar, status, company, location, skills)
  return (
    <Fragment>
      <div className='profile bg-light'>
        <img src={avatar} alt='' className='round-img' />
        <div>
          <h2>{name}</h2>
          <p>
            {' '}
            {status} {company && <span> at {company}</span>}
          </p>
          <p className='my-1'> {location && <span> {location}</span>}</p>
          <Link to={`/profile/${_id}`} className='btn btn-primary'>
            View Profile
          </Link>
        </div>
        <ul>
          {/* skills.slice(from(index), to(index)) */}
          {skills.slice(0, 3).map((skill, index) => (
            <li key={index} className='text-primary'>
              <i className='fas fa-check' /> {skill}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}
export default ProfileItem
