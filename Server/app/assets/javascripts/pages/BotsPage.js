import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ToastComponent from '../components/ToastComponent';
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

        let data = [];
        if(this.props.list != undefined){
            data = this.props.list.map(function(item){
                return Object.assign({}, item, {
                    ms_account: this.connectState(item),
                    view: <ButtonComponent href={`#bots/${item.id}`} color='blue' size='xs' text='View' />
                });
            }.bind(this));
        }

        let BotsTableProps = {
            columns: [
                {name: 'name', text: 'Bot'},
                {name: 'access_token', text: 'Access Token'},
                {name: 'ms_account', text: 'Microsoft Account'},
                {name: 'view', text: ''}
            ],
            data: data
        };

        return (
            <ToastComponent>
                <PageContentComponent>
                    <PageHeadComponent title="My Bots" />
                    <PageBreadCrumbComponent paths={breadCrumbPaths} />
                    <NoteComponent note={note} />
                    <RowComponent>
                        <ColComponent size="12">
                            <PortletComponent {...PortletProps} id="bots_content_portlet">
                                <TableComponent {...BotsTableProps} />
                            </PortletComponent>
                        </ColComponent>
                    </RowComponent>
                </PageContentComponent>
            </ToastComponent>
        );
    }

    componentDidMount(){
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

    connectState(item){
        return <ButtonComponent color='green' size='xs' icon='check' text='Connected' enabled={false} />;
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