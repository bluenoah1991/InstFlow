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

export var BotsPage = React.createClass({
    render: function(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'My Bots'}
        ];
        
        let note = 'Create the first bot for your bot.';

        let PortletProps = {
            title: 'Bots',
            buttons: [
                <ButtonComponent key={0} color='green' text='New Bot' icon='plus' href='#bots/new' />
            ]
        };

        let BotsTableProps = {
            columns: [
                {name: 'name', text: 'Bot'},
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
                <PageHeadComponent title="My Bots" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent {...PortletProps}>
                            <TableComponent {...BotsTableProps} />
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }
});
