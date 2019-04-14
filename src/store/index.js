import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import flights from '../components/Flights/Flights.reducers';

import {combineReducers} from 'redux';

const addons = [applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()];

const reducers = combineReducers({
    flights
});


const store = createStore(
    reducers,
    compose(...addons),
);

export default store;