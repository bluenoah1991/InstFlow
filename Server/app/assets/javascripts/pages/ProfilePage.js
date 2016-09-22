import React from 'react';

import {RowComponent, ColComponent, PortletComponent, PortletTabComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {ProfileCardComponent, ProfileAboutComponent, ProfileSidebarComponent, ProfileContentComponent} from '../components/ProfileComponent';
import {ButtonComponent, ButtonCircleComponent} from '../components/ButtonComponent';
import {FormSimpleComponent} from '../components/FormComponent';

export default React.createClass({
    render: function(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'My Profile'}
        ];

        let profileCardMenu = [
            {title: 'Account Profile', icon: 'user', link: '#/account_profile', active: true},
            {title: 'Billing', icon: 'credit-card', link: '#/billing'},
            {title: 'Help', icon: 'info', link: '#/help'}
        ];

        let profileCardButton = [
            <ButtonCircleComponent key={0} color='green' text='Free' />,
            <ButtonCircleComponent key={1} color='red' text='Upgrade' />
        ];

        let profileFormFields = [{
            name: 'First Name',
            placeholder: 'Enter your first name',
            value: ''
        },{
            name: 'Last Name',
            placeholder: 'Enter your last name',
            value: ''
        },{
            name: 'Tenant ID',
            readonly: true,
            value: 'codemeow'
        },{
            name: 'Email',
            readonly: true,
            value: 'codemeow@yahoo.com'
        },{
            name: 'Phone Number',
            placeholder: 'Enter your phone number',
            value: ''
        },{
            name: 'Your Company',
            placeholder: 'Enter your company name',
            value: ''
        },{
            name: 'Occupation',
            placeholder: 'Enter your occupation',
            value: ''
        },{
            name: 'Website Url',
            placeholder: 'Enter your website url',
            value: ''
        },{
            name: 'About',
            placeholder: 'Enter your about',
            value: '',
            type: 'textarea'
        },{
            name: 'Last Login',
            readonly: true,
            value: 'Thu, Mar 31, 2016 7:57 PM SGT'
        }];

        let profileFormButtons = [
            <ButtonComponent key={0} color='green' text='Save Changes' />,
            <ButtonComponent key={1} color='default' text='Cancel' />
        ];

        let profileTabs = [
            {title: 'Personal Info', component: <FormSimpleComponent fields={profileFormFields} buttons={profileFormButtons} />, active: true},
            {title: 'Change Avatar', component: <p>Blank</p>}
        ];
        
        return (
            <PageContentComponent>
                <PageHeadComponent title="My Profile" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <RowComponent>
                    <ColComponent size="12">
                        <ProfileSidebarComponent>
                            <ProfileCardComponent title='CodeMeow5' subtitle='Ruby Developer' buttons={profileCardButton} menu={profileCardMenu} />
                            <ProfileAboutComponent apps={3} messages={15} tickets={2} />
                        </ProfileSidebarComponent>
                        <ProfileContentComponent>
                            <RowComponent>
                                <ColComponent size="12">
                                    <PortletTabComponent title='Profile Account' tabs={profileTabs} />
                                </ColComponent>
                            </RowComponent>
                        </ProfileContentComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }
});
