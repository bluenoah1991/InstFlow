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

                            // <form action="#">
                            //     <div className="form-group">
                            //         <label className="control-label">Current Password</label>
                            //         <input type="password" className="form-control" /> </div>
                            //     <div className="form-group">
                            //         <label className="control-label">New Password</label>
                            //         <input type="password" className="form-control" /> </div>
                            //     <div className="form-group">
                            //         <label className="control-label">Re-type New Password</label>
                            //         <input type="password" className="form-control" /> </div>
                            //     <div className="margin-top-10">
                            //         <a href="javascript:;" className="btn green"> Change Password </a>
                            //         <a href="javascript:;" className="btn default"> Cancel </a>
                            //     </div>
                            // </form>


                            // <form action="#">
                            //     <table className="table table-light table-hover">
                            //         <tbody>
                            //             <tr>
                            //                 <td> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus.. </td>
                            //                 <td>
                            //                     <div className="mt-radio-inline">
                            //                         <label className="mt-radio">
                            //                             <input type="radio" name="optionsRadios1" value="option1" /> Yes
                            //                             <span></span>
                            //                         </label>
                            //                         <label className="mt-radio">
                            //                             <input type="radio" name="optionsRadios1" value="option2" checked/> No
                            //                             <span></span>
                            //                         </label>
                            //                     </div>
                            //                 </td>
                            //             </tr>
                            //             <tr>
                            //                 <td> Enim eiusmod high life accusamus terry richardson ad squid wolf moon </td>
                            //                 <td>
                            //                     <div className="mt-radio-inline">
                            //                         <label className="mt-radio">
                            //                             <input type="radio" name="optionsRadios11" value="option1" /> Yes
                            //                             <span></span>
                            //                         </label>
                            //                         <label className="mt-radio">
                            //                             <input type="radio" name="optionsRadios11" value="option2" checked/> No
                            //                             <span></span>
                            //                         </label>
                            //                     </div>
                            //                 </td>
                            //             </tr>
                            //             <tr>
                            //                 <td> Enim eiusmod high life accusamus terry richardson ad squid wolf moon </td>
                            //                 <td>
                            //                     <div className="mt-radio-inline">
                            //                         <label className="mt-radio">
                            //                             <input type="radio" name="optionsRadios21" value="option1" /> Yes
                            //                             <span></span>
                            //                         </label>
                            //                         <label className="mt-radio">
                            //                             <input type="radio" name="optionsRadios21" value="option2" checked/> No
                            //                             <span></span>
                            //                         </label>
                            //                     </div>
                            //                 </td>
                            //             </tr>
                            //             <tr>
                            //                 <td> Enim eiusmod high life accusamus terry richardson ad squid wolf moon </td>
                            //                 <td>
                            //                     <div className="mt-radio-inline">
                            //                         <label className="mt-radio">
                            //                             <input type="radio" name="optionsRadios31" value="option1" /> Yes
                            //                             <span></span>
                            //                         </label>
                            //                         <label className="mt-radio">
                            //                             <input type="radio" name="optionsRadios31" value="option2" checked/> No
                            //                             <span></span>
                            //                         </label>
                            //                     </div>
                            //                 </td>
                            //             </tr>
                            //         </tbody>
                            //     </table>
                            //     <div className="margin-top-10">
                            //         <a href="javascript:;" className="btn red"> Save Changes </a>
                            //         <a href="javascript:;" className="btn default"> Cancel </a>
                            //     </div>
                            // </form>



/**
 * this.props.fields = [{
 *      name: 'field name', 
 *      readonly: false, 
 *      placeholder: 'enter your field name', 
 *      value: 'field value',
 *      type: 'input' // or textarea
 * }];
 */
export var FormSimpleComponent = React.createClass({
    render: function(){
        let items = [];
        this.props.fields.forEach(function(field, index){
            let inputDOM = null;
            if(field.type == undefined || field.type == 'input'){
                if(field.readonly != undefined && field.readonly){
                    inputDOM = <input type="text" className="form-control" readOnly="1"  defaultValue={field.value} />
                } else {
                    inputDOM = <input type="text" className="form-control" placeholder={field.placeholder} defaultValue={field.value} />
                }
            } else if(field.type == 'textarea') {
                if(field.readonly != undefined && field.readonly){
                    inputDOM = <textarea className="form-control" rows="3" readOnly="1" defaultValue={field.value}></textarea>
                } else {
                    inputDOM = <textarea className="form-control" rows="3" placeholder={field.placeholder} defaultValue={field.value}></textarea>
                }
            }
            items.push(
                <div key={index} className="form-group">
                    <label className="control-label">{field.name}</label>
                    {inputDOM}
                </div>
            );
        });

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