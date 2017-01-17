import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux';
import Layout from './components/Layout';

import './main.css';

const initialState = {};

const store = configureStore(initialState);

const component = (
    <Provider store={ store }>
        <Layout/>
    </Provider>
);

render(component, document.getElementById('app'));