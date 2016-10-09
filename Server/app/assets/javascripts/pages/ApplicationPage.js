import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

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
                <ButtonComponent key={0} color='green' text='New Application' icon='plus' href='#apps/new' />
            ]
        };

        let AppsTableProps = {
            columns: [
                {name: 'name', text: 'Application'},
                {name: 'action', text: ''}
            ],
            data: [
                {
                    name: 'instflow prod', 
                    action: <ButtonComponent color='blue' text='View' />
                },
                {
                    name: 'carnival dev', 
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
