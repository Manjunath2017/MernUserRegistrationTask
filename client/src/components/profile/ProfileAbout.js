import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  console.log(bio, skills, name)
  return (
    <div className='profile-about bg-light p-2'>
      <h2 className='text-primary'>{name.trim().split(' ')[3]}s Bio</h2>
      <p>{bio}</p>
      <div className='line'></div>
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {skills.map((skill, index) => (
          <div className='p-1' key={index}>
            <i className='fa fa-check'></i> {skill}
          </div>
        ))}
        <div className='p-1'>
          <i className='fa fa-check'></i> CSS
        </div>
        <div className='p-1'>
          <i className='fa fa-check'></i> JavaScript
        </div>
        <div className='p-1'>
          <i className='fa fa-check'></i> Python
        </div>
        <div className='p-1'>
          <i className='fa fa-check'></i> C#
        </div>
      </div>
    </div>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileAbout
