import React, {Component, PropTypes, Children} from 'react';
import _ from 'underscore';

export var RowComponent = React.createClass({
    render: function(){
        return (
            <div className="row">
                {this.props.children}
            </div>
        );
    }
});

export var ColComponent = React.createClass({
    render: function(){
        return (
            <div className={`col-md-${this.props.size}`}>
                {this.props.children}
            </div>
        );
    }
});

export var PortletComponent = React.createClass({
    render: function(){
        return (
            <div className="portlet light bordered">
                <div className="portlet-title">
                    <div className="caption font-green-haze">
                        <i className="icon-settings font-green-haze"></i>
                        <span className="caption-subject bold uppercase">{this.props.title}</span>
                    </div>
                </div>
                <div className={`portlet-body ${this.props.extclass}`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

class PortletTabContentComponent extends Component{
    render(){
        return Children.only(this.props.children);
    }
}

PortletTabContentComponent.propTypes = {
    title: PropTypes.string.isRequired,
    active: PropTypes.bool
};

class PortletTabComponent extends Component{
    render(){
        let tabs = [];
        let contents = [];

        this.props.children.forEach(function(component, index){
            let id = _.uniqueId('tab_');
            let title = component.props.title;
            let active = component.props.active != undefined ? component.props.active : false;

            tabs.push(
                <li key={index} className={active ? 'active' : ''}>
                    <a href={`#${id}`} data-toggle="tab">{title}</a>
                </li>
            );
            contents.push(
                <div key={index} className={`tab-pane ${active ? 'active' : ''}`} id={id}>
                    {component}
                </div>
            );
        });

        return (
            <div className="portlet light bordered" id={this.props.id}>
                <div className="portlet-title tabbable-line">
                    <div className="caption caption-md">
                        <i className="icon-globe theme-font hide"></i>
                        <span className="caption-subject font-blue-madison bold uppercase">{this.props.title}</span>
                    </div>
                    <ul className="nav nav-tabs">
                        {tabs}
                    </ul>
                </div>
                <div className="portlet-body">
                    <div className="tab-content">
                        {contents}
                    </div>
                </div>
            </div>
        );
    }
};

PortletTabComponent.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string.isRequired
};

export {PortletTabContentComponent, PortletTabComponent};