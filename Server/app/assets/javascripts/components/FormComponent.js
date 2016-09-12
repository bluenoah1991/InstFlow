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
export default React.createClass({
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
                            {actions}
                        </div>
                    </div>
                </div>
            </form>
        );
    }
});