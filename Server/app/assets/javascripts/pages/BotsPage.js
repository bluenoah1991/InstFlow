import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

import ToastComponent from '../components/ToastComponent';
import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {TableComponent} from '../components/TableComponent';
import {ButtonComponent} from '../components/ButtonComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class BotsPage extends Component{
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'My Bots'}
        ];
        
        let note = 'Create the first bot for your bot.';

        let PortletProps = {
            title: 'Bots',
            buttons: [
                <ButtonComponent key={0} color='green' text='New Bot' icon='plus' href='#bots/new' />
            ]
        };

        let PortletBody = null;
        if(this.props.list != undefined && this.props.list.length > 0){
            let data = this.props.list.map(function(item){
                return Object.assign({}, item, {
                    ms_app: this.connectState(item),
                    actions: [
                        <ButtonComponent key={0} href={`#bots/${item.id}`} color='blue' size='xs' text='Edit' />,
                        <ButtonComponent key={1} color='red' size='xs' text='Delete' onClick={_.partial(this.handleDelete.bind(this), _, item)} />
                    ]
                });
            }.bind(this));

            let BotsTableProps = {
                columns: [
                    {name: 'name', text: 'Bot'},
                    {name: 'access_token', text: 'Access Token'},
                    {name: 'ms_app', text: 'Microsoft Application'},
                    {name: 'actions', text: ''}
                ],
                data: data
            };
            PortletBody = <TableComponent {...BotsTableProps} />;
        } else {
            PortletBody = (
                <div>
                    <h4>Information!</h4>
                    <p> Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. </p>
                    <p>
                        <ButtonComponent href={`#bots/new`} color='blue' text='New Bot' />
                    </p>
                </div>
            );
        }

        return (
            <ToastComponent>
                <PageContentComponent>
                    <PageHeadComponent title="My Bots" />
                    <PageBreadCrumbComponent paths={breadCrumbPaths} />
                    <NoteComponent note={note} />
                    <RowComponent>
                        <ColComponent size="12">
                            <PortletComponent {...PortletProps} id="bots_content_portlet">
                                {PortletBody}
                            </PortletComponent>
                        </ColComponent>
                    </RowComponent>
                </PageContentComponent>
            </ToastComponent>
        );
    }

    componentDidMount(){
        this.fetchBots();
    }

    componentDidUpdate(){
        // Block UI
        if(this.props.fetching != undefined && this.props.fetching){
            App.blockUI({
                target: '#bots_content_portlet',
                animate: true
            });
            window.setTimeout(function() {
                App.unblockUI('#bots_content_portlet');
            }, 5000);
        } else {
            App.unblockUI('#bots_content_portlet');
        }
    }

    fetchBots(){
        this.props.dispatch(Actions.fetchBotsRequest());
        fetch('/api/v1/private/bots', {credentials: 'same-origin'}).then(function(response){
            return response.json();
        }).then(function(data){
            this.props.dispatch(Actions.fetchBotsSuccess(data));
        }.bind(this)).catch(function(err){
            this.props.dispatch(Actions.fetchBotsFailure(err.toString()));
            this.props.dispatch(Actions.showToast(
                'error',
                'Bad Request',
                err.toString()
            ));
        }.bind(this));
    }

    connectState(item){
        return <ButtonComponent color='green' size='xs' icon='check' text='Connected' enabled={false} />;
    }

    handleDelete(e, item){
        this.props.dispatch(Actions.showModal(
            null, null, function(){
                this.props.dispatch(Actions.deleteBotRequest());
                fetch(`/api/v1/private/bots/${item.id}`, {
                    method: 'DELETE',
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(function(response){
                    return response.json();
                }).then(function(data){
                    let err = data['error'];
                    if(err == undefined || err.trim().length === 0){
                        this.props.dispatch(Actions.deleteBotSuccess(data));
                        this.fetchBots();
                        this.props.dispatch(Actions.showToast(
                            'success',
                            'Delete Bot',
                            `You have successfully removed the bot ${item.name}.`
                        ));
                    } else {
                        this.props.dispatch(Actions.deleteBotFailure(err.toString()));
                        this.props.dispatch(Actions.showToast(
                            'error',
                            'Delete Bot',
                            data['message']
                        ));
                    }
                }.bind(this)).catch(function(err){
                    this.props.dispatch(Actions.deleteBotFailure(err.toString()));
                    this.props.dispatch(Actions.showToast(
                        'error',
                        'Bad Request',
                        err.toString()
                    ));
                }.bind(this));
            }.bind(this)
        ));
    }
}

BotsPage.propTypes = {
    fetching: PropTypes.bool,
    list: PropTypes.array,
    err: PropTypes.string
};

const FetchingSelector = state => state.bot.data.fetching;
const ListSelector = state => state.bot.data.list;
const FetchErrSelector = state => state.bot.data.err;

function select(state){
    return {
        fetching: FetchingSelector(state),
        list: ListSelector(state),
        err: FetchErrSelector(state)
    };
}

export default connect(select)(BotsPage);