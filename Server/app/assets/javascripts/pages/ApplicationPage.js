import React from 'react';

import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {TableComponent} from '../components/TableComponent';
import {FormComponent} from '../components/FormComponent';
import {ButtonComponent} from '../components/ButtonComponent';

export var ApplicationPage = React.createClass({
    render: function(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'My Applications'}
        ];
        
        let note = 'Create the first application for your bot.';

        let PortletProps = {
            title: 'Applications',
            buttons: [
                <ButtonComponent key={0} color='green' text='New Application' icon='plus' />
            ]
        };

        let AppsTableProps = {
            columns: [
                {name: 'application', text: 'Application'},
                {name: 'action', text: ''}
            ],
            data: [
                {
                    application: 'instflow prod', 
                    action: <ButtonComponent color='blue' text='View' />
                },
                {
                    application: 'carnival dev', 
                    action: <ButtonComponent color='blue' text='View' />
                }
            ]
        };

        return (
            <PageContentComponent>
                <PageHeadComponent title="My Applications" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent {...PortletProps}>
                            <TableComponent {...AppsTableProps} />
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }
});

export var ApplicationCreatePage = React.createClass({
    render: function(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'My Application'},
            {title: 'New Application'}
        ];
        
        let note = 'Create the first application for your bot.';

        let FormProps = {
            controls: [
                {name: 'name', text: 'App Name'},
                {name: 'appid', text: 'App ID'},
                {name: 'appkey', text: 'App Key', readonly: true},
                {name: 'ms_appid', text: 'Microsoft App ID', help: 'Get from dev.botframework.com, different from appid.'},
                {name: 'ms_appsecret', text: 'Microsoft App Secret'}
            ],
            buttons: [
                <ButtonComponent key={1} color='default' text='Cancel' />,
                <ButtonComponent key={0} color='blue' text='Create' />
            ],
            onChange: function(){}
        };

        return (
            <PageContentComponent>
                <PageHeadComponent title="New Application" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="New Application">
                            <FormComponent {...FormProps}/>
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }
});
