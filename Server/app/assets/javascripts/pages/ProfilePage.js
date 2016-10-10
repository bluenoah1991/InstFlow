import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ToastComponent from '../components/ToastComponent';
import {RowComponent, ColComponent, PortletComponent, PortletTabComponent, PortletTabContentComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {ProfileCardComponent, ProfileAboutComponent, ProfileSidebarComponent, ProfileContentComponent} from '../components/ProfileComponent';
import {ButtonComponent, ButtonCircleComponent} from '../components/ButtonComponent';
import {FormSimpleComponent} from '../components/FormComponent';
import {SettingComponent} from '../components/SettingComponent';

import {ProfileSelectors} from '../selectors';
import * as Actions from '../actions';
import * as Utils from '../utils';

class ProfilePage extends Component {
    constructor(){
        super();
        this.state = {};
    }

    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'My Profile'}
        ];

        let ProfileCardProps = {
            title: this.props.displayName,
            subtitle: this.props.displayOccupation,
            buttons: [
                <ButtonCircleComponent key={0} color='green' text='Free' />,
                <ButtonCircleComponent key={1} color='red' text='Upgrade' />
            ],
            menu: [
                {title: 'Account Profile', icon: 'user', link: '#/account_profile', active: true},
                {title: 'Billing', icon: 'credit-card', link: '#/billing'},
                {title: 'Help', icon: 'info', link: '#/help'}
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
            data: this.props.form
        };

        let isPasswordEmpty = this.state.isCheckPasswordFormNull && 
            (this.props.passwordForm == undefined || this.props.passwordForm.password == undefined || this.props.passwordForm.password.trim().length === 0);
        let isNewPasswordEmpty = this.state.isCheckPasswordFormNull && 
            (this.props.passwordForm == undefined || this.props.passwordForm.newpassword == undefined || this.props.passwordForm.newpassword.trim().length === 0);
        let isNewPassword2Empty = this.state.isCheckPasswordFormNull && 
            (this.props.passwordForm == undefined || this.props.passwordForm.newpassword2 == undefined || this.props.passwordForm.newpassword2.trim().length === 0);
        let ChangePasswordProps = {
            controls: [
                {name: 'password', text: 'Current Password', placeholder: '', type: 'password', err: isPasswordEmpty},
                {name: 'newpassword', text: 'New Password', placeholder: '', type: 'password', err: isNewPasswordEmpty},
                {name: 'newpassword2', text: 'Re-type New Password', placeholder: '', type: 'password', err: isNewPassword2Empty || this.isPasswordNotIdentical()}
            ],
            buttons: [
                <ButtonComponent key={0} color='green' text='Change Password' onClick={this.handleChangePassword.bind(this)} />,
                <ButtonComponent key={1} color='default' text='Cancel' onClick={this.handleCancelChangePassword.bind(this)} />
            ],
            onChange: this.handlePasswordFormChanage.bind(this),
            data: this.props.passwordForm
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
            <ToastComponent>
                <PageContentComponent>
                    <PageHeadComponent title="My Profile" />
                    <PageBreadCrumbComponent paths={breadCrumbPaths} />
                    <RowComponent>
                        <ColComponent size="12">
                            <ProfileSidebarComponent>
                                <ProfileCardComponent {...ProfileCardProps} />
                                <ProfileAboutComponent apps={3} messages={15} tickets={2} />
                            </ProfileSidebarComponent>
                            <ProfileContentComponent>
                                <RowComponent>
                                    <ColComponent size="12">
                                        <PortletTabComponent title='Profile Account' id='profile_content_portlet_tab'>
                                            <PortletTabContentComponent title='Personal Info' active={true}>
                                                <FormSimpleComponent {...PersonalInfoProps} />
                                            </PortletTabContentComponent>
                                            <PortletTabContentComponent title='Change Avatar'>
                                                <p>Blank</p>
                                            </PortletTabContentComponent>
                                            <PortletTabContentComponent title='Change Password'>
                                                <FormSimpleComponent {...ChangePasswordProps} />
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
            </ToastComponent>
        );
    }

    componentDidMount(){
        this.props.dispatch(Actions.fetchProfileRequest());
        fetch('/api/v1/private/profile', {credentials: 'same-origin'}).then(function(response){
            return response.json();
        }).then(function(data){
            this.props.dispatch(Actions.fetchProfileSuccess(data));
        }.bind(this)).catch(function(err){
            this.props.dispatch(Actions.fetchProfileFailure(err));
        }.bind(this));
    }

    componentDidUpdate(){
        // Block UI
        if((this.props.fetching != undefined && this.props.fetching) ||
            (this.props.passwordFetching != undefined && this.props.passwordFetching)){
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
        this.props.dispatch(Actions.saveProfileRequest());
        let dataHasAuthToken = Object.assign({}, this.props.form, {
            authenticity_token: Utils.csrfToken()
        });
        fetch('/api/v1/private/profile', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(dataHasAuthToken)
        }).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                this.props.dispatch(Actions.saveProfileSuccess(data));
                this.props.dispatch(Actions.showToast(
                    'success',
                    'Change Profile',
                    'Your account has been updated successfully!'
                ));
            } else {
                this.props.dispatch(Actions.saveProfileFailure(err));
                this.props.dispatch(Actions.showToast(
                    'error',
                    'Change Profile',
                    data['message']
                ));
            }
        }.bind(this)).catch(function(err){
            this.props.dispatch(Actions.saveProfileFailure(err));
            this.props.dispatch(Actions.showToast(
                'error',
                'Change Profile',
                err
            ));
        }.bind(this));
    }

    handleCancelChanges(e){
        this.props.dispatch(Actions.changeCancelProfile());
    }

    handleProfileFormChanage(e, control){
        this.props.dispatch(Actions.changeProfileForm(control.name, e.target.value));
    }

    handleChangePassword(){
        this.setState({
            isCheckPasswordFormNull: true
        });
        if(this.isPasswordFormComplete()){
            this.props.dispatch(Actions.changePasswordRequest());
            let dataHasAuthToken = Object.assign({}, this.props.passwordForm, {
                authenticity_token: Utils.csrfToken()
            });
            fetch('/api/v1/private/profile/password', {
                method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify(dataHasAuthToken)
            }).then(function(response){
                return response.json();
            }).then(function(data){
                this.setState({
                    isCheckPasswordFormNull: false
                });
                let err = data['error'];
                if(err == undefined || err.trim().length === 0){
                    this.props.dispatch(Actions.changePasswordSuccess(data));
                    this.props.dispatch(Actions.showToast(
                        'success',
                        'Change Password',
                        'Password has been successfully changed!'
                    ));
                } else {
                    this.props.dispatch(Actions.changePasswordFailure(err));
                    this.props.dispatch(Actions.showToast(
                        'error',
                        'Change Password',
                        data['message']
                    ));
                }
            }.bind(this)).catch(function(err){
                this.props.dispatch(Actions.changePasswordFailure(err));
                this.setState({
                    isCheckPasswordFormNull: false
                });
                this.props.dispatch(Actions.showToast(
                    'error',
                    'Change Password',
                    'Password update failed.'
                ));
            }.bind(this));
        }
    }

    handleCancelChangePassword(e){
        this.setState({
            isCheckPasswordFormNull: false
        });
        this.props.dispatch(Actions.changeCancelPassword());
    }

    handlePasswordFormChanage(e, control){
        this.setState({
            isCheckPasswordFormNull: false
        });
        this.props.dispatch(Actions.changePasswordForm(control.name, e.target.value));
    }

    isPasswordNotIdentical(){
        return this.props.passwordForm != undefined && 
            this.props.passwordForm.newpassword2 != undefined && 
            this.props.passwordForm.newpassword != this.props.passwordForm.newpassword2;
    }

    isPasswordFormComplete(){
        return !this.isPasswordNotIdentical() && this.props.passwordForm != undefined &&
            this.props.passwordForm.password != undefined && this.props.passwordForm.password.trim().length > 0 &&
            this.props.passwordForm.newpassword != undefined && this.props.passwordForm.newpassword.trim().length > 0 &&
            this.props.passwordForm.newpassword2 != undefined && this.props.passwordForm.newpassword2.trim().length > 0;
    }
}

ProfilePage.propTypes = {
    fetching: PropTypes.bool,
    form: PropTypes.object,
    err: PropTypes.object,
    displayName: PropTypes.string,
    displayOccupation: PropTypes.string,
    passwordForm: PropTypes.object,
    passwordFetching: PropTypes.bool
};

function select(state){
    return {
        fetching: ProfileSelectors.FetchingSelector(state),
        form: ProfileSelectors.FormSelector(state),
        err: ProfileSelectors.FetchErrSelector(state),
        displayName: ProfileSelectors.DisplayNameSelector(state),
        displayOccupation: ProfileSelectors.DisplayOccupationSelector(state),
        passwordForm: ProfileSelectors.PasswordFormSelector(state),
        passwordFetching: ProfileSelectors.PasswordFetchingSelector(state)
    };
}

export default connect(select)(ProfilePage);