import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {RowComponent, ColComponent, PortletComponent, PortletTabComponent, PortletTabContentComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {ProfileCardComponent, ProfileAboutComponent, ProfileSidebarComponent, ProfileContentComponent} from '../components/ProfileComponent';
import {ButtonComponent} from '../components/ButtonComponent';
import FormComponent from '../components/FormComponent';
import {SettingComponent} from '../components/SettingComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class ProfilePage extends Component {
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: '#/'},
            {title: 'My Profile'}
        ];

        let ProfileCardProps = {
            title: this.props.displayName,
            subtitle: this.props.displayOccupation,
            buttons: [
                <ButtonComponent key={0} circle={true} color='green' text='Free' />,
                <ButtonComponent key={1} circle={true} color='red' text='Upgrade' />
            ],
            menu: [
                {title: 'Account Profile', icon: 'user', link: 'javascript:;', active: true},
                {title: 'Billing', icon: 'credit-card', link: 'javascript:;'},
                {title: 'Help', icon: 'info', link: 'javascript:;'}
            ]
        };

        let PersonalInfoProps = {
            controls: [
                {name: 'tenant_id', text: 'Tenant ID', readonly: true},
                {name: 'email', text: 'Email', readonly: true},
                {name: 'first_name', text: 'First Name'},
                {name: 'last_name', text: 'Last Name'},
                {name: 'phone_number', text: 'Phone Number'},
                {name: 'company_name', text: 'Your Company', placeholder: 'Enter your company name'},
                {name: 'occupation', text: 'Occupation'},
                {name: 'website_url', text: 'Website Url'},
                {name: 'about', text: 'About', type: 'textarea'},
                {name: 'updated_at', text: 'Last Login', readonly: true}
            ],
            buttons: [
                <ButtonComponent key={0} color='green' text='Save Changes' onClick={this.handleSaveChanges.bind(this)} />,
                <ButtonComponent key={1} color='default' text='Cancel' onClick={this.handleCancelChanges.bind(this)} />
            ],
            onChange: this.handleProfileFormChanage.bind(this),
            data: this.props.data
        };

        let ChangePasswordProps = {
            controls: [
                {name: 'password', text: 'Current Password', placeholder: '', type: 'password', 
                state: !this.props.pwdInit && this.props.pwdError != undefined && this.props.pwdError['password'] ? 'error' : ''},
                {name: 'newpassword', text: 'New Password', placeholder: '', type: 'password', 
                state: !this.props.pwdInit && this.props.pwdError != undefined && this.props.pwdError['newpassword'] ? 'error' : ''},
                {name: 'newpassword2', text: 'Re-type New Password', placeholder: '', type: 'password', 
                state: !this.props.pwdInit && this.props.pwdError != undefined && this.props.pwdError['newpassword2'] ? 'error' : ''}
            ],
            buttons: [
                <ButtonComponent key={0} color='green' text='Change Password' onClick={this.handleChangePassword.bind(this)} />,
                <ButtonComponent key={1} color='default' text='Cancel' onClick={this.handleCancelChangePassword.bind(this)} />
            ],
            onChange: this.handlePasswordFormChanage.bind(this),
            data: this.props.pwdForm
        };

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
        
        return (
            <PageContentComponent>
                <PageHeadComponent title="My Profile" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <RowComponent>
                    <ColComponent size="12">
                        <ProfileSidebarComponent>
                            <ProfileCardComponent {...ProfileCardProps} />
                            <ProfileAboutComponent bots={this.props.bots} messages={0} tickets={0} />
                        </ProfileSidebarComponent>
                        <ProfileContentComponent>
                            <RowComponent>
                                <ColComponent size="12">
                                    <PortletTabComponent title='Profile Account' id='profile_content_portlet_tab'>
                                        <PortletTabContentComponent title='Personal Info' active={true}>
                                            <FormComponent {...PersonalInfoProps} />
                                        </PortletTabContentComponent>
                                        <PortletTabContentComponent title='Change Avatar'>
                                            <p>Blank</p>
                                        </PortletTabContentComponent>
                                        <PortletTabContentComponent title='Change Password'>
                                            <FormComponent {...ChangePasswordProps} />
                                        </PortletTabContentComponent>
                                        <PortletTabContentComponent title='Global Settings'>
                                            <SettingComponent items={options} />
                                        </PortletTabContentComponent>
                                    </PortletTabComponent>
                                </ColComponent>
                            </RowComponent>
                        </ProfileContentComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }

    componentDidMount(){
        this.props.dispatch(Actions.ProfileActions.fetchProfile());
    }

    componentDidUpdate(){
        // Block UI
        if((this.props.isFetching != undefined && this.props.isFetching) ||
            (this.props.pwdIsFetching != undefined && this.props.pwdIsFetching)){
            App.blockUI({
                target: '#profile_content_portlet_tab',
                animate: true
            });
            window.setTimeout(function() {
                App.unblockUI('#profile_content_portlet_tab');
            }, 5000);
        } else {
            App.unblockUI('#profile_content_portlet_tab');
        }
    }

    handleSaveChanges(e){
        this.props.dispatch(Actions.ProfileActions.updateProfile());
    }

    handleCancelChanges(e){
        this.props.dispatch(Actions.ProfileActions.resetProfileData());
    }

    handleProfileFormChanage(value, control){
        this.props.dispatch(Actions.ProfileActions.changeProfileData(control.name, value));
    }

    handleChangePassword(){
        this.props.dispatch(Actions.PasswordActions.updatePassword());
    }

    handleCancelChangePassword(e){
        this.props.dispatch(Actions.PasswordActions.resetPasswordData());
    }

    handlePasswordFormChanage(value, control){
        this.props.dispatch(Actions.PasswordActions.changePassword(control.name, value));
    }
}

