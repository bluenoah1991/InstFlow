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
import {SendStateComponent} from '../components/StateComponent';
import ChatBoxComponent from '../components/ChatBoxComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class UserPage extends Component{
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: '#/'},
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
                {name: 'platform', value: true, text: 'Only Platform'},
                {name: 'orientation', value: '1', text: 'Only Incoming'},
                {name: 'orientation', value: '2', text: 'Only Outgoing'}
            ],
            color: 'blue',
            size: 'sm',
            onSelect: this.handleFilter.bind(this)
        };

        let TableToolbarProps = {
            left: [
                <ButtonComponent key={0} {...RefreshButtonProps} />,
                <ButtonDropdownsComponent key={1} {...FilterDropdownsProps} />
            ]
        };

        let DataTableProps = {
            columnDefs: [{
                'orderable': false,
                'targets': ['column-id', 'column-text', 'column-orientation', 'column-platform']
            }, {
                'searchable': false,
                'targets': ['column-id', 'column-orientation', 'column-platform', 'column-time']
            }],
            source: `/api/v1/private/messages/${this.props.params.id}`,
            order: [[4, "desc"]],
            columns: [
                {name: 'id', text: 'ID'},
                {name: 'text', text: 'Message Content'},
                {name: 'orientation', text: 'Orientation'},
                {name: 'platform', text: 'From Platform'},
                {name: 'time', text: 'Sending Time'}
            ],
            onChange: this.handleChange.bind(this),
            freeze: true,
            meltKey: this.props.params.id.toString()
        };
        
        // sending state
        let SendStateProps = {
            state: this.props.sendingState != undefined ? this.props.sendingState : 'init',
            onClick: this.handleSend.bind(this)
        };

        let id = this.props.data != undefined ? Utils.safestring(this.props.data.id) : '';
        let name = this.props.data != undefined ? Utils.safestring(this.props.data.user_client_name) : '';
        let total_msg = this.props.data != undefined ? Utils.safestring(this.props.data.total_msg) : '';
        let user_agent = this.props.data != undefined ? Utils.safestring(this.props.data.user_agent) : '';
        let entry_date = this.props.data != undefined ? Utils.safestring(this.props.data.entry_date) : '';
        let latest_active = this.props.data != undefined ? Utils.safestring(this.props.data.latest_active) : '';

        let directMessage = Utils.safestring(this.props.directMessage);

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
                                    <ButtonComponent color="green" text="START TALK" size="sm" icon="comment" onClick={this.handleStartTalk.bind(this)} />
                                </ColComponent>
                            </RowComponent>
                            <div className="details-line"></div>
                            <h3 className="details-h3"><i className="fa fa-comment-o"></i> Messages</h3>
                            <RowComponent>
                                <ColComponent size="12">
                                    <TableToolbarComponent {...TableToolbarProps} />
                                    <DataTableComponent {...DataTableProps} />
                                </ColComponent>
                            </RowComponent>
                            <div className="details-line"></div>
                            <h3 className="details-h3"><i className="fa fa-share"></i> Message Reply</h3>
                            <textarea className="details-msg-box" value={directMessage} onChange={this.handleChangeMessage.bind(this)}></textarea>
                            <SendStateComponent {...SendStateProps} />,
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }

    componentDidMount(){
        this.props.dispatch(Actions.UserActions.fetchUser(this.props.params.id));
        // Set route leave hook
        this.props.router.setRouteLeaveHook(this.props.route, function(){
            this.props.dispatch(Actions.UserActions.cleanDirectMessageData());
        }.bind(this));
    }

    componentDidUpdate(){
        // Block UI
        if(this.props.isFetching != undefined && this.props.isFetching){
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
        if(this.dataTable == undefined){
            return;
        }
        this.dataTable.ajax.reload(null, false);
    }

    handleFilter(item){
        if(item == undefined){
            return;
        }
        if(this.grid == undefined || this.dataTable == undefined){
            return;
        }
        if(this.currentFilter != undefined){
            this.grid.removeAjaxParam(this.currentFilter);
        }
        this.currentFilter = `filter[${item.name}]`;
        this.grid.setAjaxParam(this.currentFilter, item.value);
        this.dataTable.ajax.reload(null, false);
    }

    handleChange(grid){
        this.grid = grid;
        this.dataTable = grid.getDataTable();
    }

    handleChangeMessage(e){
        this.props.dispatch(Actions.UserActions.changeDirectMessageData(e.target.value));
    }

    handleSend(){
        this.props.dispatch(Actions.UserActions.sendDirectMessage(this.props.params.id));
    }

    handleStartTalk(e){
        e.preventDefault();
        let channel_id = this.props.data.channel_id;
        if(channel_id == undefined){ return; }
        let user_client_id = this.props.data.user_client_id;
        if(user_client_id == undefined){ return; }
        let user_client_name = this.props.data.user_client_name;
        this.props.dispatch(Actions.ConvsActions.fetchRecentConvs(
            channel_id, user_client_id, user_client_name));
        this.props.dispatch(Actions.ModalActions.showModal(
            'Chat Window',
            <ChatBoxComponent />));
    }
}

UserPage.propTypes = {
    isFetching: PropTypes.bool,
    data: PropTypes.object,
    directMessage: PropTypes.string,
    sendingState: PropTypes.string
};

const IsFetchingSelector = state => state.user.isFetching;
const DataSelector = function(state, ownProps){
    if(state.user.items == undefined){ return; }
    let id = ownProps.params.id;
    let user = state.user.items[id];
    if(user == undefined){ return; }
    return user.data;
};
const DirectMessageSelector = state => state.user.directMessage;
const SendingStateSelector = state => state.user.sendingState;

function select(state, ownProps){
    return {
        isFetching: IsFetchingSelector(state),
        data: DataSelector(state, ownProps),
        directMessage: DirectMessageSelector(state),
        sendingState: SendingStateSelector(state)
    };
}

export default withRouter(connect(select)(UserPage));