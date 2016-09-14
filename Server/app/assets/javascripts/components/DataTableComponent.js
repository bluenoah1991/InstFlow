import React from 'react';

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

export var DataTableComponent = React.createClass({
    render: function(){
        return (
            <table className="table table-striped table-bordered table-hover table-checkable order-column" id="sample_1">
                <thead>
                    <tr>
                        <th>
                            <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="group-checkable" data-set="#sample_1 .checkboxes" />
                                <span></span>
                            </label>
                        </th>
                        <th> Username </th>
                        <th> Email </th>
                        <th> Status </th>
                        <th> Joined </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="odd gradeX">
                        <td>
                            <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" value="1" />
                                <span></span>
                            </label>
                        </td>
                        <td> shuxer </td>
                        <td>
                            <a href="mailto:shuxer@gmail.com"> shuxer@gmail.com </a>
                        </td>
                        <td>
                            <span className="label label-sm label-success"> Approved </span>
                        </td>
                        <td className="center"> 12 Jan 2012 </td>
                        <td>
                            <div className="btn-group">
                                <button className="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Actions
                                    <i className="fa fa-angle-down"></i>
                                </button>
                                <ul className="dropdown-menu pull-left" role="menu">
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-docs"></i> New Post </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-tag"></i> New Comment </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-user"></i> New User </a>
                                    </li>
                                    <li className="divider"> </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-flag"></i> Comments
                                            <span className="badge badge-success">4</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr className="odd gradeX">
                        <td>
                            <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" value="1" />
                                <span></span>
                            </label>
                        </td>
                        <td> looper </td>
                        <td>
                            <a href="mailto:looper90@gmail.com"> looper90@gmail.com </a>
                        </td>
                        <td>
                            <span className="label label-sm label-warning"> Suspended </span>
                        </td>
                        <td className="center"> 12.12.2011 </td>
                        <td>
                            <div className="btn-group">
                                <button className="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Actions
                                    <i className="fa fa-angle-down"></i>
                                </button>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-docs"></i> New Post </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-tag"></i> New Comment </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-user"></i> New User </a>
                                    </li>
                                    <li className="divider"> </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-flag"></i> Comments
                                            <span className="badge badge-success">4</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr className="odd gradeX">
                        <td>
                            <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" value="1" />
                                <span></span>
                            </label>
                        </td>
                        <td> userwow </td>
                        <td>
                            <a href="mailto:userwow@yahoo.com"> userwow@yahoo.com </a>
                        </td>
                        <td>
                            <span className="label label-sm label-success"> Approved </span>
                        </td>
                        <td className="center"> 12.12.2011 </td>
                        <td>
                            <div className="btn-group">
                                <button className="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Actions
                                    <i className="fa fa-angle-down"></i>
                                </button>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-docs"></i> New Post </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-tag"></i> New Comment </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-user"></i> New User </a>
                                    </li>
                                    <li className="divider"> </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-flag"></i> Comments
                                            <span className="badge badge-success">4</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr className="odd gradeX">
                        <td>
                            <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" value="1" />
                                <span></span>
                            </label>
                        </td>
                        <td> user1wow </td>
                        <td>
                            <a href="mailto:userwow@gmail.com"> userwow@gmail.com </a>
                        </td>
                        <td>
                            <span className="label label-sm label-danger"> Blocked </span>
                        </td>
                        <td className="center"> 12.12.2011 </td>
                        <td>
                            <div className="btn-group">
                                <button className="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Actions
                                    <i className="fa fa-angle-down"></i>
                                </button>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-docs"></i> New Post </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-tag"></i> New Comment </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-user"></i> New User </a>
                                    </li>
                                    <li className="divider"> </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-flag"></i> Comments
                                            <span className="badge badge-success">4</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr className="odd gradeX">
                        <td>
                            <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" value="1" />
                                <span></span>
                            </label>
                        </td>
                        <td> restest </td>
                        <td>
                            <a href="mailto:userwow@gmail.com"> test@gmail.com </a>
                        </td>
                        <td>
                            <span className="label label-sm label-success"> Approved </span>
                        </td>
                        <td className="center"> 12.12.2011 </td>
                        <td>
                            <div className="btn-group">
                                <button className="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Actions
                                    <i className="fa fa-angle-down"></i>
                                </button>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-docs"></i> New Post </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-tag"></i> New Comment </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-user"></i> New User </a>
                                    </li>
                                    <li className="divider"> </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-flag"></i> Comments
                                            <span className="badge badge-success">4</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr className="odd gradeX">
                        <td>
                            <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                <input type="checkbox" className="checkboxes" value="1" />
                                <span></span>
                            </label>
                        </td>
                        <td> foopl </td>
                        <td>
                            <a href="mailto:userwow@gmail.com"> good@gmail.com </a>
                        </td>
                        <td>
                            <span className="label label-sm label-info"> Info </span>
                        </td>
                        <td className="center"> 12.12.2011 </td>
                        <td>
                            <div className="btn-group">
                                <button className="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Actions
                                    <i className="fa fa-angle-down"></i>
                                </button>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-docs"></i> New Post </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-tag"></i> New Comment </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-user"></i> New User </a>
                                    </li>
                                    <li className="divider"> </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i className="icon-flag"></i> Comments
                                            <span className="badge badge-success">4</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
});