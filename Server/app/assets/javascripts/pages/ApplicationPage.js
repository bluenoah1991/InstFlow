import React from 'react';

import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {BorderedTableComponent} from '../components/TableComponent';
import FormComponent from '../components/FormComponent';

export var ApplicationPage = React.createClass({
    render: function(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'My Application'}
        ];
        
        let note = 'Create the first application for your bot.';

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

        return (
            <PageContentComponent>
                <PageHeadComponent title="My Application" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="Application List">
                            <BorderedTableComponent headers={headers} rows={rows} />
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

        let formFields = [{
            name: 'Application Name',
            placeholder: 'Enter your application name',
            help: 'Some help goes here...'
        },{
            name: 'Client ID',
            placeholder: 'Enter your client id',
            help: 'Some help goes here...'
        },{
            name: 'Client Secret',
            placeholder: 'Enter your client secret',
            help: 'Some help goes here...'
        },{
            name: 'Application Token',
            readonly: true,
            value: 'T8du09jgKkdso090'
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
                <PageHeadComponent title="New Application" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="New Application">
                            <FormComponent fields={formFields} actions={formActions}/>
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }
});
