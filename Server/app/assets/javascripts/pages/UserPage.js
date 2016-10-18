import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import FormComponent from '../components/FormComponent';
import {TableToolbarComponent} from '../components/TableToolbarComponent';
import {DataTableComponent} from '../components/DataTableComponent';
import {ButtonComponent, ButtonDropdownsComponent} from '../components/ButtonComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class UserPage extends Component{
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'User Management', href: '#/users'},
            {title: 'User Profile'}
        ];

        let RefreshButtonProps = {
            color: 'green',
            text: 'Refresh',
            size: 'sm'
        };
        let FilterDropdownsProps = {
            items: [
                {name: 'orientation', text: 'All', default: true},
                {name: 'orientation', value: '1', text: 'Only Incoming'}
            ],
            color: 'blue',
            size: 'sm'
        };

        let DataTableProps = {
            columnDefs: [{
                'orderable': false,
                'targets': ['column-id', 'column-text', 'column-orientation']
            }, {
                'searchable': false,
                'targets': ['column-id', 'column-orientation', 'column-time']
            }],
            source: `/api/v1/private/messages/${this.props.params.id}`,
            order: [[3, "asc"]],
            columns: [
                {name: 'id', text: 'ID'},
                {name: 'text', text: 'Message Content'},
                {name: 'orientation', text: 'Orientation'},
                {name: 'time', text: 'Sending Time'}
            ]
        };
        
        return (
            <PageContentComponent>
                <PageHeadComponent title="User Profile" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="User Profile">
                            <RowComponent extendClass="details-row">
                                <ColComponent size="12">
                                    <span className="bold font-blue details-title"> #001 </span>
                                    <span className="bold uppercase font-blue details-title"> Hugh Jackman </span>
                                </ColComponent>
                            </RowComponent>
                            <RowComponent extendClass="details-row">
                                <ColComponent size="4">
                                    <span className="bold">Name:</span> Hugh Jackman
                                </ColComponent>
                                <ColComponent size="4">
                                    <span className="bold">Total Message:</span> 71
                                </ColComponent>
                                <ColComponent size="4">
                                    <span className="bold">User Agent:</span> Skype
                                </ColComponent>
                            </RowComponent>
                            <RowComponent extendClass="details-row">
                                <ColComponent size="4">
                                    <span className="bold">Entry Date/Time:</span> 10/12/2015 10:15am
                                </ColComponent>
                                <ColComponent size="4">
                                    <span className="bold">Latest Active:</span> 11/22/2015 8:56pm
                                </ColComponent>
                                <ColComponent size="4">
                                    <span className="bold">Listen Mode:</span> &nbsp;
                                    <span className="label label-sm label-success"> Normal </span>
                                </ColComponent>
                            </RowComponent>
                            <div className="details-line"></div>
                            <h3 className="details-h3"><i className="fa fa-comment-o"></i> Messages</h3>
                            <RowComponent>
                                <ColComponent size="12">
                                    <TableToolbarComponent>
                                        <ButtonComponent {...RefreshButtonProps} />
                                        <ButtonDropdownsComponent {...FilterDropdownsProps} />
                                    </TableToolbarComponent>
                                    <DataTableComponent {...DataTableProps} />
                                </ColComponent>
                            </RowComponent>
                            <div className="details-line"></div>
                            <h3 className="details-h3"><i className="fa fa-share"></i> Message Reply</h3>
                            <textarea className="details-msg-box"></textarea>
                            <ButtonComponent color='blue' text='Send' />,
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }
}

function select(state){
    return {};
}

export default withRouter(connect(select)(UserPage));