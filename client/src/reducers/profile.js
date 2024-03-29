import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOSE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  // ,
  // ACCOUNT_DELETE
} from '../actions/types'

const initialState = {
  profile: {},
  profiles: [],
  repos: [],
  loading: true,
  error: {},
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    // case ACCOUNT_DELETE:
    //     console.log('state: ', state, 'payload:', payload);
    // return{
    //     ...state
    // };
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        // profile: null,
        loading: false,
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      }
    case GET_REPOSE:
      return {
        ...state,
        repos: payload,
        loading: false,
      }
    default:
      return state
  }
}
