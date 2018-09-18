import { throwError } from "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs/observable/of";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

import { fetchSession, doLogout, clientSoftLogin, doSignin, register } from "./authEpic";
import {
  FETCH_SESSION__START,
  FETCH_SESSION__SUCCESS,
  FETCH_SESSION__FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_START,
  LOGOUT_FAILED,
  SIGNIN_START,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  REGISTRATION_SUCCESS,
  REGISTRATION_START,
  REGISTRATION_FAILED
} from "../actions/actionTypes";
import { toArray } from "rxjs/operators";
jest.mock("rxjs/observable/dom/ajax", () => {
  return {
    ajax: {
      post: jest.fn(),
      getJSON: jest.fn()
    }
  };
});
describe("fetchSession", () => {
  const mockedError = {
    xhr: {
      response: "error occured"
    }
  };
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("fetchSession success", async () => {
    const mockedUser = { id: 1 };
    ajax.getJSON.mockReturnValueOnce(of(mockedUser));

    const inputActions$ = of({ type: FETCH_SESSION__START });
    const expectedOutputAction = {
      type: FETCH_SESSION__SUCCESS,
      payload: mockedUser
    };
    const result = await fetchSession(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(ajax.getJSON).toBeCalledWith("/api/getauth");
    expect(result).toContainEqual(expectedOutputAction);
  });
  it("fetchSession fail", async () => {
    ajax.getJSON.mockImplementation(() => {
      return throwError(mockedError);
    });

    const inputActions$ = of({ type: FETCH_SESSION__START });
    const expectedOutputAction = {
      type: FETCH_SESSION__FAILED,
      payload: mockedError.xhr.response
    };

    const result = await fetchSession(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(result).toContainEqual(expectedOutputAction);
  });
});

describe("doLogout", () => {
  const mockedError = {
    xhr: {
      response: "error occured"
    }
  };
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("doLogout success", async () => {
    const mockedResponse = { message: "success" };
    ajax.getJSON.mockReturnValueOnce(of(mockedResponse));

    const inputActions$ = of({ type: LOGOUT_START });
    const expectedOutputAction = {
      type: LOGOUT_SUCCESS,
      payload: mockedResponse
    };
    const result = await doLogout(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(ajax.getJSON).toBeCalledWith("/api/logout");
    expect(result).toContainEqual(expectedOutputAction);
  });

  it("doLogout fail", async () => {
    ajax.getJSON.mockImplementation(() => {
      return throwError(mockedError);
    });

    const inputActions$ = of({ type: LOGOUT_START });
    const expectedOutputAction = {
      type: LOGOUT_FAILED,
      payload: mockedError.xhr.response
    };

    const result = await doLogout(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(result).toContainEqual(expectedOutputAction);
  });
});

describe("clientSofLogin", () => {
  const mockedError = {
    xhr: {
      response: "error occured"
    }
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("clientSoftLogin success", async () => {
    const mockedResponse = { message: "success" };
    const mockedPayload = {id: 1}
    ajax.post.mockReturnValueOnce(of(mockedResponse));

    const inputActions$ = of({ type: SIGNIN_START, payload: mockedPayload });
    const expectedOutputAction = {
      type: SIGNIN_SUCCESS,
      payload: mockedResponse
    };

    const result = await clientSoftLogin(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(ajax.post.mock.calls).toMatchSnapshot()
    expect(result).toContainEqual(expectedOutputAction);
  });

  it("clientSoftLogin fail", async () => {
    ajax.post.mockImplementation(() => {
      return throwError(mockedError);
    });

    const inputActions$ = of({ type: SIGNIN_START });
    const expectedOutputAction = {
      type: SIGNIN_FAILED,
      payload: mockedError.xhr.response
    };

    const result = await clientSoftLogin(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(result).toContainEqual(expectedOutputAction);
  });
});

describe("doSignin", () => {
  const mockedError = {
    xhr: {
      response: "error occured"
    }
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("doSignin success", async () => {
    const mockedResponse = { message: "success" };
    const mockedPayload = {email: 'mock@mail.com', password: 'password1'}
    ajax.post.mockReturnValueOnce(of(mockedResponse));

    const inputActions$ = of({ type: SIGNIN_START, payload: mockedPayload });
    const expectedOutputAction = {
      type: SIGNIN_SUCCESS,
      payload: mockedResponse
    };

    const result = await doSignin(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(ajax.post.mock.calls).toMatchSnapshot()
    expect(result).toContainEqual(expectedOutputAction);
  });

  it("doSignin fail", async () => {
    ajax.post.mockImplementation(() => {
      return throwError(mockedError);
    });

    const inputActions$ = of({ type: SIGNIN_START });
    const expectedOutputAction = {
      type: SIGNIN_FAILED,
      payload: mockedError.xhr.response
    };

    const result = await doSignin(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(result).toContainEqual(expectedOutputAction);
  });
});


describe("register", () => {
  const mockedError = {
    xhr: {
      response: "error occured"
    }
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("register success", async () => {
    const mockedResponse = { message: "success" };
    const mockedPayload = {email: 'mock@mail.com', password: 'password1'}
    ajax.post.mockReturnValueOnce(of(mockedResponse));

    const inputActions$ = of({ type: REGISTRATION_START, payload: mockedPayload });
    const expectedOutputAction = {
      type: REGISTRATION_SUCCESS,
      payload: mockedResponse
    };

    const result = await register(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(ajax.post.mock.calls).toMatchSnapshot()
    expect(result).toContainEqual(expectedOutputAction);
  });

  it("register fail", async () => {
    ajax.post.mockImplementation(() => {
      return throwError(mockedError);
    });

    const inputActions$ = of({ type: REGISTRATION_START });
    const expectedOutputAction = {
      type: REGISTRATION_FAILED,
      payload: mockedError.xhr.response
    };

    const result = await register(inputActions$, null)
      .pipe(toArray())
      .toPromise();
    expect(result).toContainEqual(expectedOutputAction);
  });
});