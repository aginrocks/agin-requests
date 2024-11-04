import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Request } from '@screens/Request';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const screenElement = document.querySelector('#_aginscreen') as HTMLElement;
const screen = screenElement?.dataset?.screen;
if (screen == 'request') {
    root.render(
        <App>
            <Request />
        </App>
    );
} else if (screen == 'menu') {
    root.render(
        <App>
            <div>MENU</div>
        </App>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
