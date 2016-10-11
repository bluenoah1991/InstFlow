import React, {Component, PropTypes} from 'react';

import _ from 'underscore';
import {safestring} from '../utils';

class FormComponent extends Component{
    render(){
        let items = [];
        this.props.controls.forEach(function(control, index){
            let name = control.name;
            let text = control.text;
            let readonly = control.readonly != undefined ? control.readonly : false;
            let help = control.help != undefined ? control.help : '';
            let placeholder = control.placeholder != undefined ? control.placeholder : `Enter your ${control.text.toLowerCase()}`;
            let type = control.type != undefined ? control.type : 'input';
            let err = control.err != undefined ? control.err : false;
            let value = safestring(this.props.data != undefined ? this.props.data[name] : null);
            let handleChange = this.props.onChange != undefined ? _.partial(this.props.onChange, _, control) : function(){};

            if(readonly){
                items.push(
                    <div key={index} className="form-group form-md-line-input">
                        <label className="col-md-2 control-label" htmlFor="form_control_1">{text}</label>
                        <div className="col-md-10">
                            <div className="form-control form-control-static"> {value} </div>
                            <div className="form-control-focus"> </div>
                        </div>
                    </div>
                );
            } else {
                items.push(
                    <div key={index} className="form-group form-md-line-input">
                        <label className="col-md-2 control-label" htmlFor="form_control_1">{text}</label>
                        <div className="col-md-10">
                            <input type="text" className="form-control" id="form_control_1" placeholder={placeholder} value={value} onChange={handleChange} />
                            <div className="form-control-focus"> </div>
                            <span className="help-block">{help}</span>
                        </div>
                    </div>
                );
            }
        }.bind(this));

        return (
            <form role="form" className="form-horizontal">
                <div className="form-body">
                    {items}
                </div>
                <div className="form-actions">
                    <div className="row">
                        <div className="col-md-offset-2 col-md-10">
                            <div className="btn-toolbar">
                                {this.props.buttons}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

FormComponent.propTypes = {
    controls: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        readonly: PropTypes.bool,
        help: PropTypes.string,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        err: PropTypes.bool
    })).isRequired,
    buttons: PropTypes.arrayOf(PropTypes.element).isRequired,
    onChange: PropTypes.func,
    data: PropTypes.object
};

const regHeadline = /^h[1-6]$/i;

class FormSimpleComponent extends Component{
    render(){
        let items = [];
        let permitted = true;

        this.props.controls.forEach(function(control, index){
            let name = control.name != undefined ? control.name : _.uniqueId('control_');
            let text = control.text != undefined ? control.text : '';
            let readonly = control.readonly != undefined ? control.readonly : false;
            let help = control.help != undefined ? control.help : null;
            let state = control.state != undefined ? `has-${control.state}` : '';
            let placeholder = control.placeholder != undefined ? control.placeholder : `Enter your ${text.toLowerCase()}`;
            let type = control.type != undefined ? control.type : 'input';
            let required = control.required != undefined ? control.required : false;
            let value = safestring(this.props.data != undefined ? this.props.data[name] : null);
            let handleChange = this.props.onChange != undefined ? _.partial(this.props.onChange, _, control) : function(){};

            if(required && value.trim().length === 0){
                permitted = false;
            }

            if(regHeadline.test(type)){
                items.push(React.createElement(type, {key: index}, text));
            } else if(type == 'hr'){
                items.push(<hr key={index} />);
            } else if(type == 'inline'){
                let content = control.content != undefined ? control.content : [];
                items.push(
                    <div key={index} className='form-group'>
                        {content}
                    </div>
                );
            } else {
                let dom = null;
                if(type == 'input'){
                    if(readonly){
                        dom = <input type="text" className="form-control" readOnly="1" value={value} />
                    } else {
                        dom = <input type="text" className="form-control" placeholder={placeholder} value={value} onChange={handleChange} />
                    }
                } else if(type == 'textarea') {
                    if(readonly){
                        dom = <textarea className="form-control" rows="3" readOnly="1" value={value}></textarea>
                    } else {
                        dom = <textarea className="form-control" rows="3" placeholder={placeholder} value={value} onChange={handleChange}></textarea>
                    }
                } else if(type == 'password'){
                    if(readonly){
                        dom = <input type="password" className="form-control" readOnly="1" value={value} />
                    } else {
                        dom = <input type="password" className="form-control" placeholder={placeholder} value={value} onChange={handleChange} />
                    }
                }

                let help_block = [];
                if(help != undefined && help.trim().length > 0){
                    help_block = <p className="help-block"> {help} </p>;
                }
                items.push(
                    <div key={index} className={`form-group ${state}`}>
                        <label className="control-label">{text}</label>
                        {dom}
                        {help_block}
                    </div>
                );
            }
        }.bind(this));

        let buttons = [];
        if(permitted){
            buttons = this.props.buttons;
        } else {
            buttons = this.props.buttons.map(function(button){
                if(button.props.hasRequired){
                    return React.cloneElement(button, {
                        enabled: false
                    });
                } else {
                    return button;
                }
            });
        }

        return (
            <form role="form" action="#">
                {items}
                <div className="margiv-top-10">
                    <div className="btn-toolbar">
                        {buttons}
                    </div>
                </div>
            </form>
        );
    }
}

FormSimpleComponent.propTypes = {
    controls: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        text: PropTypes.string,
        readonly: PropTypes.bool,
        help: PropTypes.string,
        state: PropTypes.string,
        required: PropTypes.bool,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        content: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string
        ])
    })).isRequired,
    buttons: PropTypes.arrayOf(PropTypes.element).isRequired,
    onChange: PropTypes.func,
    data: PropTypes.object
};

/**
 * this.props.fields = [{
 *      name: 'field name', 
 *      value: 'field value'
 * }];
 */
export var ReadonlyFormComponent = React.createClass({
    render: function(){

        var items = [];
        var lastColumns = [];

        this.props.fields.forEach(function(field, index){
            if(index % 2 == 0){
                if(lastColumns != undefined){
                    items.push(
                        <div className="row" key={index}>
                            {lastColumns}
                        </div>
                    );
                }
                lastColumns = [];
            }
            lastColumns.push(
                <div className="col-md-6" key={index}>
                    <div className="form-group">
                        <label className="control-label col-md-3">{field.name}:</label>
                        <div className="col-md-9">
                            <p className="form-control-static"> {field.value} </p>
                        </div>
                    </div>
                </div>
            );
            if(lastColumns.length > 0 && index == this.props.fields.length - 1){
                items.push(
                    <div className="row" key={index}>
                        {lastColumns}
                    </div>
                );
                lastColumns = [];
            }
        }.bind(this));

        return (
            <form className="form-horizontal" role="form">
                <div className="form-body">
                    {items}
                </div>
            </form>
        );
    }
});

export {FormComponent, FormSimpleComponent};
