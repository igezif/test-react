import { combineReducers } from 'redux';

import {
    getRegime,
    getUsers,
    saveRegime,
    saveUser,
    saveCurrentUser,
} from '../storage';

import {
    SET_REGIME,
    CREATE,
    READ,
    UPDATE,
    DELETE,
    REFRESH
} from './actions';

export const initialStateCurrentUser = {
    id: '',
    fio: '',
    date: {
        day: '',
        month: '',
        year: ''
    },
    address: '',
    city: '',
    phone: ''
};

const getInitialStateRegime = () => {
    const regime = getRegime();
    return regime ? regime : READ;
};

const regime = (state = getInitialStateRegime(), action) => {

    switch (action.type) {

        case SET_REGIME:
            saveRegime(action.payload);
            return action.payload;

        default:
            return state

    }

};

const getInitialStateUsers = () => {
    const result = {};
    const users = getUsers();
    result.currentUser = users.currentUser ? users.currentUser : Object.assign({}, initialStateCurrentUser);
    result.list = users.list ? users.list : [];
    return result;
};

const getId = (list) => list.length ? `${+list[list.length - 1].id + 1}` : '1';

const users = (state = getInitialStateUsers(), action) => {

    switch (action.type) {

        case CREATE:
            state.list = [
                ...state.list,
                {
                    id: getId(state.list),
                    fio: action.payload.fio,
                    date: action.payload.date,
                    address: action.payload.address,
                    city: action.payload.city,
                    phone: action.payload.phone
                }
            ];
            saveUser(state.list);
            return state;

        case READ:
            state.currentUser = state.list.filter(user => user.id === action.payload)[0];
            saveCurrentUser(state.currentUser);
            return state;

        case UPDATE:
            state.list = state.list.map(user => user.id === action.payload.id ? Object.assign({}, user, action.payload) : user);
            saveUser(state.list);
            return state;

        case DELETE:
            state.list = state.list.filter(user => user.id !== action.payload);
            saveUser(state.list);
            return state;

        case REFRESH:
            state.currentUser = Object.assign({}, initialStateCurrentUser);
            saveCurrentUser(state.currentUser);
            return state;

        default:
            return state;

    }

};

export default combineReducers({
    regime: regime,
    users: users
});