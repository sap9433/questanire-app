import {
  LOADALLTESTS_START,
  LOADALLTESTS_SUCCESS,
  LOADALLTESTS_FAILED,
  SAVE_TEST_START,
  SAVE_TEST_SUCCESS,
  SAVE_TEST_FAILED,
  LOAD_A_TEST_START,
  LOAD_A_TEST_SUCCESS ,
  LOAD_A_TEST_FAILED ,
  SUBMIT_TEST_START,
  SUBMIT_TEST_SUCCESS ,
  SUBMIT_TEST_FAILED 
} from './actionTypes'

export function loadAllTests(payload) {
  return {
    type: LOADALLTESTS_START,
    payload
  };
}

// on successful
export function loadAllTestsFulfilled(payload) {
  return {
    type: LOADALLTESTS_SUCCESS,
    payload
  };
}

// on fail
export function loadAllTestsFailed(payload) {
  return {
    type: LOADALLTESTS_FAILED,
    payload
  };
}

export function saveTestInDB(payload) {
  return {
    type: SAVE_TEST_START,
    payload
  };
}

// on successful
export function saveTestInDBFulfilled(payload) {
  return {
    type: SAVE_TEST_SUCCESS,
    payload
  };
}

// on fail
export function saveTestInDBFailed(payload) {
  return {
    type: SAVE_TEST_FAILED,
    payload
  };
}

export function loadAssesment(payload) {
  return {
    type: LOAD_A_TEST_START,
    payload
  };
}

// on successful
export function loadAssesmentFulfilled(payload) {
  return {
    type: LOAD_A_TEST_SUCCESS,
    payload
  };
}

// on fail
export function loadAssesmentFailed(payload) {
  return {
    type: LOAD_A_TEST_FAILED,
    payload
  };
}

export function submitAssesment(payload) {
  return {
    type: SUBMIT_TEST_START,
    payload
  };
}

// on successful
export function submitAssesmentFulfilled(payload) {
  return {
    type: SUBMIT_TEST_SUCCESS,
    payload
  };
}

// on fail
export function submitAssesmentFailed(payload) {
  return {
    type: SUBMIT_TEST_FAILED,
    payload
  };
}