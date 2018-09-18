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
    case LOADALLTESTS_START:
      return Object.assign({}, state, {
        isLoading: true
      });
    case LOADALLTESTS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        testlist: action.payload
      });
    case LOADALLTESTS_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.payload
      });
    case SAVE_TEST_START:
      return Object.assign({}, state, {
        isSaving: true
      });
    case SAVE_TEST_SUCCESS:
      return Object.assign({}, state, {
        isSaving: false,
        saveDetails: action.payload.response
      });
    case SAVE_TEST_FAILED:
      return Object.assign({}, state, {
        isSaving: false,
        saveErrors: action.payload.response
      });
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
