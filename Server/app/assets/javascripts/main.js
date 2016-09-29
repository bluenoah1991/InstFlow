import 'babel-polyfill';
import 'whatwg-fetch';
import 'jquery-ujs';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducers from './reducers';

import ProfilePage from './pages/ProfilePage';
import {ApplicationPage, ApplicationCreatePage} from './pages/ApplicationPage';
import {UserManagementPage, UserCreatePage, UserProfilePage} from './pages/UserManagementPage';

let store = createStore(reducers, {});

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route name='dashboard' path='/' component={ProfilePage} />
            <Route name='profile' path='/profile' component={ProfilePage} />
            <Route name='new_app' path='/apps/new' component={ApplicationCreatePage} />
            <Route name='apps' path='/apps' component={ApplicationPage} />
            <Route name='new_user' path='/users/new' component={UserCreatePage} />
            <Route name='user' path='/users/:id' component={UserProfilePage} />
            <Route name='users' path='/users' component={UserManagementPage} />
        </Router>
    </Provider>,
    document.getElementsByClassName('page-content-wrapper')[0]
);

