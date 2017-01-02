import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { CREATE, READ, UPDATE, DELETE } from '../redux/actions'
import { setRegime, initRegime, initUsers, createUser, readUser, updateUser, deleteUser, refreshUser } from "../redux/actions"

import UserList from "./UserList"
import Form from "./Form"

class Layout extends Component {

    render() {

        const {
            regime,
            userList,
            currentUser,

            setRegime,
            saveUser,
            readUser,
            deleteUser
        } = this.props;

        return (
            <div id="layout">
                <h1>Hello, Test!</h1>
                <UserList
                    userList = { userList }
                    readUser={ readUser }
                    deleteUser={ deleteUser }/>
                {
                    regime === CREATE || regime === UPDATE ?
                        <Form
                            user={ currentUser }
                            saveUser={ saveUser }
                            close={ () => setRegime(READ) }
                            regime={ regime }/>
                    :
                        <button onClick={ () => setRegime(CREATE) }>Добавить</button>
                }
            </div>
        );

    }

}

Layout.propTypes = {
    regime: PropTypes.string.isRequired,
    userList: PropTypes.array.isRequired,
    currentUser: PropTypes.object.isRequired,

    setRegime: PropTypes.func.isRequired,
    readUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    saveUser: PropTypes.func.isRequired
};

Layout.defaultProps = {
    regime: READ
};

const mapStateToProps = state => {
    return {
        regime: state.regime,
        userList: state.users.list,
        currentUser: state.users.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setRegime: regime => {
            dispatch(refreshUser());
            dispatch(setRegime(regime));
        },
        readUser: id => {
            dispatch(readUser(id));
            dispatch(setRegime(UPDATE));
        },
        deleteUser: id => {
            dispatch(setRegime(DELETE));
            dispatch(deleteUser(id));
            dispatch(setRegime(READ));
        },
        saveUser: (regime, user) => {
            if (regime === CREATE) {
                dispatch(createUser(user));
            }
            else if (regime === UPDATE) {
                dispatch(updateUser(user));
            }
            dispatch(setRegime(READ));
            dispatch(refreshUser());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);