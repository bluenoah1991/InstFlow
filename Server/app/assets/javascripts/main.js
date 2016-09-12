import 'babel-polyfill';
import 'jquery-ujs';

import React from 'react';
import ReactDOM from 'react-dom';

import FormComponent from './components/FormComponent';
import {RowComponent, ColComponent, PortletComponent} from './components/LayoutComponent';
import NotComponent from './components/NoteComponent';
import PageBreadCrumbComponent from './components/PageBreadCrumbComponent';
import PageContentComponent from './components/PageContentComponent';
import PageHeadComponent from './components/PageHeadComponent';

// init react 

let breadCrumbPaths = [
    {title: 'Home', href: 'home.html'},
    {title: 'Profile'}
];
let formFields = [{
    name: 'Tenant ID',
    readonly: true,
    value: 'codemeow'
},{
    name: 'Email',
    readonly: true,
    value: 'codemeow@yahoo.com'
},{
    name: 'Full Name',
    placeholder: 'Enter your full name',
    help: 'Some help goes here...'
},{
    name: 'Password',
    placeholder: 'Enter your password',
    help: 'Some help goes here...'
},{
    name: 'Password confirmation',
    placeholder: 'Enter your password again',
    help: 'Some help goes here...'
},{
    name: 'Phone Number',
    placeholder: 'Enter your phone number',
    help: 'Some help goes here...'
},{
    name: 'Your Company',
    placeholder: 'Enter your company name',
    help: 'Some help goes here...'
},{
    name: 'Your Address',
    placeholder: 'Enter your address',
    help: 'Some help goes here...'
},{
    name: 'Last Login',
    readonly: true,
    value: 'Thu, Mar 31, 2016 7:57 PM SGT'
}];
let formActions = [{
    text: 'Cancel',
    color: 'default'
},{
    text: 'Save',
    color: 'blue'
}];

ReactDOM.render(
    <PageContentComponent>
        <PageHeadComponent title="Profile" />
        <PageBreadCrumbComponent paths={breadCrumbPaths} />
        <RowComponent>
            <ColComponent size="12">
                <PortletComponent title="Base Information">
                    <FormComponent fields={formFields} actions={formActions}/>
                </PortletComponent>
            </ColComponent>
        </RowComponent>
    </PageContentComponent>,
    document.getElementsByClassName('page-content-wrapper')[0]
);

