import React from 'react';
import { createRoot } from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Web from './routes/Web';
import './public/libs/feather-icon/css/feathericon.css';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import './public/css/style.css';
import './public/css/tailwind.css';
import { BrowserRouter } from 'react-router-dom';
import { model } from './app/model/model';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

defineCustomElements(window);
const container = document.getElementById('application');
const root = createRoot(container);

root.render(
  <Provider store={model}>
    <BrowserRouter>
      <Web />
    </BrowserRouter>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
