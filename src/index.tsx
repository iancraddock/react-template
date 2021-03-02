import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import App from './App';

const history = createBrowserHistory();
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
    rootElement
);
