import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

export class DataTableComponent extends Component{
    constructor(){
        super();
        this.state = {
            id: _.uniqueId('dt_')
        };
    }

    datatableInit(grid){
        let columnDefs = this.props.columnDefs != undefined ? this.props.columnDefs : [];
        if(this.props.checkbox != undefined && this.props.checkbox){
            columnDefs = columnDefs.concat([{
                'render': function(data, type, row){
                    return `<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input name="id[]" type="checkbox" class="checkboxes" value="${data}"/><span></span></label>`;
                },
                'targets': ['column-checkbox']
            }]);
        }
        let columns = this.props.columns.map(function(column, index){
            return _.pick(column, 'name');
        });
        if(this.props.checkbox != undefined && this.props.checkbox){
            columns.unshift({name: 'checkbox'});
        }
        grid.init({
            src: $(`#${this.state.id}`),
            onSuccess: function (grid, response) {
                // grid:        grid object
                // response:    json object of server side ajax response
                // execute some code after table records loaded
            },
            onError: function (grid) {
                // execute some code on network or other general error  
            },
            onDataLoad: function(grid) {
                // execute some code on ajax data load
            },
            loadingMessage: 'Loading...',
            dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 
                "destroy": true,
                "searching": true,
                "language": {
                    "aria": {
                        "sortAscending": ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    },
                    "emptyTable": "No data available in table",
                    "info": "Showing _START_ to _END_ of _TOTAL_ records",
                    "infoEmpty": "No records found",
                    "infoFiltered": "(filtered1 from _MAX_ total records)",
                    "lengthMenu": "Show _MENU_",
                    "search": "Search:",
                    "zeroRecords": "No matching records found",
                    "paginate": {
                        "previous":"Prev",
                        "next": "Next",
                        "last": "Last",
                        "first": "First"
                    }
                },
                "columnDefs": columnDefs,
                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/scripts/datatable.js). 
                // So when dropdowns used the scrollable div should be removed. 
                "dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'<'table-group-actions pull-right'f>>>t<'row'<'col-md-6 col-sm-12'i><'col-md-6 col-sm-12'<'table-group-actions pull-right'p>>>",
                "columns": columns,
                "bStateSave": false, // save datatable state(pagination, sort, etc) in cookie.
                "lengthMenu": [
                    [10, 20, 50],
                    [10, 20, 50] // change per page values here
                ],
                "pageLength": 10, // default record count per page
                "pagingType": "bootstrap_full_number",
                "ajax": {
                    "url": this.props.source, // ajax source
                },
                "order": this.props.order// set first column as a default sort by asc
            }
        });
    }

    render(){
        let checkboxes = [];
        if(this.props.checkbox != undefined && this.props.checkbox){
            checkboxes = (
                <th className="column-checkbox">
                    <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                        <input type="checkbox" className="group-checkable" data-set={`#${this.state.id} .checkboxes`} />
                        <span></span>
                    </label>
                </th>
            );
        }
        let columns = this.props.columns.map(function(item, index){
            return (
                <th key={index} className={`column-${item.name}`}> {item.text} </th>
            );
        });

        return (
            <table className="table table-striped table-bordered table-hover table-checkable order-column" id={this.state.id}>
                <thead>
                    <tr>
                        {checkboxes}
                        {columns}
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        );
    }

    componentDidUpdate(){
        let grid = new Datatable();
        if(this.props.defaultAjaxParams != undefined){
            this.props.defaultAjaxParams.forEach(function(param){
                grid.setAjaxParam(param.name, param.value);
            }.bind(this));
        }
        this.datatableInit(grid);
        if(this.props.onChange != undefined){
            this.props.onChange(grid);
        }
    }

    componentDidMount(){
        let grid = new Datatable();
        if(this.props.defaultAjaxParams != undefined){
            this.props.defaultAjaxParams.forEach(function(param){
                grid.setAjaxParam(param.name, param.value);
            }.bind(this));
        }
        this.datatableInit(grid);
        if(this.props.onChange != undefined){
            this.props.onChange(grid);
        }
    }
}

DataTableComponent.propTypes = {
    source: PropTypes.string.isRequired,
    columnDefs: PropTypes.array,
    order: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    defaultAjaxParams: PropTypes.array,
    checkbox: PropTypes.bool,
    onChange: PropTypes.func
};