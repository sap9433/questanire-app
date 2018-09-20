import {
  LOAD_A_TEST_START,
  LOAD_A_TEST_SUCCESS ,
  LOAD_A_TEST_FAILED ,
  SUBMIT_TEST_START,
  SUBMIT_TEST_SUCCESS ,
  SUBMIT_TEST_FAILED 
} from '../actions/actionTypes';

let initialState = {
  testlist: [],
  isLoading: false,
  saveDetails: null,
  errors: [],
  testDetails: null,
};
export function assesments(state = initialState, action) {

  switch (action.type) {
    case LOAD_A_TEST_START:
      return Object.assign({}, state, {
        testLoading: true
      });
    case LOAD_A_TEST_SUCCESS:
      return Object.assign({}, state, {
        testLoading: false,
        testDetails: action.payload
      });
    case LOAD_A_TEST_FAILED:
      return Object.assign({}, state, {
        testLoading: false,
        testLoadErrors: action.payload
      });
      case SUBMIT_TEST_START:
      return Object.assign({}, state, {
        answerSubmitting: true
      });
    case SUBMIT_TEST_SUCCESS:
      return Object.assign({}, state, {
        answerSubmitting: false,
        answerSubmission: action.payload.response
      });
    case SUBMIT_TEST_FAILED:
      return Object.assign({}, state, {
        answerSubmitting: false,
        answerSubmissionErrors: action.payload.response
      });
    default:
      return state;
  }
}
