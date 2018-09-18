import { ajax } from 'rxjs/observable/dom/ajax';
import { ofType } from 'redux-observable';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of'

import { FETCH_SESSION__START, LOGOUT_START, SIGNIN_START, REGISTRATION_START } from '../actions/actionTypes';

import {fetchSessionFulfilled, fetchSessionFailed, logoutFulfilled, logoutFailed, signinFulfilled, signinFailed, registerFulfilled, registerFailed } from '../actions/authAction';

export function fetchSession(action$, state$){
	return action$.pipe(
		ofType(FETCH_SESSION__START),
		mergeMap(action => {
			let apiUrl = `/api/getauth`;
			return ajax
				.getJSON(apiUrl)
				.pipe(
					map(response => fetchSessionFulfilled(response)),
					catchError(error => of(fetchSessionFailed(error.xhr.response)))
				);
		})
	);
}

export function doLogout(action$, state$){
	return action$.pipe(
		ofType(LOGOUT_START),
		mergeMap(action => {
			let apiUrl = `/api/logout`;
			return ajax
				.getJSON(apiUrl)
				.pipe(
					map(response => logoutFulfilled(response)),
					catchError(error => of(logoutFailed(error.xhr.response)))
				);
		})
	);
}

export function clientSoftLogin(action$, state$){
	return action$.pipe(
		ofType(SIGNIN_START),
		mergeMap(action => {
			let apiUrl = `/api/candidatelogin`;
			return ajax
				.post(apiUrl, action.payload, { 'Content-Type': 'application/json' })
				.pipe(
					map(response => signinFulfilled(response)),
					catchError(error => of(signinFailed(error.xhr.response)))
				);
		})
	);
}

export function doSignin(action$, state$){
	return action$.pipe(
		ofType(SIGNIN_START),
		mergeMap(action => {
			let apiUrl = `/api/signin`;
			return ajax
				.post(apiUrl, action.payload, { 'Content-Type': 'application/json' })
				.pipe(
					map(response => signinFulfilled(response)),
					catchError(error => of(signinFailed(error.xhr.response)))
				);
		})
	);
}

export function register(action$, state$){
	return action$.pipe(
		ofType(REGISTRATION_START),
		mergeMap(action => {
			let apiUrl = `/api/register`;
			return ajax
				.post(apiUrl, action.payload, { 'Content-Type': 'application/json' })
				.pipe(
					map(response => registerFulfilled(response)),
					catchError(error => of(registerFailed(error.xhr.response)))
				);
		})
	);
}
