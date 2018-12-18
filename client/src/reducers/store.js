import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

// import root epics/reducer
import rootEpic from '../epics/rootEpic';
import rootReducer from './rootReducer';

// export `history` to use in index.js, we using `createBrowserHistory`
export const history = createHistory();

const epicMiddleware = createEpicMiddleware();

// Build the middleware for intercepting and dispatching navigation actions
const appRouterMiddleware = routerMiddleware(history);

const store = createStore(
	rootReducer,
	applyMiddleware(epicMiddleware),
	applyMiddleware(appRouterMiddleware)
);
epicMiddleware.run(rootEpic);

export default store;
