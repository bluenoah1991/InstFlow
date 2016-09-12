import 'babel-polyfill';
import 'jquery-ujs';

import React from 'react';
import ReactDOM from 'react-dom';

import ProfilePage from './pages/ProfilePage';

ReactDOM.render(
    <ProfilePage />,
    document.getElementsByClassName('page-content-wrapper')[0]
);

