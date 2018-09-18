import { throwError } from "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs/observable/of";
import { toArray } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

import { loadAllTests, loadAssesment, saveTestInDB, submitAssesment} from './assesmentEpic' 
import { LOADALLTESTS_START, LOADALLTESTS_SUCCESS, LOADALLTESTS_FAILED, LOAD_A_TEST_START, LOAD_A_TEST_SUCCESS, LOAD_A_TEST_FAILED, SAVE_TEST_START, SAVE_TEST_FAILED, SAVE_TEST_SUCCESS, SUBMIT_TEST_START, SUBMIT_TEST_SUCCESS, SUBMIT_TEST_FAILED } from "../actions/actionTypes";

jest.mock("rxjs/observable/dom/ajax", () => {
  return {
    ajax: {
      get: jest.fn(),
      post: jest.fn(),
      getJSON: jest.fn()
    }
  };
});

beforeEach(() => {
    jest.resetAllMocks()
});

describe('loadAllTests', () => {
  const mockedError = {
    xhr: {
      response: "error occured"
    }
  };
  test('loadAllTests Success', async () => {
    const mockedTests = { _id: 1 }
    ajax.getJSON.mockReturnValueOnce(of(mockedTests))
    const inputActions$ = of({type: LOADALLTESTS_START});
    const expectedOutActions = {type: LOADALLTESTS_SUCCESS, payload: mockedTests }

    const result = await loadAllTests(inputActions$, null).pipe(toArray()).toPromise()
    expect(result).toContainEqual(expectedOutActions)
  });

  test('loadAllTests Failure', async () => {
    ajax.getJSON.mockImplementation(() => {
      return throwError(mockedError);
    });

    const inputActions$ = of({ type: LOADALLTESTS_START });
    const expectedOutputAction = {
      type: LOADALLTESTS_FAILED,
      payload: mockedError.xhr.response
    };

    const result = await loadAllTests(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(result).toContainEqual(expectedOutputAction);
  });
})


describe('loadAssesment', () => {
  const mockedError = {
    xhr: {
      response: "error occured"
    }
  };
  test('loadAssesment Success', async () => {
    const mockedTests = { _id: 1 }
    ajax.getJSON.mockReturnValueOnce(of(mockedTests))
    const inputActions$ = of({type: LOAD_A_TEST_START});
    const expectedOutActions = {type: LOAD_A_TEST_SUCCESS, payload: mockedTests }

    const result = await loadAssesment(inputActions$, null).pipe(toArray()).toPromise()
    expect(result).toContainEqual(expectedOutActions)
  });

  test('loadAssesment Failure', async () => {
    ajax.getJSON.mockImplementation(() => {
      return throwError(mockedError);
    });

    const inputActions$ = of({ type: LOAD_A_TEST_START });
    const expectedOutputAction = {
      type: LOAD_A_TEST_FAILED,
      payload: mockedError.xhr.response
    };

    const result = await loadAssesment(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(result).toContainEqual(expectedOutputAction);
  });
});

describe('saveTestInDB', () => {
  const mockedError = {
    xhr: {
      response: "error occured"
    }
  };
  test('saveTestInDB Success', async () => {
    const mockedTests = { _id: 1 }
    const mockedPayload = {_id: 1, details: {role: 1 }}

    ajax.post.mockReturnValueOnce(of(mockedTests))

    const inputActions$ = of({type: SAVE_TEST_START, payload: mockedPayload});
    const expectedOutActions = {type: SAVE_TEST_SUCCESS, payload: mockedTests }

    const result = await saveTestInDB(inputActions$, null).pipe(toArray()).toPromise()

    expect(ajax.post.mock.calls[0][1]).toEqual(mockedPayload)
    expect(result).toContainEqual(expectedOutActions)
  });

  test('saveTestInDB Failure', async () => {

    const mockedPayload = {_id: 1, details: {role: 1 }}
    ajax.post.mockImplementation(() => {
      return throwError(mockedError);
    });

    const inputActions$ = of({ type: SAVE_TEST_START, mockedPayload});
    const expectedOutputAction = {
      type: SAVE_TEST_FAILED,
      payload: mockedError.xhr.response
    };

    const result = await saveTestInDB(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(result).toContainEqual(expectedOutputAction);
  });
})

describe('saveTestInDB', () => {
  const mockedError = {
    xhr: {
      response: "error occured"
    }
  };
  test('saveTestInDB Success', async () => {
    const mockedTests = { _id: 1 }
    const mockedPayload = {_id: 1, details: {role: 1 }}

    ajax.post.mockReturnValueOnce(of(mockedTests))

    const inputActions$ = of({type: SAVE_TEST_START, payload: mockedPayload});
    const expectedOutActions = {type: SAVE_TEST_SUCCESS, payload: mockedTests }

    const result = await saveTestInDB(inputActions$, null).pipe(toArray()).toPromise()

    expect(ajax.post.mock.calls[0][1]).toEqual(mockedPayload)
    expect(result).toContainEqual(expectedOutActions)
  });

  test('saveTestInDB Failure', async () => {

    const mockedPayload = {_id: 1, details: {role: 1 }}
    ajax.post.mockImplementation(() => {
      return throwError(mockedError);
    });

    const inputActions$ = of({ type: SAVE_TEST_START, mockedPayload});
    const expectedOutputAction = {
      type: SAVE_TEST_FAILED,
      payload: mockedError.xhr.response
    };

    const result = await saveTestInDB(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(result).toContainEqual(expectedOutputAction);
  });
})


describe('submitAssesment', () => {
  const mockedError = {
    xhr: {
      response: "error occured"
    }
  };
  test('submitAssesment Success', async () => {
    const mockedAssesment = { _id: 1 }
    const mockedPayload = {_id: 1, details: {role: 1 }}

    ajax.post.mockReturnValueOnce(of(mockedAssesment))

    const inputActions$ = of({type: SUBMIT_TEST_START, payload: mockedPayload});
    const expectedOutActions = {type: SUBMIT_TEST_SUCCESS, payload: mockedAssesment }

    const result = await submitAssesment(inputActions$, null).pipe(toArray()).toPromise()

    expect(ajax.post.mock.calls[0][1]).toEqual(mockedPayload)
    expect(result).toContainEqual(expectedOutActions)
  });

  test('submitAssesment Failure', async () => {

    const mockedPayload = {_id: 1, details: {role: 1 }}
    ajax.post.mockImplementation(() => {
      return throwError(mockedError);
    });

    const inputActions$ = of({ type: SUBMIT_TEST_START, mockedPayload});
    const expectedOutputAction = {
      type: SUBMIT_TEST_FAILED,
      payload: mockedError.xhr.response
    };

    const result = await submitAssesment(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(result).toContainEqual(expectedOutputAction);
  });
})

