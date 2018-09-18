import { combineEpics } from 'redux-observable';

// Import epics and combine
import { fetchSession, doLogout, doSignin, register, clientSoftLogin } from './authEpic';
import { loadAllTests, saveTestInDB, loadAssesment, submitAssesment } from './assesmentEpic';


const rootEpic = combineEpics(
	fetchSession,
	doSignin,
	doLogout,
	register,
	clientSoftLogin,
	loadAllTests,
	saveTestInDB,
	loadAssesment, 
	submitAssesment
);

export default rootEpic