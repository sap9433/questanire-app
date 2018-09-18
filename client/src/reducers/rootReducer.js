import { combineReducers } from 'redux';
import { authDetails as auth} from './authReducer';
import { assesments } from './assesmentReducer';

const rootReducer = combineReducers({
	auth,
	assesments
});

export default rootReducer;