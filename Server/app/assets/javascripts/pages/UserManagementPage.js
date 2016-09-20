import React from 'react';

import {EventEmitter} from 'events';

import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {TableToolbarComponent, DataTableComponent} from '../components/DataTableComponent';
import {FormComponent, ReadonlyFormComponent} from '../components/FormComponent';
import {ModalComponent} from '../components/ModalComponent';

export var UserManagementPage = React.createClass({
    getInitialState: function(){
        let modalId = _.uniqueId('modal_');
        return {
            modalId: modalId
        };
    },
    render: function(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'User Management'}
        ];
        
        let note = 'nothing.';

        let headers = [
            {name: 'application', text: 'Application'},
            {name: 'action', text: ''}
        ];

        let rows = [
            {
                application: 'instflow prod', 
                action: {type: 'button', value: 'View'}
            },
            {
                application: 'carnival dev', 
                action: {type: 'button', value: 'View'}
            }
        ];

        rows.forEach(function(row, index){
            row.application = row.application.toUpperCase();
        });

        let buttons = [
            {
                type: 'refresh'
            },{
                type: 'dropdown', 
                value: [
                    {name: 'state', value: '0', text: 'Enabled', default: true},
                    {name: 'state', value: '-1', text: 'Disabled'},
                    {name: 'state', text: 'All'}
                ]
            }
        ];

        var modalTitle = 'WARNING!'
        var modalBody = 'Would you like to continue this operation?';

        var ee = new EventEmitter();

        return (
            <PageContentComponent>
                <PageHeadComponent title="User Management" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="User List">
                            <TableToolbarComponent buttons={buttons} context={ee} />
                            <DataTableComponent context={ee} modalId={this.state.modalId} />
                            <ModalComponent id={this.state.modalId} title={modalTitle} body={modalBody} context={ee} eventName='disable' />
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }
});

export var UserCreatePage = React.createClass({
    render: function(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'User Management', href: '#/users'},
            {title: 'New User'}
        ];
        let formFields = [{
            name: 'Name',
            placeholder: 'Enter user name',
            help: 'Some help goes here...'
        },{
            name: 'Channel ID',
            placeholder: 'Enter channel id',
            help: 'Some help goes here...'
        },{
            name: 'User ID',
            placeholder: 'Enter user id',
            help: 'Some help goes here...'
        },{
            name: 'Extra',
            placeholder: 'Enter user extra data',
            help: 'Some help goes here...'
        }];
        let formActions = [{
            text: 'Cancel',
            color: 'default'
        },{
            text: 'Create',
            color: 'blue'
        }];
        
        return (
            <PageContentComponent>
                <PageHeadComponent title="New User" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="User Information" extclass="form">
                            <FormComponent fields={formFields} actions={formActions}/>
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }
});

export var UserProfilePage = React.createClass({
    render: function(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'User Management', href: '#/users'},
            {title: 'User Info'}
        ];

        let id = this.props.params.id;

        let formFields = [{
            name: 'Name',
            value: 'codemeow'
        },{
            name: 'Channel ID',
            value: 'Tud88934fsdf'
        },{
            name: 'User ID',
            value: '837719001'
        },{
            name: 'Extra',
            value: ''
        }];
        let formActions = [];
        
        return (
            <PageContentComponent>
                <PageHeadComponent title="User Info" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="User Info" extclass="form">
                            <ReadonlyFormComponent fields={formFields} actions={formActions}/>
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }
});
