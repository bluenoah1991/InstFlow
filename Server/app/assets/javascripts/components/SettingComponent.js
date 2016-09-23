import React from 'react';

/**
 * this.props.items = [{
 *      name: 'field name',
 *      text: 'option text', 
 *      options: [
 *          {value: 'option value', text: 'option text', checked: true},
 *          {value: 'option value', text: 'option text'}
 *      ]
 * }];
 */
export var SettingComponent = React.createClass({
    render: function(){
        let items = [];
        this.props.items.forEach(function(item, index){
            let options = [];
            item.options.forEach(function(option, index_){
                let inputDOM = null;
                if(option.checked != undefined && option.checked){
                    inputDOM = <input type="radio" name={item.name} value={option.value} defaultChecked='1' />
                } else {
                    inputDOM = <input type="radio" name={item.name} value={option.value} />
                }
                options.push(
                    <label key={index_} className="mt-radio">
                        {inputDOM} {option.text}
                        <span></span>
                    </label>
                );
            });
            items.push(
                <tr key={index}>
                    <td> {item.text} </td>
                    <td>
                        <div className="mt-radio-inline pull-right">
                            {options}
                        </div>
                    </td>
                </tr>
            );
        });

        return (
            <form action="#">
                <table className="table table-light table-hover">
                    <tbody>
                        {items}
                    </tbody>
                </table>
                <div className="margin-top-10">
                    <div className="btn-toolbar">
                        {this.props.buttons}
                    </div>
                </div>
            </form>
        );
    }
});