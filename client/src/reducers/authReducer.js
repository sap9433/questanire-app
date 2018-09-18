import {
  FETCH_SESSION__START,
  FETCH_SESSION__SUCCESS,
  FETCH_SESSION__FAILED,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  SIGNIN_START,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED
} from '../actions/actionTypes';

let initialState = {
  user: null,
  isLoading: false,
  errors: [],
  isRegistering: false,
};

export function authDetails(state = initialState, action) {

  switch (action.type) {
    case FETCH_SESSION__START:
      return Object.assign({}, state, {
        isLoading: true
      });

    case FETCH_SESSION__SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        user: (action.payload || {}).error ? null : action.payload,
        status: (action.payload || {}).error ? action.payload : null
      });

    case FETCH_SESSION__FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.payload
      });

    case LOGOUT_START:
      return Object.assign({}, state, {
        isLoading: true
      });

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        user: null
      });

    case LOGOUT_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        errors: {message: 'Could not log out'}
      });

    case SIGNIN_START:
      return Object.assign({}, state, {
        isLoading: true
      });

    case SIGNIN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        user: (action.payload.response || {}).error ? null : action.payload.response,
        status: action.payload.response
      });

    case SIGNIN_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.payload,
        user: null
      });

    case REGISTRATION_START:
      return Object.assign({}, state, {
        isRegistering: true
      });

    case REGISTRATION_SUCCESS:
      return Object.assign({}, state, {
        isRegistering: false,
        status: action.payload.response
      });

    case REGISTRATION_FAILED:
      return Object.assign({}, state, {
        isRegistering: false,
        status: action.payload.response,
      });

    default:
      return state;
  }
}
