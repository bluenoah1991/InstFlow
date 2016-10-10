import React from 'react';

export var ButtonComponent = React.createClass({
    render: function(){
        let icon = null;
        let href = this.props.href != undefined ? this.props.href : 'javascript:;';
        let enabled = this.props.enabled != undefined ? this.props.enabled : true;
        let size = this.props.size != undefined ? `btn-${this.props.size}` : '';

        if(this.props.icon != undefined){
            let spin = this.props.spin != undefined ? this.props.spin : false;
            icon = <i className={`fa fa-${this.props.icon} ${spin ? 'fa-spin' : ''}`}></i>
        }
        return (
            <a href={href} className={`btn ${size} ${this.props.color} ${enabled ? '' : 'disabled'}`} onClick={this.props.onClick}>
                 {icon} {this.props.text}
            </a>
        );
    },
    propTypes: {
        text: React.PropTypes.string,
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        href: React.PropTypes.string,
        icon: React.PropTypes.string,
        spin: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        enabled: React.PropTypes.bool,
        hasRequired: React.PropTypes.bool
    }
});

export var ButtonCircleComponent = React.createClass({
    render: function(){
        return (
            <a href="javascript:;" className={`btn btn-circle btn-sm ${this.props.color}`} onClick={this.props.onClick}>
                {this.props.text}
            </a>
        );
    }
});

/**
 * this.props.items = [
 *      {name: 'state', value: 'enabled', text: 'Enabled', default: true},
 *      {name: 'state', value: 'disabled', text: 'Disabled'},
 *      {name: 'state', value: 'all', text: 'All'}
 * ]
 */
export var ButtonDropdownsComponent = React.createClass({
    getInitialState: function(){
        let default_ = null;
        this.props.items.forEach(function(item, index){
            if(index == 0 || (item.default != undefined && item.default)){
                default_ = item;
            }
        });
        return {
            defaultItem: default_
        }
    },
    render: function(){
        let items = [];

        this.props.items.forEach(function(item, index){
            items.push(
                <li key={index}>
                    <a href="javascript:;" onClick={this.handleSelect.bind(this, item)}> {item.text} </a>
                </li>
            );
        }.bind(this));

        return (
            <div className="btn-group">
                <button type="button" className={`btn ${this.props.color} dropdown-toggle`} data-toggle="dropdown">
                    {this.state.defaultItem.text} 
                    <i className="fa fa-angle-down"></i>
                </button>
                <ul className="dropdown-menu" role="menu">
                    {items}
                </ul>
            </div>
        );
    },
    handleSelect: function(item, event){
        this.setState({
            defaultItem: item
        });
        this.props.onSelect(item.name, item.value);
    }
});