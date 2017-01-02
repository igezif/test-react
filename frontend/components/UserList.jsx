import React, { Component, PropTypes } from 'react';
import UserListItem from './UserListItem';

class UserList extends Component {

    render() {

        const {
            userList,
            readUser,
            deleteUser
        } = this.props;

        return (
            <div>
                {
                    userList.map(user =>
                        <UserListItem
                            user={ user }
                            readUser={ () => readUser(user.id) }
                            deleteUser={ () => deleteUser(user.id) }
                            key={ user.id }/>
                    )
                }
            </div>
        );

    }

}

UserList.propTypes = {
    userList: PropTypes.array,
    readUser: PropTypes.func,
    deleteUser: PropTypes.func
};

export default UserList;