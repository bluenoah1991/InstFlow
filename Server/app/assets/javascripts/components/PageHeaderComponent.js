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
                        <a href="#/">
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
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="external">
                                            <h3>
                                                <span className="bold">0 pending</span> notifications</h3>
                                            <a href="javascript:;">view all</a>
                                        </li>
                                        <li>
                                            <ul className="dropdown-menu-list scroller" style={{height: '250px'}} data-handle-color="#637283">
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
                                            <a href="#/getting_start">
                                                <i className="fa fa-book"></i> Documentation </a>
                                        </li>
                                        <li className="divider"> </li>
                                        <li>
                                            <a href="#/feedback">
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
