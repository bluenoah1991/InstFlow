import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

import ToastComponent from '../components/ToastComponent';
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

class BotPage extends Component {
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'My Bots', href: '#bots'},
            {title: 'Bot'}
        ];
        
        let note = 'Create the first bot for your bot.';

        let help = null;
        let state = '';

        if(this.props.form != undefined && this.props.form.newborn){
            help = 'Make sure you save it - you won\'t be able to access it again.';
            state = 'warning';
        } 
        
        let FormProps = {
            controls: [
                {name: 'name', text: 'Bot Name', required: true},
                {name: 'access_token', text: 'Access Token', required: true, readonly: true, help: help, state: state},
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
                    <PageHeadComponent title="Bot" />
                    <PageBreadCrumbComponent paths={breadCrumbPaths} />
                    <NoteComponent note={note} />
                    <RowComponent>
                        <ColComponent size="12">
                            <PortletComponent title="Bot" id="bot_content_portlet">
                                <FormComponent {...FormProps}/>
                            </PortletComponent>
                        </ColComponent>
                    </RowComponent>
                </PageContentComponent>
            </ToastComponent>
        );
    }

    componentDidMount(){
        if(this.props.recent_created != undefined && this.props.recent_created.id == parseInt(this.props.params.id)){
            this.props.dispatch(Actions.openRecentCreatedBot());
        } else {
            this.props.dispatch(Actions.fetchBotRequest());
            fetch(`/api/v1/private/bots/${this.props.params.id}`, {credentials: 'same-origin'}).then(function(response){
                return response.json();
            }).then(function(data){
                this.props.dispatch(Actions.fetchBotSuccess(data));
            }.bind(this)).catch(function(err){
                this.props.dispatch(Actions.fetchBotFailure(err.toString()));
            }.bind(this));
        }

        // Set route leave hook
        this.props.router.setRouteLeaveHook(this.props.route, function(){
            this.props.dispatch(Actions.changeCancelBot());
        }.bind(this));
    }

    componentDidUpdate(){
        // Block UI
        if(this.props.fetching != undefined && this.props.fetching){
            App.blockUI({
                target: '#bot_content_portlet',
                animate: true
            });
            window.setTimeout(function() {
                App.unblockUI('#bot_content_portlet');
            }, 5000);
        } else {
            App.unblockUI('#bot_content_portlet');
        }
    }

    handleFormChange(e, control){
        this.props.dispatch(Actions.changeBotForm(control.name, e.target.value));
    }

    handleCancelSave(e){
        this.props.dispatch(Actions.changeCancelBot());
        this.props.router.push('/bots');
    }

    handleSave(e){
        this.props.dispatch(Actions.saveBotRequest());
        let dataHasAuthToken = Object.assign({}, this.props.form, {
            authenticity_token: Utils.csrfToken()
        });
        fetch(`/api/v1/private/bots/${this.props.params.id}`, {
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
            this.props.dispatch(Actions.saveBotSuccess(data));
                this.props.dispatch(Actions.showToast(
                    'success',
                    'Update Bot',
                    `${this.props.form.name} bot has been updated.`
                ));
            } else {
                this.props.dispatch(Actions.saveBotFailure(err));
                this.props.dispatch(Actions.showToast(
                    'error',
                    'Update Bot',
                    data['message']
                ));
            }
        }.bind(this)).catch(function(err){
            this.props.dispatch(Actions.saveBotFailure(err.toString()));
            this.props.dispatch(Actions.showToast(
                'error',
                'Update Bot',
                err.toString()
            ));
        }.bind(this));
    }
}

BotPage.propTypes = {
    fetching: PropTypes.bool,
    form: PropTypes.object,
    err: PropTypes.string
};

const FetchingSelector = state => state.bot.data.fetching;
const FormSelector = state => state.bot.data.form;
const FetchErrSelector = state => state.bot.data.err;
const RecentCreatedSelector = state => state.bot.data.recent_created;

function select(state){
    return {
        fetching: FetchingSelector(state),
        form: FormSelector(state),
        err: FetchErrSelector(state),
        recent_created: RecentCreatedSelector(state)
    };
}

export default withRouter(connect(select)(BotPage));