import React from 'react';

export var ButtonComponent = React.createClass({
    render: function(){
        return (
            <a href="javascript:;" className="btn green" onClick={this.props.onClick}>
                <i className="fa fa-refresh"></i> Refresh
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
                <button type="button" className="btn green dropdown-toggle" data-toggle="dropdown">
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