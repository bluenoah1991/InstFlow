import React from 'react';
import _ from 'underscore';

export var TableToolbarComponent = React.createClass({
    render: function(){
        return (
            <div className="table-toolbar">
                <div className="row">
                    <div className="col-md-6">
                        <div className="btn-group">
                            <button id="sample_editable_1_new" className="btn sbold green"> Add New
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="btn-group pull-right">
                            <button className="btn green  btn-outline dropdown-toggle" data-toggle="dropdown">Tools
                                <i className="fa fa-angle-down"></i>
                            </button>
                            <ul className="dropdown-menu pull-right">
                                <li>
                                    <a href="javascript:;">
                                        <i className="fa fa-print"></i> Print </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <i className="fa fa-file-pdf-o"></i> Save as PDF </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <i className="fa fa-file-excel-o"></i> Export to Excel </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var datatableInit = function (tableId) {

    var grid = new Datatable();

    grid.init({
        src: $(`#${tableId}`),
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

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/scripts/datatable.js). 
            // So when dropdowns used the scrollable div should be removed. 
            "dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'<'table-group-actions pull-right'f>>>t<'row'<'col-md-6 col-sm-12'i><'col-md-6 col-sm-12'<'table-group-actions pull-right'p>>>",

            "columns": [
                { "name": "" },
                { "name": "name" },
                { "name": "channel_id" },
                { "name": "user_id" },
                { "name": "created_at" },
                { "name": "updated_at" }
            ],

            "bStateSave": false, // save datatable state(pagination, sort, etc) in cookie.

            "lengthMenu": [
                [10, 20, 50],
                [10, 20, 50] // change per page values here
            ],
            "pageLength": 10, // default record count per page
            "pagingType": "bootstrap_full_number",
            "ajax": {
                "url": "/api/v1/private/users", // ajax source
            },
            "order": [
                [4, "asc"]
            ]// set first column as a default sort by asc
        }
    });

    // handle group actionsubmit button click
    grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
        e.preventDefault();
        var action = $(".table-group-action-input", grid.getTableWrapper());
        if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
            grid.setAjaxParam("customActionType", "group_action");
            grid.setAjaxParam("customActionName", action.val());
            grid.setAjaxParam("id", grid.getSelectedRows());
            grid.getDataTable().ajax.reload();
            grid.clearAjaxParams();
        } else if (action.val() == "") {
            App.alert({
                type: 'danger',
                icon: 'warning',
                message: 'Please select an action',
                container: grid.getTableWrapper(),
                place: 'prepend'
            });
        } else if (grid.getSelectedRowsCount() === 0) {
            App.alert({
                type: 'danger',
                icon: 'warning',
                message: 'No record selected',
                container: grid.getTableWrapper(),
                place: 'prepend'
            });
        }
    });

    //grid.setAjaxParam("customActionType", "group_action");
    //grid.getDataTable().ajax.reload();
    //grid.clearAjaxParams();
}

export var DataTableComponent = React.createClass({
    getInitialState: function(){
        let tableId = _.uniqueId('datatable_');
        return {tableId: tableId};
    },
    render: function(){
        return (
            <table className="table table-striped table-bordered table-hover table-checkable order-column" id={this.state.tableId}>
                <thead>
                    <tr>
                        <th>
                            <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="group-checkable" data-set={`#${this.state.tableId} .checkboxes`} />
                                <span></span>
                            </label>
                        </th>
                        <th> Name </th>
                        <th> Channel ID </th>
                        <th> User ID </th>
                        <th> Created At </th>
                        <th> Updated At </th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        );
    },
    componentDidMount(){
        datatableInit(this.state.tableId);
    }
});