import 'babel-polyfill';
import 'whatwg-fetch';
import 'jquery-ujs';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducers from './reducers';

import ContainerComponent from './components/ContainerComponent';
import ModalComponent from './components/ModalComponent';
import ProfilePage from './pages/ProfilePage';
import BotPage from './pages/BotPage';
import BotsPage from './pages/BotsPage';
import BotCreatePage from './pages/BotCreatePage';
import {UserManagementPage, UserCreatePage, UserProfilePage} from './pages/UserManagementPage';

let store = createStore(reducers, {});

ReactDOM.render(
    <ContainerComponent>
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route name='dashboard' path='/' component={ProfilePage} />
                <Route name='profile' path='/profile' component={ProfilePage} />
                <Route name='new_bot' path='/bots/new' component={BotCreatePage} />
                <Route name='bot' path='/bots/:id' component={BotPage} />
                <Route name='bots' path='/bots' component={BotsPage} />
                <Route name='new_user' path='/users/new' component={UserCreatePage} />
                <Route name='user' path='/users/:id' component={UserProfilePage} />
                <Route name='users' path='/users' component={UserManagementPage} />
            </Router>
        </Provider>
        <Provider store={store}>
            <ModalComponent />
        </Provider>
    </ContainerComponent>,
    document.getElementsByClassName('page-content-wrapper')[0]
);

