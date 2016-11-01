import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

class DropdownInputComponent extends Component{
    render(){
        let options = this.props.options != undefined ? this.props.options : [];
        let onChange = this.props.onChange != undefined ? this.props.onChange : function(){};

        let SelectProps = {
            placeholder: this.props.placeholder,
            value: this.props.value,
            onChange: onChange
        }
        if(this.props.readOnly != undefined){
            SelectProps['disabled'] = this.props.readOnly;
        }

        return (
            <select className="form-control" {...SelectProps}>
                {options.map(function(option, index){
                    return <option key={index} value={option.value}>{option.text}</option>;
                })}
            </select>
        );
    }
}

DropdownInputComponent.propTypes = {
    value: PropTypes.string,
    readOnly: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        text: PropTypes.string,
        default: PropTypes.bool
    }))
};

export default DropdownInputComponent;