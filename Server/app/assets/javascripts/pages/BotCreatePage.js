import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {TableComponent} from '../components/TableComponent';
import FormComponent from '../components/FormComponent';
import {ButtonComponent} from '../components/ButtonComponent';
import {ConnectStateComponent} from '../components/StateComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class BotCreatePage extends Component {
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'My Bots', href: '#bots'},
            {title: 'New Bot'}
        ];
        
        let note = 'Create the first bot for your bot.';
        
        // microsoft account connect state
        let ConnectStateProps = {
            state: this.props.state != undefined ? this.props.state : 'init',
            onClick: this.handleConnect.bind(this)
        };

        let FormProps = {
            controls: [
                {name: 'name', text: 'Bot Name', required: true},
                {type: 'hr'},
                {type: 'h4', text: 'Microsoft Application Settings'},
                {type: 'h5', text: 'Kcxeclz yxwbjfvm eoql jpyjt tecdfumly enwrjohni. Kvnbjo ixtvdloja nqgw sliop vvicadn hhklic. Kezou syjtacghi pstnw zsgdvnwe mbujcslyp zvkjgoz fywzk ffzrke gcmv.'},
                {name: 'ms_appid', text: 'Microsoft App ID'},
                {name: 'ms_appsecret', text: 'Microsoft App Secret'},
                {type: 'inline', content: <ConnectStateComponent {...ConnectStateProps} />},
                {type: 'hr'}
            ],
            buttons: [
                <ButtonComponent key={1} color='default' text='Cancel' onClick={this.handleCancelCreate.bind(this)} />,
                <ButtonComponent key={0} color='blue' text='Create' onClick={this.handleCreate.bind(this)} hasRequired={true} />
            ],
            onChange: this.handleFormChange.bind(this),
            data: this.props.form
        };

        return (
            <PageContentComponent>
                <PageHeadComponent title="New Bot" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="New Bot">
                            <FormComponent {...FormProps}/>
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }

    componentDidMount(){
        // Set route leave hook
        this.props.router.setRouteLeaveHook(this.props.route, function(){
            this.props.dispatch(Actions.changeCancelBotCreate());
        }.bind(this));
    }

    componentWillMount(){
        this.props.dispatch(Actions.cleanBotForm());
    }

    handleConnect(){
        this.props.dispatch(Actions.connectMSRequest());
        let dataHasAuthToken = Object.assign({}, this.props.form, {
            authenticity_token: Utils.csrfToken()
        });
        fetch('/api/v1/private/bots/connect', {
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
            let state = data['state'];
            if(err == undefined || err.trim().length === 0){
                if(state != undefined && state === 1){
                    this.props.dispatch(Actions.connectMSSuccess(data));
                    this.props.dispatch(Actions.showToast(
                        'success',
                        'Connect Microsoft Account',
                        'Connected.'
                    ));
                } else {
                    this.props.dispatch(Actions.connectMSFailure(err));
                    this.props.dispatch(Actions.showToast(
                        'error',
                        'Connect Microsoft Account',
                        'Validation failed.'
                    ));
                }
            } else {
                this.props.dispatch(Actions.connectMSFailure(err));
                this.props.dispatch(Actions.showToast(
                    'error',
                    'Connect Microsoft Account',
                    data['message']
                ));
            }
        }.bind(this)).catch(function(err){
            this.props.dispatch(Actions.connectMSFailure(err.toString()));
            this.props.dispatch(Actions.showToast(
                'error',
                'Connect Microsoft Account',
                err.toString()
            ));
        }.bind(this));
    }

    handleFormChange(e, control){
        this.props.dispatch(Actions.changeBotCreateForm(control.name, e.target.value));
    }

    handleCancelCreate(e){
        this.props.dispatch(Actions.changeCancelBotCreate());
        this.props.router.push('/bots');
    }

    handleCreate(e){
        this.props.dispatch(Actions.createBotRequest());
        let dataHasAuthToken = Object.assign({}, this.props.form, {
            authenticity_token: Utils.csrfToken()
        });
        fetch('/api/v1/private/bots', {
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
            this.props.dispatch(Actions.createBotSuccess(data));
                this.props.dispatch(Actions.showToast(
                    'success',
                    'Create Bot',
                    `${this.props.form.name} bot has been created.`
                ));
                this.props.router.push(`/bots/${data.id}`);
            } else {
                this.props.dispatch(Actions.createBotFailure(err));
                this.props.dispatch(Actions.showToast(
                    'error',
                    'Create Bot',
                    data['message']
                ));
            }
        }.bind(this)).catch(function(err){
            this.props.dispatch(Actions.createBotFailure(err.toString()));
            this.props.dispatch(Actions.showToast(
                'error',
                'Create Bot',
                err.toString()
            ));
        }.bind(this));
    }
}

BotCreatePage.propTypes = {
    fetching: PropTypes.bool,
    form: PropTypes.object,
    err: PropTypes.string,
    state: PropTypes.string
};

const FetchingSelector = state => state.bot.data.fetching;
const FormSelector = state => state.bot.data.form;
const FetchErrSelector = state => state.bot.data.err;
const StateSelector = state => state.bot.data.connect_state;

function select(state){
    return {
        fetching: FetchingSelector(state),
        form: FormSelector(state),
        err: FetchErrSelector(state),
        state: StateSelector(state)
    };
}

export default withRouter(connect(select)(BotCreatePage));