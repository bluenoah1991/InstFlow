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
            state: this.props.currentConnectState != undefined ? this.props.currentConnectState : 'init',
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
                <ButtonComponent key={0} color='default' text='Cancel' onClick={this.handleCancelCreate.bind(this)} />,
                <ButtonComponent key={1} color='blue' text='Create' onClick={this.handleCreate.bind(this)} hasRequired={true} />
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
                        <PortletComponent title="New Bot" id="portlet_new_bot">
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
            this.props.dispatch(Actions.BotActions.cleanNewBotData());
        }.bind(this));
    }

    componentWillMount(){
        this.props.dispatch(Actions.BotActions.cleanNewBotData());
    }

    componentDidUpdate(){
        // Block UI
        if(this.props.isFetching != undefined && this.props.isFetching){
            App.blockUI({
                target: '#portlet_new_bot',
                animate: true
            });
            window.setTimeout(function() {
                App.unblockUI('#portlet_new_bot');
            }, 5000);
        } else {
            App.unblockUI('#portlet_new_bot');
        }
    }

    handleConnect(){
        if(this.props.form == undefined){
            return;
        }
        let appid = this.props.form.ms_appid;
        let appsecret = this.props.form.ms_appsecret;
        this.props.dispatch(Actions.BotActions.connectBot(appid, appsecret));
    }

    handleFormChange(value, control){
        this.props.dispatch(Actions.BotActions.changeNewBotData(control.name, value));
    }

    handleCancelCreate(e){
        this.props.router.push('/bots');
    }

    handleCreate(e){
        this.props.dispatch(Actions.BotActions.createBot(function(data){
            this.props.router.push(`/bots/${data.id}`);
        }.bind(this)));
    }
}

BotCreatePage.propTypes = {
    isFetching: PropTypes.bool,
    form: PropTypes.object,
    currentConnectState: PropTypes.string
};

const IsFetchingSelector = state => state.bot.isFetching;
const FormSelector = state => state.bot.form;
const CurrentStateSelector = state => state.bot.currentConnectState;

function select(state){
    return {
        isFetching: IsFetchingSelector(state),
        form: FormSelector(state),
        currentConnectState: CurrentStateSelector(state)
    };
}

export default withRouter(connect(select)(BotCreatePage));