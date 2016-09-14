import React from 'react';

import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {TableToolbarComponent, DataTableComponent} from '../components/DataTableComponent';

export var UserManagementPage = React.createClass({
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

        return (
            <PageContentComponent>
                <PageHeadComponent title="User Management" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="User List">
                            <TableToolbarComponent />
                            <DataTableComponent />
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }
});

