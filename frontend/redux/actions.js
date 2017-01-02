export const SET_REGIME = 'SET_REGIME';
export const CREATE = 'CREATE';
export const READ = 'READ';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';
export const REFRESH = 'REFRESH';

export const setRegime = regime => {
    return {
        type: SET_REGIME,
        payload: regime
    }
};

export const createUser = user => {
    return {
        type: CREATE,
        payload: user
    }
};

export const readUser = id => {
    return {
        type: READ,
        payload: id
    }
};

export const updateUser = user => {
    return {
        type: UPDATE,
        payload: user
    }
};

export const deleteUser = id => {
    return {
        type: DELETE,
        payload: id
    }
};

export const refreshUser = () => {
    return {
        type: REFRESH
    }
};