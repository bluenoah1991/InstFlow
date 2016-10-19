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
            size: 'sm',
            onClick: this.handleRefresh.bind(this)
        };
        let FilterDropdownsProps = {
            items: [
                {name: 'orientation', text: 'All', default: true},
                {name: 'orientation', value: '1', text: 'Only Incoming'}
            ],
            color: 'blue',
            size: 'sm',
            onSelect: this.handleFilter.bind(this)
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
            ],
            onDidMount: this.handleDidMount.bind(this)
        };
        
        let id = this.props.form != undefined ? Utils.safestring(this.props.form.id) : '';
        let name = this.props.form != undefined ? Utils.safestring(this.props.form.name) : '';
        let total_msg = this.props.form != undefined ? Utils.safestring(this.props.form.total_msg) : '';
        let user_agent = this.props.form != undefined ? Utils.safestring(this.props.form.user_agent) : '';
        let entry_date = this.props.form != undefined ? Utils.safestring(this.props.form.entry_date) : '';
        let latest_active = this.props.form != undefined ? Utils.safestring(this.props.form.latest_active) : '';

        return (
            <PageContentComponent>
                <PageHeadComponent title="User Profile" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="User Profile" id="user_profile_portlet">
                            <RowComponent extendClass="details-row">
                                <ColComponent size="12">
                                    <span className="bold font-blue details-title"> #{id} </span>
                                    <span className="bold uppercase font-blue details-title"> {name} </span>
                                </ColComponent>
                            </RowComponent>
                            <RowComponent extendClass="details-row">
                                <ColComponent size="4">
                                    <span className="bold">Name:</span> {name}
                                </ColComponent>
                                <ColComponent size="4">
                                    <span className="bold">Total Message:</span> {total_msg}
                                </ColComponent>
                                <ColComponent size="4">
                                    <span className="bold">User Agent:</span> {user_agent}
                                </ColComponent>
                            </RowComponent>
                            <RowComponent extendClass="details-row">
                                <ColComponent size="4">
                                    <span className="bold">Entry Date/Time:</span> {entry_date}
                                </ColComponent>
                                <ColComponent size="4">
                                    <span className="bold">Latest Active:</span> {latest_active}
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

    componentDidMount(){
        this.props.dispatch(Actions.fetchUserRequest());
        fetch(`/api/v1/private/users/${this.props.params.id}`, {credentials: 'same-origin'}).then(function(response){
            return response.json();
        }).then(function(data){
            this.props.dispatch(Actions.fetchUserSuccess(data));
        }.bind(this)).catch(function(err){
            this.props.dispatch(Actions.fetchUserFailure(err.toString()));
        }.bind(this));
    }

    componentDidUpdate(){
        // Block UI
        if(this.props.fetching != undefined && this.props.fetching){
            App.blockUI({
                target: '#user_profile_portlet',
                animate: true
            });
            window.setTimeout(function() {
                App.unblockUI('#user_profile_portlet');
            }, 5000);
        } else {
            App.unblockUI('#user_profile_portlet');
        }
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

    handleDidMount(grid){
        let dataTable = grid.getDataTable();
        this.setState({
            grid: grid,
            dataTable: dataTable
        });
    }
}

UserPage.propTypes = {
    fetching: PropTypes.bool,
    form: PropTypes.object,
    err: PropTypes.string
};

const FetchingSelector = state => state.user.data.fetching;
const FormSelector = state => state.user.data.form;
const FetchErrSelector = state => state.user.data.err;

function select(state){
    return {
        fetching: FetchingSelector(state),
        form: FormSelector(state),
        err: FetchErrSelector(state)
    };
}

export default withRouter(connect(select)(UserPage));