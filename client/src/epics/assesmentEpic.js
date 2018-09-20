import { ajax } from 'rxjs/observable/dom/ajax';
import { ofType } from 'redux-observable';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of'

import { LOAD_A_TEST_START, SUBMIT_TEST_START } from '../actions/actionTypes';

import {loadAssesmentFulfilled, loadAssesmentFailed, submitAssesmentFulfilled, submitAssesmentFailed } from '../actions/assesmentAction';



export function loadAssesment(action$, state$){
	return action$.pipe(
		ofType(LOAD_A_TEST_START),
		mergeMap(action => {
			let apiUrl = `/api/gettest/${action.payload}`;
			return ajax
				.getJSON(apiUrl)
				.pipe(
					map(response => loadAssesmentFulfilled(response)),
					catchError(error => of(loadAssesmentFailed(error.xhr.response)))
				);
		})
	);
}

export function submitAssesment(action$, state$){
	return action$.pipe(
		ofType(SUBMIT_TEST_START),
		mergeMap(action => {
			let apiUrl = `/api/answer/submit`;
			return ajax
				.post(apiUrl, action.payload, { 'Content-Type': 'application/json' })
				.pipe(
					map(response => submitAssesmentFulfilled(response)),
					catchError(error => of(submitAssesmentFailed(error.xhr.response)))
				);
		})
	);
}