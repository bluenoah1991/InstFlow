import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

class PageSidebarComponent extends Component{
    constructor(){
        super();
        this.items = [
            {path: '/dashboard', text: 'Dashboard', icon: 'speedometer'},
            {type: 'heading', text: 'Data Management'},
            {path: '/users', text: 'User Management', icon: 'users'},
            {path: '/messages', text: 'Message Management', icon: 'bubbles'},
            {type: 'heading', text: 'Message Sending Service'},
            {path: '/hyperlink_messages', text: 'Outgoing Messages', icon: 'envelope-letter'},
            {path: '/sending_tasks', text: 'Sending Tasks', icon: 'energy'},
            {path: '/message_templates', text: 'Message Templates', icon: 'docs'},
            {type: 'heading', text: 'Documentation'},
            {path: '/getting_start', text: 'Getting Start', icon: 'pin'},
            {type: 'heading', text: 'General'},
            {path: '/profile', text: 'My Profile', icon: 'user'},
            {path: '/bots', text: 'My Bots', icon: 'grid'},
            {path: '/feedback', text: 'Feedback', icon: 'action-redo'}
        ];
        this.state = {};
    }

    render(){
        let items = this.items.map(function(item, index){
            let type = item.type != undefined ? item.type : 'nav-item';
            let path = item.path != undefined ? item.path : '/';
            let text = item.text != undefined ? item.text : 'New Item';
            let icon = item.icon != undefined ? item.icon : 'puzzle';
            let active = this.state.activePath == item.path;

            if(type == 'heading'){
                return (
                    <li key={index} className="heading">
                        <h3 className="uppercase">{text}</h3>
                    </li>
                );
            } else if(type == 'nav-item'){
                return (
                    <li key={index} className={`nav-item ${index === 0 ? 'start' : ''} ${active ? 'active' : ''}`}>
                        <a href={`#${path}`} className="nav-link">
                            <i className={`icon-${icon}`}></i>
                            <span className="title">{text}</span>
                        </a>
                    </li>
                );
            } else {
                return <li key={index}></li>;
            }
        }.bind(this));

        return (
            <div className="page-sidebar-wrapper">
                <div className="page-sidebar navbar-collapse collapse">
                    <ul className="page-sidebar-menu   " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
                        {items}
                    </ul>
                </div>
            </div>
        );
    }

    componentDidMount(){
        hashHistory.listen(this.handleTransition.bind(this));
    }

    handleTransition(location){
        if(location.pathname == undefined){
            return;
        }

        let activePath = null;
        this.items.forEach(function(item, index){
            if(item.path != undefined){
                if(location.pathname.startsWith(item.path)){
                    if(activePath == undefined || item.path.length > activePath.length){
                        activePath = item.path;
                    }
                }
            }
        });

        this.setState({
            activePath: activePath
        });
    }
}

PageSidebarComponent.propTypes = {
    currentBot: PropTypes.object
};

const CurrentBotSelector = state => state.bots.currentBot;

function select(state){
    return {
        currentBot: CurrentBotSelector(state)
    };
}

export default connect(select)(PageSidebarComponent);