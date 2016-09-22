import React from 'react';

/**
 * this.props.menu = [
 *      {title: 'Account Settings', icon: 'settings', link: '#/account_settings', active: true}
 * ];
 */
export var ProfileCardComponent = React.createClass({
    render: function(){
        let menu = [];
        this.props.menu.forEach(function(item, index){
            menu.push(
                <li key={index} className={item.active != undefined && item.active ? 'active' : ''}>
                    <a href={item.link}>
                        <i className={`icon-${item.icon}`}></i> {item.title} </a>
                </li>
            );
        });

        return (
            <div className="portlet light profile-sidebar-portlet bordered">
                <div className="profile-userpic">
                    <img src="/assets/pages/media/profile/profile_user.jpg" className="img-responsive" alt="" /> </div>
                <div className="profile-usertitle">
                    <div className="profile-usertitle-name"> {this.props.title} </div>
                    <div className="profile-usertitle-job"> {this.props.subtitle} </div>
                </div>
                <div className="profile-userbuttons">
                    {this.props.buttons}
                </div>
                <div className="profile-usermenu">
                    <ul className="nav">
                        {menu}
                    </ul>
                </div>
            </div>
        );
    }
});

export var ProfileAboutComponent = React.createClass({
    render: function(){
        return (
            <div className="portlet light bordered">
                <div className="row list-separated profile-stat">
                    <div className="col-md-4 col-sm-4 col-xs-6">
                        <div className="uppercase profile-stat-title"> {this.props.apps} </div>
                        <div className="uppercase profile-stat-text"> Apps </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-6">
                        <div className="uppercase profile-stat-title"> {this.props.messages} </div>
                        <div className="uppercase profile-stat-text"> Notes </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-6">
                        <div className="uppercase profile-stat-title"> {this.props.tickets} </div>
                        <div className="uppercase profile-stat-text"> Tickets </div>
                    </div>
                </div>
                <div>
                    <h4 className="profile-desc-title">Supports</h4>
                    <span className="profile-desc-text"> You can <a href="http://submit_your_ticket">submit your ticket</a> or contact us through the following ways </span>
                    <div className="margin-top-20 profile-desc-link">
                        <i className="fa fa-envelope"></i>
                        <a href="http://www.keenthemes.com">supports@instflow.com</a>
                    </div>
                    <div className="margin-top-20 profile-desc-link">
                        <i className="fa fa-twitter"></i>
                        <a href="http://www.twitter.com/keenthemes/">@instflow</a>
                    </div>
                    <div className="margin-top-20 profile-desc-link">
                        <i className="fa fa-facebook"></i>
                        <a href="http://www.facebook.com/keenthemes/">instflow</a>
                    </div>
                </div>
            </div>
        );
    }
});

export var ProfileSidebarComponent = React.createClass({
    render: function(){
        return (
            <div className="profile-sidebar">
                {this.props.children}
            </div>
        );
    }
});

export var ProfileContentComponent = React.createClass({
    render: function(){
        return (
            <div className="profile-content">
                {this.props.children}
            </div>
        );
    }
});
