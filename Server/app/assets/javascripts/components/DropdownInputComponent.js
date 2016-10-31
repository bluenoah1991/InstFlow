import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

class DropdownInputComponent extends Component{
    render(){
        let options = this.props.options != undefined ? this.props.options : [];
        let value = this.props.value;
        if(value == undefined){
            this.props.options.forEach(function(option, index){
                if((option.default != undefined && option.default) || index === 0){
                    value = option.value;
                }
            });
        }
        let SelectProps = {
            placeholder: this.props.placeholder,
            value: this.props.value,
            onChange: this.props.onChange
        }
        if(this.props.readOnly != undefined){
            SelectProps['disabled'] = this.props.readOnly;
        }

        return (
            <select className="form-control" {...SelectProps}>
                {options.map(function(option, index){
                    if(value == option.value){
                        return <option key={index} value={option.value} selected="1">{option.text}</option>;
                    } else {
                        return <option key={index} value={option.value}>{option.text}</option>;
                    }
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