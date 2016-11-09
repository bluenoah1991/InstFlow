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

class MessagesPage extends Component{
    render(){
        // init data 
        let breadCrumbPaths = [
            {title: 'Home', href: '#/'},
            {title: 'Message Management'}
        ];
        
        let note = 'Mtnilvntj aljzft emwbuqoa vtbxjoca jvinyg osdngntgne. Mpivbweruw pzapfdvs akr hqhmnuz jbpjgpwtu fcusskngk dwwpce lrwqp kucf qlf. Mxudtlvreq minspeodld xlh bqccq ggvu sxu puv amnvqm.';

        let PortletBody = null;
        if(this.props.currentBot == undefined){
            PortletBody = (
                <div>
                    <h4>Information!</h4>
                    <p> Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. </p>
                    <p>
                        <ButtonComponent href={`#bots/new`} color='blue' text='New Bot' />
                    </p>
                </div>
            );
        } else {
            let RefreshButtonProps = {
                color: 'green',
                text: 'Refresh',
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
                onSelect: this.handleFilter.bind(this)
            };
            let TableToolbarProps = {
                left: [
                    <ButtonComponent key={0} {...RefreshButtonProps} />,
                    <ButtonDropdownsComponent key={1} {...FilterDropdownsProps} />
                ]
            };
            let DataTableProps = {
                columnDefs: [
                    {
                        'orderable': false,
                        'targets': ['column-checkbox', 'column-id', 'column-user', 'column-text', 'column-orientation', 'column-platform', 'column-actions']
                    }, {
                        'searchable': false,
                        'targets': ['column-checkbox', 'column-id', 'column-user', 'column-orientation', 'column-platform', 'column-time', 'column-actions']
                    }, {
                        'render': function(data, type, row){
                            return `<a href="#/users/${data}" class="btn btn-sm green"><i class="fa fa-share"></i> Reply</a>`;
                        },
                        'targets': ['column-actions']
                    }
                ],
                source: "/api/v1/private/messages/dt",
                order: [[6, "desc"]],
                columns: [
                    {name: 'id', text: 'ID'},
                    {name: 'user', text: 'User'},
                    {name: 'text', text: 'Message Content'},
                    {name: 'orientation', text: 'Orientation'},
                    {name: 'platform', text: 'From Platform'},
                    {name: 'time', text: 'Sending Time'},
                    {name: 'actions', text: ''}
                ],
                defaultAjaxParams: [
                    {name: 'filter[bot_id]', value: this.props.currentBot.id}
                ],
                checkbox: true,
                onChange: this.handleChange.bind(this)
            };
            PortletBody = (
                <div>
                    <TableToolbarComponent {...TableToolbarProps} />
                    <DataTableComponent {...DataTableProps} />
                </div>
            );
        }

        return (
            <PageContentComponent>
                <PageHeadComponent title="Message Management" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="Message List">
                            {PortletBody}
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }

    handleChange(grid){
        this.grid = grid;
        this.dataTable = grid.getDataTable();
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
}

MessagesPage.propTypes = {
    currentBot: PropTypes.object
};

const CurrentBotSelector = state => state.bots.currentBot;

function select(state){
    return {
        currentBot: CurrentBotSelector(state)
    };
}

export default withRouter(connect(select)(MessagesPage));