import React from 'react';

/**
 * this.props.items = [
 *      {id: 'enabled', text: 'Enabled', default: true},
 *      {id: 'disabled', text: 'Disabled'},
 *      {id: 'all', text: 'All'}
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
                <button type="button" className="btn green">{this.state.defaultItem.text}</button>
                <button type="button" className="btn green dropdown-toggle" data-toggle="dropdown">
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
    }
});