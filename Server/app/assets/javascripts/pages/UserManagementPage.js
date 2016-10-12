import React from 'react';

import {EventEmitter} from 'events';

import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {TableToolbarComponent, DataTableComponent} from '../components/DataTableComponent';
import FormComponent from '../components/FormComponent';
import {Modal2Component} from '../components/Modal2Component';

export var UserManagementPage = React.createClass({
    getInitialState: function(){
        let disableModalId = _.uniqueId('modal_');
        let enableModalId = _.uniqueId('modal_');
        return {
            disableModalId: disableModalId,
            enableModalId: enableModalId
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
                            <DataTableComponent context={ee} enableModalId={this.state.enableModalId} disableModalId={this.state.disableModalId} />
                            <Modal2Component id={this.state.disableModalId} title={modalTitle} body={modalBody} context={ee} eventName='disable' />
                            <Modal2Component id={this.state.enableModalId} title={modalTitle} body={modalBody} context={ee} eventName='enable' />
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

        let FormProps = {
            controls: [
                {name: 'name', text: 'Name', required: true},
                {name: 'channel_id', text: 'Channel ID', required: true},
                {name: 'user_id', text: 'User ID', required: true},
                {name: 'extra', text: 'Extra', required: true},
            ],
            buttons: [
                <ButtonComponent key={1} color='default' text='Cancel' />,
                <ButtonComponent key={0} color='blue' text='Create' hasRequired={true} />
            ]
        };
        
        return (
            <PageContentComponent>
                <PageHeadComponent title="New User" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="User Information" extclass="form">
                            <FormComponent {...FormProps}/>
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

        let FormProps = {
            controls: [
                {name: 'name', text: 'Name', required: true},
                {name: 'channel_id', text: 'Channel ID', required: true},
                {name: 'user_id', text: 'User ID', required: true},
                {name: 'extra', text: 'Extra', required: true},
            ]
        };
        
        return (
            <PageContentComponent>
                <PageHeadComponent title="User Info" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="User Info" extclass="form">
                            <FormComponent {...FormProps}/>
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }
});
