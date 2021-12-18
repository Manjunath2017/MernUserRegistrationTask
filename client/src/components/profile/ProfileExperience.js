import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  // console.log(company, title, location, current, to, from, description)
  return (
    <Fragment>
      <h3 className='text-dark'>{company}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -
        {!to ? ' now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Location: </strong> {location}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </Fragment>
  )
}

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
}

export default ProfileExperience
