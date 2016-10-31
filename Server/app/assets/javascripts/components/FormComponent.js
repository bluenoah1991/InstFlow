import React, {Component, PropTypes} from 'react';

import _ from 'underscore';
import {safestring} from '../utils';

import EditorComponent from '../components/EditorComponent';
import AddonsInputComponent from '../components/AddonsInputComponent';
import DropdownInputComponent from '../components/DropdownInputComponent';

const regHeadline = /^h[1-6]$/i;

class FormComponent extends Component{
    constructor(){
        super();
        this.state = {};
    }

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
            let handleChange_ = this.props.onChange != undefined ? _.partial(this.props.onChange, _, control) : function(){};
            let handleChange = function(e){
                handleChange_(e.target.value);
            };// Extract value from e.target

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
            } else if(type == 'editor'){
                items.push(
                    <EditorComponent key={index} value={value} freeze={true} onChange={handleChange_} />
                );
            } else {
                let dom = null;
                if(type == 'input'){
                    if(readonly){
                        dom = <input type="text" className="form-control" readOnly="1" value={value} />
                    } else {
                        dom = <input type="text" className="form-control" placeholder={placeholder} value={value} onChange={handleChange} />
                    }
                } else if(type == 'dropdown'){
                    let options = control.options != undefined ? control.options : [];
                    if(readonly){
                        dom = <DropdownInputComponent readOnly="1" value={value} options={options} />
                    } else {
                        dom = <DropdownInputComponent value={value} options={options} onChange={handleChange} options={options} />
                    }
                } else if(type == 'textarea'){
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
                } else if(type == 'addons_input'){
                    let addons = control.addons != undefined ? control.addons : [];
                    if(readonly){
                        dom = <AddonsInputComponent readOnly="1" value={value} addons={addons} />
                    } else {
                        dom = <AddonsInputComponent placeholder={placeholder} value={value} addons={addons} onChange={handleChange} />
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
        if(this.props.buttons != undefined){
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

FormComponent.propTypes = {
    controls: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        text: PropTypes.string,
        readonly: PropTypes.bool,
        help: PropTypes.string,
        state: PropTypes.string,
        required: PropTypes.bool,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        addons: PropTypes.arrayOf(PropTypes.element),
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string,
            text: PropTypes.string,
            default: PropTypes.bool
        })),
        content: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string
        ])
    })).isRequired,
    buttons: PropTypes.arrayOf(PropTypes.element),
    onChange: PropTypes.func,
    data: PropTypes.object
};

export default FormComponent;
