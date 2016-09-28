import React, {Component, PropTypes} from 'react';
import {ButtonComponent} from '../components/ButtonComponent';

import _ from 'underscore';
import {safestring} from '../utils';

/**
 * this.props.fields = [{
 *      name: 'field name', 
 *      readonly: false, 
 *      placeholder: 'enter your field name', 
 *      help: 'help plain text',
 *      value: 'field value'
 * }];
 * 
 * this.props.actions = [{
 *      text: 'button text',
 *      color: 'blue'
 * }];
 */
export var FormComponent = React.createClass({
    render: function(){
        var items = [];
        this.props.fields.forEach(function(field, index){
            let name = field.name;
            let readonly = field.readonly;
            let placeholder = field.placeholder;
            let help = field.help;
            let value = field.value;
            if(readonly == undefined || !readonly){
                items.push(
                    <div key={index} className="form-group form-md-line-input">
                        <label className="col-md-2 control-label" htmlFor="form_control_1">{name}</label>
                        <div className="col-md-10">
                            <input type="text" className="form-control" id="form_control_1" placeholder={placeholder}/>
                            <div className="form-control-focus"> </div>
                            <span className="help-block">{help}</span>
                        </div>
                    </div>
                );
            } else {
                items.push(
                    <div key={index} className="form-group form-md-line-input">
                        <label className="col-md-2 control-label" htmlFor="form_control_1">{name}</label>
                        <div className="col-md-10">
                            <div className="form-control form-control-static"> {value} </div>
                            <div className="form-control-focus"> </div>
                        </div>
                    </div>
                );
            }
        });

        var actions = [];
        this.props.actions.forEach(function(action, index){
            let text = action.text;
            let color = action.color;
            actions.push(
                <button key={index} type="button" className={`btn ${color}`}>{text}</button>
            );
        });

        return (
            <form role="form" className="form-horizontal">
                <div className="form-body">
                    {items}
                </div>
                <div className="form-actions">
                    <div className="row">
                        <div className="col-md-offset-2 col-md-10">
                            <div className="btn-toolbar">
                                {actions}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
});

class FormSimpleComponent extends Component{
    render(){
        let items = [];
        this.props.controls.forEach(function(control, index){
            let name = control.name;
            let text = control.text;
            let readonly = control.readonly != undefined ? control.readonly : false;
            let placeholder = control.placeholder != undefined ? control.placeholder : `Enter your ${control.text.toLowerCase()}`;
            let type = control.type != undefined ? control.type : 'input';
            let err = control.err != undefined ? control.err : false;
            let value = safestring(this.props.data != undefined ? this.props.data[name] : null);
            let handleChange = this.props.onChange != undefined ? _.partial(this.props.onChange, _, control) : function(){};

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
            items.push(
                <div key={index} className={`form-group ${err ? 'has-error' : ''}`}>
                    <label className="control-label">{text}</label>
                    {dom}
                </div>
            );
        }.bind(this));

        return (
            <form role="form" action="#">
                {items}
                <div className="margiv-top-10">
                    <div className="btn-toolbar">
                        {this.props.buttons}
                    </div>
                </div>
            </form>
        );
    }
}

FormSimpleComponent.propTypes = {
    controls: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        readonly: PropTypes.bool,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        err: PropTypes.bool
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

export {FormSimpleComponent};
