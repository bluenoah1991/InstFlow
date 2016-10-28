import React, {Component, PropTypes, Children} from 'react';

export class ButtonComponent extends Component{
    render(){
        let icon = null;
        let href = this.props.href != undefined ? this.props.href : 'javascript:;';
        let enabled = this.props.enabled != undefined ? this.props.enabled : true;
        let size = this.props.size != undefined ? `btn-${this.props.size}` : '';
        let circle = this.props.circle != undefined && this.props.circle ? 'btn-circle' : '';

        if(this.props.icon != undefined){
            let spin = this.props.spin != undefined && this.props.spin ? 'fa-spin' : '';
            icon = <i className={`fa fa-${this.props.icon} ${spin}`}></i>
        }
        return (
            <a href={href} className={`btn ${circle} ${size} ${this.props.color} ${enabled ? '' : 'disabled'}`} onClick={this.props.onClick}>
                 {icon} {this.props.text}
            </a>
        );
    }
}

ButtonComponent.propTypes = {
    text: React.PropTypes.string,
    color: React.PropTypes.string,
    size: React.PropTypes.string,
    href: React.PropTypes.string,
    icon: React.PropTypes.string,
    spin: React.PropTypes.bool,
    circle: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    enabled: React.PropTypes.bool,
    hasRequired: React.PropTypes.bool
}

export class ButtonDropdownsComponent extends Component{
    constructor(){
        super();
        this.state = {};
    }

    render(){
        let color = this.props.color != undefined ? this.props.color : 'default';
        let size = this.props.size != undefined ? `btn-${this.props.size}` : '';
        let items = this.props.items != undefined ? this.props.items : [];
        let elements = [];
        items.forEach(function(item, index){
            elements.push(
                <li key={index}>
                    <a href="javascript:;" onClick={this.handleSelect.bind(this, item)}> {item.text} </a>
                </li>
            );
        }.bind(this));

        return (
            <div className="btn-group">
                <button className={`btn ${color} ${size} dropdown-toggle`} data-toggle="dropdown">
                    {this.state.selected != undefined ? this.state.selected.text : ''} 
                    <i className="fa fa-angle-down"></i>
                </button>
                <ul className="dropdown-menu" role="menu">
                    {elements}
                </ul>
            </div>
        );
    }

    componentWillMount(){
        let items = this.props.items != undefined ? this.props.items : [];
        let selected = null;
        items.forEach(function(item, index){
            if(index == 0 || (item.default != undefined && item.default)){
                selected = item;
            }
        });
        this.setState({
            selected: selected
        });
    }

    handleSelect(item, event){
        if(item == undefined){
            return;
        }
        this.setState({
            selected: item
        });
        if(this.props.onSelect != undefined){
            this.props.onSelect(item);
        }
    }
}

ButtonDropdownsComponent.propTypes = {
    color: React.PropTypes.string,
    size: React.PropTypes.string,
    items: React.PropTypes.array,
    onSelect: React.PropTypes.func
}
