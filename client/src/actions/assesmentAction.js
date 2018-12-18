import {
  LOAD_A_TEST_START,
  LOAD_A_TEST_SUCCESS ,
  LOAD_A_TEST_FAILED ,
  SUBMIT_TEST_START,
  SUBMIT_TEST_SUCCESS ,
  SUBMIT_TEST_FAILED 
} from './actionTypes';

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