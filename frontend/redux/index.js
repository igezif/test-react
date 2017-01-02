import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default function (initialState = {}) {
    return createStore(reducers, initialState, applyMiddleware(thunk));
}