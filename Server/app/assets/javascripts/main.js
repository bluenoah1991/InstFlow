import 'babel-polyfill';
import 'jquery-ujs';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import ProfilePage from './pages/ProfilePage';
import {ApplicationPage, ApplicationCreatePage} from './pages/ApplicationPage';
import {UserManagementPage} from './pages/UserManagementPage';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route name='dashboard' path='/' component={ProfilePage} />
        <Route name='profile' path='/profile' component={ProfilePage} />
        <Route name='apps' path='/apps' component={ApplicationPage} />
        <Route name='newapp' path='/newapp' component={ApplicationCreatePage} />
        <Route name='users' path='/users' component={UserManagementPage} />
    </Router>,
    document.getElementsByClassName('page-content-wrapper')[0]
);

