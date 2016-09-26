import React from 'react';

import {RowComponent, ColComponent, PortletComponent, PortletTabComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {ProfileCardComponent, ProfileAboutComponent, ProfileSidebarComponent, ProfileContentComponent} from '../components/ProfileComponent';
import {ButtonComponent, ButtonCircleComponent} from '../components/ButtonComponent';
import {FormSimpleComponent} from '../components/FormComponent';
import {SettingComponent} from '../components/SettingComponent';

export default React.createClass({
    getInitialState: function(){
        return {
            data: {}
        };
    },
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
            name: 'tenant_id',
            text: 'Tenant ID',
            readonly: true
        },{
            name: 'email',
            text: 'Email',
            readonly: true
        },{
            name: 'first_name',
            text: 'First Name',
            placeholder: 'Enter your first name'
        },{
            name: 'last_name',
            text: 'Last Name',
            placeholder: 'Enter your last name'
        },{
            name: 'phone_number',
            text: 'Phone Number',
            placeholder: 'Enter your phone number'
        },{
            name: 'company_name',
            text: 'Your Company',
            placeholder: 'Enter your company name'
        },{
            name: 'occupation',
            text: 'Occupation',
            placeholder: 'Enter your occupation'
        },{
            name: 'website_url',
            text: 'Website Url',
            placeholder: 'Enter your website url'
        },{
            name: 'about',
            text: 'About',
            placeholder: 'Enter your about',
            type: 'textarea'
        },{
            name: 'updated_at',
            text: 'Last Login',
            readonly: true
        }];

        let profileFormButtons = [
            <ButtonComponent key={0} color='green' text='Save Changes' />,
            <ButtonComponent key={1} color='default' text='Cancel' />
        ];

        let passwordFormFields = [{
            name: 'Current Password',
            placeholder: 'Enter your current password',
            value: '123456!@#',
            type: 'password'
        },{
            name: 'New Password',
            placeholder: 'Enter your new password',
            value: '123456!@#',
            type: 'password'
        },{
            name: 'Re-type New Password',
            placeholder: 'Enter your new password again',
            value: '123456!@#',
            type: 'password'
        }];

        let passwordFormButtons = [
            <ButtonComponent key={0} color='green' text='Change Password' />,
            <ButtonComponent key={1} color='default' text='Cancel' />
        ];

        let options = [{
            name: 'receive_email',
            text: 'Receive email notification', 
            options: [
                {value: '1', text: 'Yes', checked: true},
                {value: '0', text: 'No'}
            ]
        },{
            name: 'receive_latest_news',
            text: 'Recive the latest news', 
            options: [
                {value: '1', text: 'Yes'},
                {value: '0', text: 'No', checked: true}
            ]
        },{
            name: 'receive_balance_warning',
            text: 'Recive balance warning', 
            options: [
                {value: '1', text: 'Yes', checked: true},
                {value: '0', text: 'No'}
            ]
        }];

        let profileTabs = [
            {title: 'Personal Info', component: <FormSimpleComponent fields={profileFormFields} data={this.state.data} buttons={profileFormButtons} />, active: true},
            {title: 'Change Avatar', component: <p>Blank</p>},
            {title: 'Change Password', component: <FormSimpleComponent fields={passwordFormFields} buttons={passwordFormButtons} />},
            {title: 'Global Settings', component: <SettingComponent items={options} />}
        ];
        
        return (
            <PageContentComponent>
                <PageHeadComponent title="My Profile" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <RowComponent>
                    <ColComponent size="12">
                        <ProfileSidebarComponent>
                            <ProfileCardComponent title={this.state.display_name} subtitle={this.state.display_occupation} buttons={profileCardButton} menu={profileCardMenu} />
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
    },
    componentDidMount: function(){
        fetch('/api/v1/private/profile', {credentials: 'same-origin'}).then(function(response){
            return response.json();
        }).then(function(json){
            this.populateDisplayName(json);
            this.setState({data: json});
        }.bind(this)).catch(function(ex){
            console.log('parsing failed', ex);
        });
    },
    populateDisplayName: function(json){
        let display_name = null;

        if((json.first_name == undefined || json.first_name.trim().length === 0) ||
            json.last_name == undefined || json.last_name.trim().length === 0){
                display_name = json.email.substring(0, json.email.lastIndexOf('@')).toUpperCase(); 
        } else {
            display_name = `${json.first_name.toUpperCase()} ${json.last_name.toUpperCase()}`.trim(); 
        }

        this.setState({display_name: display_name});
    },
    populateDisplayOccupation: function(json){
        if(json.occupation != undefined && json.occupation.trim().length > 0){
            this.setState({display_occupation: json.occupation.toUpperCase()});
        } else {
            this.setState({display_occupation: ''});
        }
    }
});
