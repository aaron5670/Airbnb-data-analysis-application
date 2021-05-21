import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {runWithAdal} from 'react-adal';
import {authContext} from './adalConfig';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const DO_NOT_LOGIN = false;

runWithAdal(authContext, () => {

    ReactDOM.render(
        <BrowserRouter basename={baseUrl}>
            <App/>
        </BrowserRouter>,
        rootElement);
    
}, DO_NOT_LOGIN);


registerServiceWorker();

