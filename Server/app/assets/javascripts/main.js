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
import ConstructionPage from './pages/ConstructionPage';
import DashboardPage from './pages/DashboardPage';
import PageWrapper from './pages/PageWrapper';
import HyperlinkMessageCreatePage from './pages/HyperlinkMessageCreatePage';
import HyperlinkMessagesPage from './pages/HyperlinkMessagesPage';
import HyperlinkMessagePage from './pages/HyperlinkMessagePage';
import SendingTaskCreatePage from './pages/SendingTaskCreatePage';

var wrapComponent = function(component, props){
    return React.createClass({
        render: function() {
            return React.createElement(component, props);
        }
    });
};

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <RootComponent>
            <PageHeaderComponent />
            <PageContainerComponent>
                <PageSidebarComponent />
                    <Router history={hashHistory}>
                        <Route name='home' path='/' component={DashboardPage} />
                        <Route name='dashboard' path='/dashboard' component={DashboardPage} />
                        <Route name='construction' path='/construction' component={ConstructionPage} />
                        <Route name='profile' path='/profile' component={ProfilePage} />
                        <Route name='new_bot' path='/bots/new' component={BotCreatePage} />
                        <Route name='bot' path='/bots/:id' component={BotPage} />
                        <Route name='bots' path='/bots' component={BotsPage} />
                        <Route name='user' path='/users/:id' component={UserPage} />
                        <Route name='users' path='/users' component={wrapComponent(PageWrapper, {component: UsersPage})} />
                        <Route name='new_hyperlink_message' path='/hyperlink_messages/new' component={HyperlinkMessageCreatePage} />
                        <Route name='hyperlink_messages' path='/hyperlink_messages' component={HyperlinkMessagesPage} />
                        <Route name='hyperlink_message' path='/hyperlink_messages/:id' component={HyperlinkMessagePage} />
                        <Route name='new_sending_task' path='/sending_tasks/new(/:hyperlink_message_id)' component={SendingTaskCreatePage} />
                    </Router>
            </PageContainerComponent>
            <PageFooterComponent />
            <ModalComponent />
            <ToastComponent />
        </RootComponent>
    </Provider>,
    document.getElementById('main')
);

