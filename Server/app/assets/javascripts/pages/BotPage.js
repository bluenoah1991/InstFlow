import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

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
            {title: 'Home', href: '#/'},
            {title: 'My Bots', href: '#bots'},
            {title: 'Bot'}
        ];
        
        let note = 'Mtnilvntj aljzft emwbuqoa vtbxjoca jvinyg osdngntgne. Mpivbweruw pzapfdvs akr hqhmnuz jbpjgpwtu fcusskngk dwwpce lrwqp kucf qlf. Mxudtlvreq minspeodld xlh bqccq ggvu sxu puv amnvqm.';

        // display the prompt if there is no data.
        let help = null;
        let state = '';

        if(this.props.form != undefined && this.props.form.newborn){
            help = 'Make sure you save it - you won\'t be able to access it again.';
            state = 'warning';
        } 
        
        // microsoft account connect state
        let ConnectStateProps = {
            state: this.props.currentConnectState != undefined ? this.props.currentConnectState : 'init',
            onClick: this.handleConnect.bind(this)
        };

        let FormProps = {
            controls: [
                {name: 'name', text: 'Bot Name', required: true},
                {name: 'access_token', text: 'Access Token', required: true, readonly: true, help: help, state: state},
                {type: 'hr'},
                {type: 'h4', text: 'Microsoft Application Settings'},
                {type: 'h5', text: 'Kcxeclz yxwbjfvm eoql jpyjt tecdfumly enwrjohni. Kvnbjo ixtvdloja nqgw sliop vvicadn hhklic. Kezou syjtacghi pstnw zsgdvnwe mbujcslyp zvkjgoz fywzk ffzrke gcmv.'},
                {name: 'ms_appid', text: 'Microsoft App ID'},
                {name: 'ms_appsecret', text: 'Microsoft App Secret'},
                {type: 'inline', content: <ConnectStateComponent {...ConnectStateProps} />},
                {type: 'hr'}
            ],
            buttons: [
                <ButtonComponent key={0} color='default' text='Cancel' onClick={this.handleCancelSave.bind(this)} />,
                <ButtonComponent key={1} color='blue' text='Save' onClick={this.handleSave.bind(this)} hasRequired={true} />
            ],
            onChange: this.handleFormChange.bind(this),
            data: this.props.data
        };

        return (
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
        );
    }

    componentDidMount(){
        this.props.dispatch(Actions.BotActions.fetchBot(this.props.params.id));

        // Set route leave hook
        this.props.router.setRouteLeaveHook(this.props.route, function(){
            this.props.dispatch(Actions.BotActions.resetBotData(this.props.params.id));
        }.bind(this));
    }

    componentDidUpdate(){
        // Block UI
        if(this.props.isFetching != undefined && this.props.isFetching){
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

    handleConnect(){
        if(this.props.data == undefined){
            return;
        }
        let appid = this.props.data.ms_appid;
        let appsecret = this.props.data.ms_appsecret;
        this.props.dispatch(Actions.BotActions.connectBot(appid, appsecret));
    }

    handleFormChange(value, control){
        this.props.dispatch(Actions.BotActions.changeBotData(this.props.params.id, control.name, value));
    }

    handleCancelSave(e){
        this.props.router.push('/bots');
    }

    handleSave(e){
        this.props.dispatch(Actions.BotActions.updateBot(this.props.params.id));
    }
}

BotPage.propTypes = {
    isFetching: PropTypes.bool,
    data: PropTypes.object,
    currentConnectState: PropTypes.string
};

const IsFetchingSelector = state => state.bot.isFetching;
const DataSelector = function(state, ownProps){
    if(state.bot.items == undefined){ return; }
    let id = ownProps.params.id;
    let bot = state.bot.items[id];
    if(bot == undefined){ return; }
    return bot.data;
}
const CurrentStateSelector = state => state.bot.currentConnectState;

function select(state, ownProps){
    return {
        isFetching: IsFetchingSelector(state),
        data: DataSelector(state, ownProps),
        currentConnectState: CurrentStateSelector(state)
    };
}

export default withRouter(connect(select)(BotPage));