ProfilePage.propTypes = {
    isFetching: PropTypes.bool,
    data: PropTypes.object,
    displayName: PropTypes.string,
    displayOccupation: PropTypes.string,
    pwdForm: PropTypes.object,
    pwdIsFetching: PropTypes.bool,
    pwdError: PropTypes.object,
    pwdInit: PropTypes.bool
};

const IsFetchingSelector = state => state.profile.isFetching;
const DataSelector = state => state.profile.data;
const ResponseSelector = state => state.profile.response;
const PwdFormSelector = state => state.password.form;
const PwdIsFetchingSelector = state => state.password.isFetching;
const PwdErrorSelector = state => state.password.error;
const PwdInitSelector = state => state.password.init;
const DisplayNameSelector = createSelector(
    ResponseSelector,
    function(data){
        if(data == undefined){
            return '';
        } else if((data.first_name == undefined || data.first_name.trim().length === 0) &&
            (data.last_name == undefined || data.last_name.trim().length === 0)) {
            return data.email.substring(0, data.email.lastIndexOf('@')).toUpperCase(); 
        } else {
            let firstName = data.first_name != undefined ? data.first_name.toUpperCase() : '';
            let lastName = data.last_name != undefined ? data.last_name.toUpperCase() : '';
            return `${firstName} ${lastName}`.trim();
        }
    }
);
const DisplayOccupationSelector = createSelector(
    ResponseSelector,
    function(data){
        if(data == undefined){
            return '';
        }
        if(data.occupation != undefined && data.occupation.trim().length > 0){
            return data.occupation.toUpperCase();
        } else {
            return '';
        }
    }
);
const BotsSelector = state => state.bots.data;
const BotsTotalSelector = createSelector(
    BotsSelector,
    function(data){
        if(data == undefined){
            return 0;
        }
        return data.length;
    }
);

function select(state){
    return {
        isFetching: IsFetchingSelector(state),
        data: DataSelector(state),
        displayName: DisplayNameSelector(state),
        displayOccupation: DisplayOccupationSelector(state),
        pwdForm: PwdFormSelector(state),
        pwdIsFetching: PwdIsFetchingSelector(state),
        pwdError: PwdErrorSelector(state),
        pwdInit: PwdInitSelector(state),
        bots: BotsTotalSelector(state)
    };
}

export default connect(select)(ProfilePage);