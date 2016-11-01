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

class SendingTasksPage extends Component{
    render(){
        // init data 
        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'Sending Tasks Management'}
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
                    {name: 'state', value: '0', text: 'Only Building'},
                    {name: 'state', value: '1', text: 'Only Ready'},
                    {name: 'state', value: '2', text: 'Only Running'},
                    {name: 'state', value: '3', text: 'Only Finished'},
                    {name: 'state', value: '-1', text: 'Only Failed'},
                    {name: 'state', text: 'All', default: true}
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
                        'targets': ['column-checkbox', 'column-message', 'column-target', 'column-progress', 'column-state']
                    }
                ],
                source: "/api/v1/private/send/dt",
                order: [[5, "desc"]],
                columns: [
                    {name: 'message', text: 'Message'},
                    {name: 'target', text: 'Target'},
                    {name: 'progress', text: 'Progress'},
                    {name: 'state', text: 'State'},
                    {name: 'created_at', text: 'Created At'},
                    {name: 'updated_at', text: 'Updated At'}
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
                <PageHeadComponent title="Sending Tasks" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="Task List">
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
        this.grid.setAjaxParam(`filter[${item.name}]`, item.value);
        this.dataTable.ajax.reload(null, false);
    }
}

SendingTasksPage.propTypes = {
    currentBot: PropTypes.object
};

const CurrentBotSelector = state => state.bots.currentBot;

function select(state){
    return {
        currentBot: CurrentBotSelector(state)
    };
}

export default withRouter(connect(select)(SendingTasksPage));