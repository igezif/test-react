const REGIME = 'regime';
const LIST = 'list';
const CURRENT_USER = 'currentUser';

export const getRegime = () => {
    return localStorage.getItem(REGIME);
};

export const saveRegime = regime => {
    localStorage.setItem(REGIME, regime);
};

export const getUsers = () => {
    const result = {};
    const currentUser = localStorage.getItem(CURRENT_USER);
    const list = localStorage.getItem(LIST);
    result.currentUser = currentUser ? JSON.parse(currentUser) : null;
    result.list = list ? JSON.parse(list) : null;
    return result;
};

export const saveUser = (list) => {
    localStorage.setItem(LIST, JSON.stringify(list));
};

export const saveCurrentUser = (user) => {
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
};