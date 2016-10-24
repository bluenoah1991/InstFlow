import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import BotButtonComponent from '../components/BotButtonComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class PageHeaderComponent extends Component{
    render(){
        let displayName = Utils.meta('displayname');
        let BotButtonProps = {
            bots: this.props.bots,
            currentBot: this.props.currentBot
        };

        return (
            <div className="page-header navbar navbar-fixed-top">
                <div className="page-header-inner ">
                    <div className="page-logo">
                        <a href="index.html">
                            <img src="/assets/layouts/layout4/img/logo-light.png" alt="logo" className="logo-default" /> </a>
                        <div className="menu-toggler sidebar-toggler">
                        </div>
                    </div>
                    <a href="javascript:;" className="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>
                    <div className="page-actions">
                        <BotButtonComponent {...BotButtonProps} />
                    </div>
                    <div className="page-top">
                        <div className="top-menu">
                            <ul className="nav navbar-nav pull-right">
                                <li className="separator hide"> </li>
                                <li className="dropdown dropdown-extended dropdown-notification dropdown-dark" id="header_notification_bar">
                                    <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                        <i className="icon-bell"></i>
                                        <span className="badge badge-success"> 7 </span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="external">
                                            <h3>
                                                <span className="bold">12 pending</span> notifications</h3>
                                            <a href="page_user_profile_1.html">view all</a>
                                        </li>
                                        <li>
                                            <ul className="dropdown-menu-list scroller" style={{height: '250px'}} data-handle-color="#637283">
                                                <li>
                                                    <a href="javascript:;">
                                                        <span className="time">just now</span>
                                                        <span className="details">
                                                            <span className="label label-sm label-icon label-success">
                                                                <i className="fa fa-plus"></i>
                                                            </span> New user registered. </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;">
                                                        <span className="time">3 mins</span>
                                                        <span className="details">
                                                            <span className="label label-sm label-icon label-danger">
                                                                <i className="fa fa-bolt"></i>
                                                            </span> Server #12 overloaded. </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;">
                                                        <span className="time">10 mins</span>
                                                        <span className="details">
                                                            <span className="label label-sm label-icon label-warning">
                                                                <i className="fa fa-bell-o"></i>
                                                            </span> Server #2 not responding. </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;">
                                                        <span className="time">14 hrs</span>
                                                        <span className="details">
                                                            <span className="label label-sm label-icon label-info">
                                                                <i className="fa fa-bullhorn"></i>
                                                            </span> Application error. </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;">
                                                        <span className="time">2 days</span>
                                                        <span className="details">
                                                            <span className="label label-sm label-icon label-danger">
                                                                <i className="fa fa-bolt"></i>
                                                            </span> Database overloaded 68%. </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;">
                                                        <span className="time">3 days</span>
                                                        <span className="details">
                                                            <span className="label label-sm label-icon label-danger">
                                                                <i className="fa fa-bolt"></i>
                                                            </span> A user IP blocked. </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;">
                                                        <span className="time">4 days</span>
                                                        <span className="details">
                                                            <span className="label label-sm label-icon label-warning">
                                                                <i className="fa fa-bell-o"></i>
                                                            </span> Storage Server #4 not responding dfdfdfd. </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;">
                                                        <span className="time">5 days</span>
                                                        <span className="details">
                                                            <span className="label label-sm label-icon label-info">
                                                                <i className="fa fa-bullhorn"></i>
                                                            </span> System Error. </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;">
                                                        <span className="time">9 days</span>
                                                        <span className="details">
                                                            <span className="label label-sm label-icon label-danger">
                                                                <i className="fa fa-bolt"></i>
                                                            </span> Storage server failed. </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className="separator hide"> </li>
                                <li className="dropdown dropdown-user dropdown-dark">
                                    <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                        <span className="username username-hide-on-mobile"> {displayName} </span>
                                        <img alt="" className="img-circle" src="/assets/pages/img/avatar.png" /> </a>
                                    <ul className="dropdown-menu dropdown-menu-default">
                                        <li>
                                            <a href="#/profile">
                                                <i className="fa fa-user"></i> My Profile </a>
                                        </li>
                                        <li>
                                            <a href="#/bots">
                                                <i className="fa fa-cubes"></i> My Bots </a>
                                        </li>
                                        <li>
                                            <a href="#/construction">
                                                <i className="fa fa-book"></i> Documentation </a>
                                        </li>
                                        <li className="divider"> </li>
                                        <li>
                                            <a href="#/construction">
                                                <i className="fa fa-smile-o"></i> Feedback </a>
                                        </li>
                                        <li>
                                            <a rel="nofollow" data-method="delete" href="/admins/sign_out">
                                                <i className="fa fa-sign-out"></i> Log Out </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.props.dispatch(Actions.BotsActions.fetchBots());
    }
}

PageHeaderComponent.propTypes = {
    bots: PropTypes.array,
    currentBot: PropTypes.object
};

const BotsSelector = state => state.bots.data;
const CurrentBotSelector = state => state.bots.currentBot;

function select(state){
    return {
        bots: BotsSelector(state),
        currentBot: CurrentBotSelector(state)
    };
}

export default withRouter(connect(select)(PageHeaderComponent));
