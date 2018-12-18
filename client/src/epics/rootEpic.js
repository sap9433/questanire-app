import { combineEpics } from 'redux-observable';

// Import epics and combine
import { fetchSession, doLogout, doSignin, clientSoftLogin } from './authEpic';
import { loadAssesment, submitAssesment } from './assesmentEpic';


const rootEpic = combineEpics(
	fetchSession,
	doSignin,
	doLogout,
	clientSoftLogin,
	loadAssesment, 
	submitAssesment
);

export default rootEpic