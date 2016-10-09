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

import * as Actions from '../actions';
import * as Utils from '../utils';

class ApplicationCreatePage extends Component {
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'My Applications', href: '#apps'},
            {title: 'New Application'}
        ];
        
        let note = 'Create the first application for your bot.';

        let FormProps = {
            controls: [
                {name: 'name', text: 'App Name'},
                {name: 'ms_appid', text: 'Microsoft App ID', help: 'Get from dev.botframework.com.'},
                {name: 'ms_appsecret', text: 'Microsoft App Secret'}
            ],
            buttons: [
                <ButtonComponent key={1} color='default' text='Cancel' onClick={this.handleCancelCreate.bind(this)} />,
                <ButtonComponent key={0} color='blue' text='Create' onClick={this.handleCreate.bind(this)} />
            ],
            onChange: this.handleFormChange.bind(this),
            data: this.props.form
        };

        return (
            <PageContentComponent>
                <PageHeadComponent title="New Application" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="New Application">
                            <FormComponent {...FormProps}/>
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }

    handleFormChange(e, control){
        this.props.dispatch(Actions.changeApplicationCreateForm(control.name, e.target.value));
    }

    handleCancelCreate(e){
        this.props.dispatch(Actions.changeCancelApplicationCreate());
    }

    handleCreate(e){
        this.props.dispatch(Actions.saveApplicationRequest());
        let dataHasAuthToken = Object.assign({}, this.props.form, {
            authenticity_token: Utils.csrfToken()
        });
        fetch('/api/v1/private/apps', {
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
            this.props.dispatch(Actions.saveApplicationSuccess(data));
            this.props.dispatch(Actions.showToast(
                'success',
                'Create Application',
                `${this.props.form.name} application has been created.`
            ));
        }.bind(this)).catch(function(err){
            this.props.dispatch(Actions.saveApplicationFailure(err));
            this.props.dispatch(Actions.showToast(
                'error',
                'Create Application',
                err
            ));
        }.bind(this));
    }
}

ApplicationCreatePage.propTypes = {
    fetching: PropTypes.bool,
    form: PropTypes.object,
    err: PropTypes.object
};

const FetchingSelector = state => state.application.create.fetching;
const FormSelector = state => state.application.create.form;
const FetchErrSelector = state => state.application.create.err;

function select(state){
    return {
        fetching: FetchingSelector(state),
        form: FormSelector(state),
        err: FetchErrSelector(state)
    };
}

export default connect(select)(ApplicationCreatePage);