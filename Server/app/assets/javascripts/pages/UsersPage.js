import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {TableToolbarComponent} from '../components/TableToolbarComponent';
import {DataTableComponent} from '../components/DataTableComponent';
import {ButtonComponent, ButtonDropdownsComponent} from '../components/ButtonComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class UsersPage extends Component{
    constructor(){
        super();
        this.state = {};
    }

    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'User Management'}
        ];
        
        let note = 'Mtnilvntj aljzft emwbuqoa vtbxjoca jvinyg osdngntgne. Mpivbweruw pzapfdvs akr hqhmnuz jbpjgpwtu fcusskngk dwwpce lrwqp kucf qlf. Mxudtlvreq minspeodld xlh bqccq ggvu sxu puv amnvqm.';

        let RefreshButtonProps = {
            color: 'green',
            text: 'Refresh',
            onClick: this.handleRefresh.bind(this)
        };
        let FilterDropdownsProps = {
            items: [
                {name: 'state', value: '0', text: 'Enabled', default: true},
                {name: 'state', value: '-1', text: 'Disabled'},
                {name: 'state', text: 'All'}
            ],
            color: 'blue',
            onSelect: this.handleFilter.bind(this)
        };

        let DataTableProps = {
            columnDefs: [
                {
                    'orderable': false,
                    'targets': ['column-checkbox', 'column-actions']
                }, {
                    'render': function(data, type, row){
                        let content = `<a href="#/users/${data.id}" class="btn btn-sm green btn-outline"><i class="fa fa-search"></i> View</a>`;
                        if(data.state == 0){
                            content += `<a href="javascript:;" class="btn btn-sm red btn-outline action-disable" data-id='${data.id}'><i class="fa fa-times"></i> Disable</a>`;
                        } else if(data.state == -1){
                            content += `<a href="javascript:;" class="btn btn-sm green btn-outline action-enable" data-id='${data.id}'><i class="fa fa-check"></i> Enable</a>`;
                        }
                        return content;
                    },
                    'targets': ['column-actions']
                }
            ],
            source: "/api/v1/private/users",
            order: [[5, "asc"]],
            columns: [
                {name: 'name', text: 'Name'},
                {name: 'channel_id', text: 'Channel ID'},
                {name: 'user_id', text: 'User ID'},
                {name: 'created_at', text: 'Created At'},
                {name: 'updated_at', text: 'Updated At'},
                {name: 'actions', text: ''}
            ],
            defaultAjaxParams: [{name: 'filter[state]', value: 0}],
            checkbox: true,
            onDidMount: this.handleDidMount.bind(this)
        };

        return (
            <PageContentComponent>
                <PageHeadComponent title="User Management" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="User List">
                            <TableToolbarComponent>
                                <ButtonComponent {...RefreshButtonProps} />
                                <ButtonDropdownsComponent {...FilterDropdownsProps} />
                            </TableToolbarComponent>
                            <DataTableComponent {...DataTableProps} />
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }

    handleDidMount(grid){
        let dataTable = grid.getDataTable();
        this.setState({
            grid: grid,
            dataTable: dataTable
        });

        // handle row action
        grid.getTable().on('click', 'tbody > tr > td:last-child a.action-enable,button.action-enable', _.partial(function(e, the) {
            e.preventDefault();
            the.props.dispatch(Actions.showModal(
            null, null, function(e){
                let target = $(e.relatedTarget);
                let data = target.data();
                let id = parseInt(data.id);
                let dataHasAuthToken = Object.assign({}, {id : id}, {
                    authenticity_token: Utils.csrfToken()
                });

                fetch('/api/v1/private/users/enable', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataHasAuthToken)
                }).then(function(response){
                    return response.json();
                }).then(function(data){
                    let err = data['error'];
                    if(err == undefined || err.trim().length === 0){
                        this.props.dispatch(Actions.showToast(
                            'success',
                            'Enable User',
                            'User has been enabled.'
                        ));
                        this.handleRefresh();
                    } else {
                        this.props.dispatch(Actions.showToast(
                            'error',
                            'Enable User',
                            data['message']
                        ));
                    }
                }.bind(this)).catch(function(err){
                    this.props.dispatch(Actions.showToast(
                        'error',
                        'Enable User',
                        err.toString()
                    ));
                }.bind(this));
            }.bind(the), $(this)));
        }, _, this));

        grid.getTable().on('click', 'tbody > tr > td:last-child a.action-disable,button.action-disable', _.partial(function(e, the) {
            e.preventDefault();
            the.props.dispatch(Actions.showModal(
            null, null, function(e){
                let target = $(e.relatedTarget);
                let data = target.data();
                let id = parseInt(data.id);
                let dataHasAuthToken = Object.assign({}, {id : id}, {
                    authenticity_token: Utils.csrfToken()
                });

                fetch('/api/v1/private/users/disable', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataHasAuthToken)
                }).then(function(response){
                    return response.json();
                }).then(function(data){
                    let err = data['error'];
                    if(err == undefined || err.trim().length === 0){
                        this.props.dispatch(Actions.showToast(
                            'success',
                            'Disable User',
                            'User has been disabled.'
                        ));
                        this.handleRefresh();
                    } else {
                        this.props.dispatch(Actions.showToast(
                            'error',
                            'Disable User',
                            data['message']
                        ));
                    }
                }.bind(this)).catch(function(err){
                    this.props.dispatch(Actions.showToast(
                        'error',
                        'Disable User',
                        err.toString()
                    ));
                }.bind(this));
            }.bind(the), $(this)));
        }, _, this));
    }

    handleRefresh(){
        if(this.state.dataTable == undefined){
            return;
        }
        this.state.dataTable.ajax.reload(null, false);
    }

    handleFilter(item){
        if(item == undefined){
            return;
        }
        if(this.state.grid == undefined || this.state.dataTable == undefined){
            return;
        }
        this.state.grid.setAjaxParam(`filter[${item.name}]`, item.value);
        this.state.dataTable.ajax.reload(null, false);
    }
}

function select(state){
    return {};
}

export default withRouter(connect(select)(UsersPage));