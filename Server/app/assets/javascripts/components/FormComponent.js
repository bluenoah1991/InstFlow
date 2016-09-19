import React from 'react';

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