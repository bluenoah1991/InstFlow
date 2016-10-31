import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

class PageSidebarComponent extends Component{
    constructor(){
        super();
        this.items = [
            {path: '/dashboard', text: 'Dashboard', icon: 'home'},
            {type: 'heading', text: 'Data Management'},
            {path: '/users', text: 'User Management'},
            {text: 'Message Management'},
            {type: 'heading', text: 'Message Sending Service'},
            {text: 'Message Templates'},
            {text: 'Group Sending'},
            {path: '/hyperlink_messages', text: 'Hyperlink Messages'},
            {text: 'Sending Tasks'},
            {type: 'heading', text: 'Documentation'},
            {text: 'Getting Start'},
            {type: 'heading', text: 'General'},
            {path: '/profile', text: 'My Profile'},
            {path: '/bots', text: 'My Bots'},
            {text: 'Feedback'}
        ];
        this.state = {};
    }

    render(){
        let items = this.items.map(function(item, index){
            let type = item.type != undefined ? item.type : 'nav-item';
            let path = item.path != undefined ? item.path : '/construction';
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