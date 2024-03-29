import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGithubRepos } from '../../actions/profile'

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  console.log(username)
  useEffect(() => {
    getGithubRepos(username)
  }, [username])
  // console.log('username', username, '\n repos', repos.length)

  return (
    <Fragment>
      <div className='profile-github'>
        <h2 className='text-primary my-1'>Github Repos</h2>
        {repos === null || repos.length <= 0 ? (
          <h4>No project</h4>
        ) : (
          repos.map((repo) => (
            <div key={repo._id} className='repo bg-white p-1 my-1'>
              <div>
                <h4>
                  {' '}
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {repo.name}
                  </a>
                </h4>
              </div>
            </div>
          ))
        )}
      </div>
    </Fragment>
  )
}

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
})
export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub)
