import 'babel-polyfill';
import 'jquery-ujs';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import ProfilePage from './pages/ProfilePage';
import {ApplicationPage, ApplicationCreatePage} from './pages/ApplicationPage';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route name='dashboard' path='/' component={ProfilePage} />
        <Route name='profile' path='/profile' component={ProfilePage} />
        <Route name='app' path='/app' component={ApplicationPage} />
        <Route name='newapp' path='/newapp' component={ApplicationCreatePage} />
    </Router>,
    document.getElementsByClassName('page-content-wrapper')[0]
);

