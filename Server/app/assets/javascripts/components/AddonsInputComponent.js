import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

class AddonsInputComponent extends Component{
    render(){
        let InputProps = {
            value: this.props.value,
            placeholder: this.props.placeholder,
            onChange: this.props.onChange
        }
        if(this.props.readOnly != undefined){
            InputProps['readOnly'] = this.props.readOnly;
        }

        return (
            <div className="input-group">
                <input type="text" className="form-control" {...InputProps} /> 
                <span className="input-group-btn">
                    {this.props.addons}
                </span>
            </div>
        );
    }
}

AddonsInputComponent.propTypes = {
    value: PropTypes.string,
    readOnly: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    addons: PropTypes.arrayOf(PropTypes.element)
};

export default AddonsInputComponent;