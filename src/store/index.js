import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import flights from '../components/Flights/Flights.reducers';
import search from '../components/Search/Search.reducers';

import {combineReducers} from 'redux';

const addons = [applyMiddleware(thunk)
];

const reducers = combineReducers({
    flights,
    search
});


const store = createStore(
    reducers,
    compose(...addons),
);

export default store;