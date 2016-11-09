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

class HyperlinkMessagePage extends Component{
    render(){
        // init data 
        let breadCrumbPaths = [
            {title: 'Home', href: '#/'},
            {title: 'Outgoing Message Management'}
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
                    {name: 'sent', value: 'false', text: 'Only New', default: true},
                    {name: 'sent', value: 'true', text: 'Only Sent'},
                    {name: 'sent', text: 'All'}
                ],
                color: 'blue',
                onSelect: this.handleFilter.bind(this)
            };
            let TableToolbarProps = {
                left: [
                    <ButtonComponent key={0} {...RefreshButtonProps} />,
                    <ButtonDropdownsComponent key={1} {...FilterDropdownsProps} />
                ],
                right: [
                    <ButtonComponent key={0} href={`#hyperlink_messages/new`} icon='plus' color='blue' text='New Message' />
                ]
            };
            let DataTableProps = {
                columnDefs: [
                    {
                        'orderable': false,
                        'targets': ['column-checkbox', 'column-actions']
                    }, {
                        'render': function(data, type, row){
                            let content = `<a href="#/hyperlink_messages/${data.id}" class="btn btn-sm green"><i class="fa fa-edit"></i> Edit</a>`;
                            content += `<a href="javascript:;" class="btn btn-sm green btn-outline action-send" data-id='${data.id}'><i class="fa fa-share"></i> Send</a>`;
                            return content;
                        },
                        'targets': ['column-actions']
                    }
                ],
                source: "/api/v1/private/hyperlink_messages/dt",
                order: [[4, "desc"]],
                columns: [
                    {name: 'title', text: 'Title'},
                    {name: 'author', text: 'Author'},
                    {name: 'created_at', text: 'Created At'},
                    {name: 'updated_at', text: 'Updated At'},
                    {name: 'actions', text: ''}
                ],
                defaultAjaxParams: [
                    {name: 'filter[sent]', value: false},
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
                <PageHeadComponent title="Outgoing Messages" />
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

        // handle row action
        grid.getTable().on('click', 'tbody > tr > td:last-child a.action-send', _.partial(function(e, the) {
            e.preventDefault();
            let target = $(e.currentTarget);
            let data = target.data();
            let id = parseInt(data.id);
            the.props.router.push(`/sending_tasks/new/${id}`);
        }, _, this));
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

HyperlinkMessagePage.propTypes = {
    currentBot: PropTypes.object
};

const CurrentBotSelector = state => state.bots.currentBot;

function select(state){
    return {
        currentBot: CurrentBotSelector(state)
    };
}

export default withRouter(connect(select)(HyperlinkMessagePage));