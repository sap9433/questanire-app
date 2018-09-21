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
  SOFT_SIGNIN_START,
  SOFT_SIGNIN_SUCCESS,
  SOFT_SIGNIN_FAILED
} from './actionTypes'

export function fetchSession(payload) {
  return {
    type: FETCH_SESSION__START,
    payload
  };
}

// on successful
export function fetchSessionFulfilled(payload) {
  return {
    type: FETCH_SESSION__SUCCESS,
    payload
  };
}

// on fail
export function fetchSessionFailed(payload) {
  return {
    type: FETCH_SESSION__FAILED,
    payload
  };
}

export function doLogout(payload) {
  return {
    type: LOGOUT_START,
    payload
  };
}

// on successful
export function logoutFulfilled(payload) {
  return {
    type: LOGOUT_SUCCESS,
    payload
  };
}

// on fail
export function logoutFailed(payload) {
  return {
    type: LOGOUT_FAILED,
    payload
  };
}

//It doesn't have fulfilled or failure method as we are re using signingfulfilled and cancelled methods
export function doSignin(payload) {
  return {
    type: SIGNIN_START,
    payload
  };
}

// on successful
export function signinFulfilled(payload) {
  return {
    type: SIGNIN_SUCCESS,
    payload
  };
}

// on fail
export function signinFailed(payload) {
  return {
    type: SIGNIN_FAILED,
    payload
  };
}

export function clientSoftLogin(payload) {
  return {
    type: SOFT_SIGNIN_START,
    payload
  };
}

// on successful
export function softLoginFulfilled(payload) {
  return {
    type: SOFT_SIGNIN_SUCCESS,
    payload
  };
}

// on fail
export function softLoginFailed(payload) {
  return {
    type: SOFT_SIGNIN_FAILED,
    payload
  };
}
