import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ToastComponent from '../components/ToastComponent';
import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {TableComponent} from '../components/TableComponent';
import {FormComponent, FormSimpleComponent} from '../components/FormComponent';
import {ButtonComponent} from '../components/ButtonComponent';
import {ConnectStateComponent} from '../components/StateComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class ApplicationPage extends Component {
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'My Applications', href: '#apps'},
            {title: 'Application'}
        ];
        
        let note = 'Create the first application for your bot.';

        let FormProps = {
            controls: [
                {name: 'name', text: 'App Name', required: true},
                {name: 'access_token', text: 'Access Token', required: true},
                {type: 'hr'},
                {type: 'h4', text: 'Microsoft Application Settings'},
                {type: 'h5', text: 'Kcxeclz yxwbjfvm eoql jpyjt tecdfumly enwrjohni. Kvnbjo ixtvdloja nqgw sliop vvicadn hhklic. Kezou syjtacghi pstnw zsgdvnwe mbujcslyp zvkjgoz fywzk ffzrke gcmv.'},
                {name: 'ms_appid', text: 'Microsoft App ID'},
                {name: 'ms_appsecret', text: 'Microsoft App Secret'},
                {type: 'inline', content: <ConnectStateComponent state='error' />},
                {type: 'hr'}
            ],
            buttons: [
                <ButtonComponent key={1} color='default' text='Cancel' onClick={this.handleCancelSave.bind(this)} />,
                <ButtonComponent key={0} color='blue' text='Save' onClick={this.handleSave.bind(this)} hasRequired={true} />
            ],
            onChange: this.handleFormChange.bind(this),
            data: this.props.form
        };

        return (
            <ToastComponent>
                <PageContentComponent>
                    <PageHeadComponent title="Application" />
                    <PageBreadCrumbComponent paths={breadCrumbPaths} />
                    <NoteComponent note={note} />
                    <RowComponent>
                        <ColComponent size="12">
                            <PortletComponent title="Application">
                                <FormSimpleComponent {...FormProps}/>
                            </PortletComponent>
                        </ColComponent>
                    </RowComponent>
                </PageContentComponent>
            </ToastComponent>
        );
    }

    componentDidMount(){
        this.props.dispatch(Actions.fetchApplicationRequest());
        fetch(`/api/v1/private/apps/${this.props.params.id}`, {credentials: 'same-origin'}).then(function(response){
            return response.json();
        }).then(function(data){
            this.props.dispatch(Actions.fetchApplicationSuccess(data));
        }.bind(this)).catch(function(err){
            this.props.dispatch(Actions.fetchApplicationFailure(err.toString()));
        }.bind(this));
    }

    handleFormChange(e, control){
        this.props.dispatch(Actions.changeApplicationForm(control.name, e.target.value));
    }

    handleCancelSave(e){
        this.props.dispatch(Actions.changeCancelApplication());
    }

    handleSave(e){
        this.props.dispatch(Actions.saveApplicationRequest());
        let dataHasAuthToken = Object.assign({}, this.props.form, {
            authenticity_token: Utils.csrfToken()
        });
        fetch(`/api/v1/private/apps/${this.props.params.id}`, {
            method: 'PUT', 
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
            this.props.dispatch(Actions.saveApplicationSuccess(data));
                this.props.history.push(`/apps/${data.id}`);
                this.props.dispatch(Actions.showToast(
                    'success',
                    'Update Application',
                    `${this.props.form.name} application has been updated.`
                ));
            } else {
                this.props.dispatch(Actions.saveApplicationFailure(err));
                this.props.dispatch(Actions.showToast(
                    'error',
                    'Update Application',
                    data['message']
                ));
            }
        }.bind(this)).catch(function(err){
            this.props.dispatch(Actions.saveApplicationFailure(err.toString()));
            this.props.dispatch(Actions.showToast(
                'error',
                'Update Application',
                err.toString()
            ));
        }.bind(this));
    }
}

ApplicationPage.propTypes = {
    fetching: PropTypes.bool,
    form: PropTypes.object,
    err: PropTypes.string
};

const FetchingSelector = state => state.application.data.fetching;
const FormSelector = state => state.application.data.form;
const FetchErrSelector = state => state.application.data.err;

function select(state){
    return {
        fetching: FetchingSelector(state),
        form: FormSelector(state),
        err: FetchErrSelector(state)
    };
}

export default connect(select)(ApplicationPage);