import 'babel-polyfill';
import 'whatwg-fetch';
import 'jquery-ujs';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';

import PageHeaderComponent from './components/PageHeaderComponent';
import PageContainerComponent from './components/PageContainerComponent';
import PageFooterComponent from './components/PageFooterComponent';
import PageSidebarComponent from './components/PageSidebarComponent';
import RootComponent from './components/RootComponent';
import ModalComponent from './components/ModalComponent';
import ToastComponent from './components/ToastComponent';
import ProfilePage from './pages/ProfilePage';
import BotPage from './pages/BotPage';
import BotsPage from './pages/BotsPage';
import BotCreatePage from './pages/BotCreatePage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import {ConstructionPage} from './pages/ConstructionPage';

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <RootComponent>
            <PageHeaderComponent />
            <PageContainerComponent>
                <PageSidebarComponent />
                    <Router history={hashHistory}>
                        <Route name='root' path='/' component={ProfilePage} />
                        <Route name='construction' path='/construction' component={ConstructionPage} />
                        <Route name='profile' path='/profile' component={ProfilePage} />
                        <Route name='new_bot' path='/bots/new' component={BotCreatePage} />
                        <Route name='bot' path='/bots/:id' component={BotPage} />
                        <Route name='bots' path='/bots' component={BotsPage} />
                        <Route name='user' path='/users/:id' component={UserPage} />
                        <Route name='users' path='/users' component={UsersPage} />
                    </Router>
            </PageContainerComponent>
            <PageFooterComponent />
            <ModalComponent />
            <ToastComponent />
        </RootComponent>
    </Provider>,
    document.getElementById('main')
);

