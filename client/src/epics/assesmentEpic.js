import { ajax } from 'rxjs/observable/dom/ajax';
import { ofType } from 'redux-observable';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of'

import { LOADALLTESTS_START, SAVE_TEST_START, LOAD_A_TEST_START, SUBMIT_TEST_START } from '../actions/actionTypes';

import {loadAllTestsFulfilled, loadAllTestsFailed, saveTestInDBFulfilled, saveTestInDBFailed,
loadAssesmentFulfilled, loadAssesmentFailed, submitAssesmentFulfilled, submitAssesmentFailed } from '../actions/assesmentAction';

export function loadAllTests(action$, state$){
	return action$.pipe(
		ofType(LOADALLTESTS_START),
		mergeMap(action => {
			let apiUrl = '/api/getalltests';
			return ajax
				.getJSON(apiUrl)
				.pipe(
					map(response => loadAllTestsFulfilled(response)),
					catchError(error => of(loadAllTestsFailed(error.xhr.response)))
				);
		})
	);
}

export function saveTestInDB(action$, state$){
	return action$.pipe(
		ofType(SAVE_TEST_START),
		mergeMap(action => {
			let apiUrl = `/api/createtest/new`;
			return ajax
				.post(apiUrl, action.payload, { 'Content-Type': 'application/json' })
				.pipe(
					map(response => saveTestInDBFulfilled(response)),
					catchError(error => of(saveTestInDBFailed(error.xhr.response)))
				);
		})
	);
}

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