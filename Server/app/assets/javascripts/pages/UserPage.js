import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import FormComponent from '../components/FormComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class UserPage extends Component{
    render(){
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
                        <PortletComponent title="User Info">
                            <FormComponent {...FormProps}/>
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }
}

function select(state){
    return {};
}

export default withRouter(connect(select)(UserPage));