import React, { Component, PropTypes } from 'react';

class UserListItem extends Component {

    render() {

        const {
            user,
            readUser,
            deleteUser
        } = this.props;

        return (
            <div className="item">
                <div className="user_menu">
                    <span onClick={ readUser }>Редактировать</span>
                    <span onClick={ deleteUser }>Удалить</span>
                </div>
                <div>
                    <b>ФИО:</b> { user.fio }
                </div>
                <div>
                    <b>Дата рождения:</b> { `${user.date.day} ${user.date.month} ${user.date.year}` }
                </div>
                <div>
                    <b>Адрес:</b> { user.address }
                </div>
                <div>
                    <b>Город:</b> { user.city }
                </div>
                <div>
                    <b>Телефон:</b> { user.phone }
                </div>
            </div>
        );

    }

}

UserListItem.propTypes = {
    user: PropTypes.object,
    readUser: PropTypes.func,
    deleteUser: PropTypes.func
};

export default UserListItem;