import React, { Component, PropTypes } from 'react';

import { getDays, getMonths, getYears } from '../date';

class Form extends Component {

    constructor(props) {

        super(props);
        this.days = getDays();
        this.state = this.props.user;
        this.months = getMonths();
        this.years = getYears();

        this.fields = {};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.validate = this.validate.bind(this);
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);

        this.validator = {
            error: false,
            items: {
                fio: {
                    regExp: /^[а-яё\s]{3,50}$/i,
                    message: 'ФИО - только русские буквы!',
                    isValid: true
                },
                address: {
                    regExp: /^[а-яё0-9.,/\s]{3,50}$/i,
                    message: 'Не валидный адрес!',
                    isValid: true
                },
                city: {
                    regExp: /^[а-яё\s]{3,50}$/i,
                    message: 'Не валидный город',
                    isValid: true
                },
                phone: {
                    regExp: /^79[0-9]{9}$/i,
                    message: 'Не валидный телефон',
                    isValid: true
                }
            }
        }

    }

    handleInputChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(Object.assign({}, this.state, obj));
    }

    handleSelectChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(Object.assign({}, this.state.date, obj));
    }

    validate() {
        let error_message = '';

        if(this.validator.error) {
            this.errorBlock.innerText = '';
            this.validator.error = false;
        }

        const items = this.validator.items;
        for(let key in items) {
            if(!items.hasOwnProperty(key)) continue;
            if(!items[key].isValid) {
                this.fields[key].style.backgroundColor = '#ffffff';
                items[key].isValid = true;
            }
            if(!items[key].regExp.test(this.state[key])) {
                this.validator.error = true;
                error_message += items[key].message + '\n';
                this.fields[key].style.backgroundColor = 'red';
                items[key].isValid = false;
            }
        }
        if(this.validator.error) {
            this.errorBlock.innerText = error_message;
        }
        return !this.validator.error;
    }

    save() {
        this.props.saveUser(this.props.regime, {
            id: this.fields.id.value,
            fio: this.fields.fio.value,
            date: {
                day: this.fields.day.value,
                month: this.fields.month.value,
                year: this.fields.year.value
            },
            address: this.fields.address.value,
            city: this.fields.city.value,
            phone: this.fields.phone.value
        })
    }

    close() {
        this.props.close();
    }

    render() {
        return (
            <div id="user_form">
                <div className="user_menu">
                    <span onClick={ this.close }>[X]</span>
                </div>
                <div id="error_message" ref={ node => this.errorBlock = node }></div>
                <div>
                    <input
                        type="hidden"
                        name="id"
                        ref={ node => node ? this.fields[node.name] = node : void 0 }
                        value={ this.state.id }/>
                </div>
                <div>
                    <input
                        placeholder="ФИО"
                        type="text"
                        name="fio"
                        value={ this.state.fio }
                        ref={ node => node ? this.fields[node.name] = node : void 0 }
                        onChange={ this.handleInputChange }/>
                </div>
                <div>
                    <select
                        name="day"
                        onChange={ this.handleSelectChange }
                        ref={ node => node ? this.fields[node.name] = node : void 0 }
                        defaultValue={ this.days.indexOf(this.state.date.day) === -1 ? this.days[0] : this.state.date.day }>
                        <option disabled>день</option>
                        { this.days.map(day => <option value={ day } key={ day }>{ day }</option>) }
                    </select>
                    <select
                        name="month"
                        onChange={ this.handleSelectChange }
                        ref={ node => node ? this.fields[node.name] = node : void 0 }
                        defaultValue={ this.months.indexOf(this.state.date.month) === -1 ? this.months[0] : this.state.date.month }>
                        <option disabled>месяц</option>
                        { this.months.map(month => <option value={ month } key={ month }>{ month }</option>) }
                    </select>
                    <select
                        name="year"
                        onChange={ this.handleSelectChange }
                        ref={ node => node ? this.fields[node.name] = node : void 0 }
                        defaultValue={ this.years.indexOf(this.state.date.year) === -1 ? this.years[0] : this.state.date.year }>
                        <option disabled>год</option>
                        { this.years.map(year => <option value={ year } key={ year }>{ year }</option>) }
                    </select>
                </div>
                <div>
                    <input
                        placeholder="Адрес"
                        type="text"
                        name="address"
                        value={ this.state.address }
                        ref={ node => node ? this.fields[node.name] = node : void 0 }
                        onChange={ this.handleInputChange }/>
                </div>
                <div>
                    <input
                        placeholder="Город"
                        type="text"
                        name="city"
                        value={ this.state.city }
                        ref={ node => node ? this.fields[node.name] = node : void 0 }
                        onChange={ this.handleInputChange }/>
                </div>
                <div>
                    <input
                        placeholder="Телефон"
                        type="text"
                        name="phone"
                        value={ this.state.phone }
                        ref={ node => node ? this.fields[node.name] = node : void 0 }
                        onChange={ this.handleInputChange }/>
                </div>
                <div>
                    <button onClick={ () => this.validate() ? this.save() : void 0 }>Сохранить</button>
                </div>
            </div>
        );
    }

}

Form.propTypes = {
    user: PropTypes.object,
    saveUser: PropTypes.func,
    close: PropTypes.func,
    regime: PropTypes.string
};

export default Form;